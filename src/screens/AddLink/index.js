import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import Images from '../../themes/images';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import {saveLink} from '../../redux/actions/linkActions';
import {getList} from '../../redux/actions/listActions';
import {getHashtag} from '../../redux/actions/hashtagActions';
import {windowWidth, windowHeight} from '../../themes/constants';

function AddLink({navigation, ...props}) {
  const [link, setLink] = useState('');
  const [list, setList] = useState('');
  const [click, setClick] = useState(false);
  const [hashtag, setHashtag] = useState(null);

  useEffect(() => {
    props.getList();

    props.route.params.data === null
      ? setLink('')
      : setLink(props.route.params.data);
  }, []);

  let data = props.listNames.map(items => ({value: items}));

  let hashtagCond;
  click === false
    ? (hashtagCond = (
        <TouchableOpacity
          style={styles.hashtagButton}
          onPress={() => {
            setClick(true);
          }}>
          <Image source={Images.AddHashtag} />
        </TouchableOpacity>
      ))
    : (hashtagCond = (
        <InputComp
          placeholder="Hashtag Ekle"
          value={hashtag}
          onChangeText={value => {
            setHashtag(value);
          }}
        />
      ));

  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#F7F7F7'}}>
      <View style={styles.container}>
        {/* sadece link verilebilmeli */}
        <InputComp
          placeholder="Kayıt Ekle"
          value={link}
          onChangeText={value => {
            setLink(value);
          }}
        />

        <Dropdown
          pickerStyle={styles.dropdownStyle}
          inputContainerStyle={[
            styles.dropdownStyle,
            {height: 50, paddingHorizontal: 10},
          ]}
          dropdownOffset={{top: 12, left: 5}}
          rippleCentered={true}
          data={data}
          onChangeText={value => {
            setList(value);
          }}
          value={list}
          //default tüm kayıtlar secili olsun
        />
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 30}}>
        {hashtagCond}
      </View>
      <View style={styles.container}>
        <ButtonComp
          title="Ekle"
          onPress={() => {
            props.saveLink(link, list, hashtag);
          }}
        />
      </View>
      <Text> {props.hashtags}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dropdownStyle: {
    width: (4 * windowWidth) / 5,
    borderRadius: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    elevation: 6,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    margin: 10,
  },
  hashtagAround: {
    alignItems: 'flex-end',
    margin: 10,
    backgroundColor: '#F7F7F7',
  },
  hashtagButton: {
    backgroundColor: '#FFC107',
    padding: 7,
    borderRadius: 50,
  },
});

const mapStateToProps = state => {
  return {
    listNames: state.ListReducer.lists,
  };
};

export default connect(
  mapStateToProps,
  {getList, saveLink},
)(AddLink);
