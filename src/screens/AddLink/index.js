import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import Images from '../../themes/images';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import {saveLink} from '../../redux/actions/linkActions';
import {getList} from '../../redux/actions/listActions';
import {windowWidth, windowHeight} from '../../themes/constants';

function AddLink({navigation, ...props}) {
  const [link, setLink] = useState('');
  const [list, setList] = useState('');
  const [click, setClick] = useState(false);
  const [hashtag, setHashtag] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        <Modal
          // animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            {
              setModalVisible(!modalVisible);
            }
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, {backgroundColor: 'orange'}]}>
                <Image
                  source={Images.Checked}
                  style={{backgroundColor: 'orange'}}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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
          placeholder="Liste Seç"
          // value={props.listNames[0]}
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
            {
              if (props.addedLink === true) {
                setModalVisible(true);
              }
              setTimeout(() => {
                setModalVisible(false);
              }, 2000);
            }
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: windowWidth - windowWidth / 4,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    width: windowWidth - 50,
  },
});

const mapStateToProps = state => {
  return {
    listNames: state.ListReducer.lists,
    addedLink: state.LinkReducer.addedLink,
  };
};

export default connect(
  mapStateToProps,
  {getList, saveLink},
)(AddLink);
