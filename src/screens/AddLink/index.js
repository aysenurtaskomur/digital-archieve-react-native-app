import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import firebase from 'firebase';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import {getList} from '../../redux/actions/listActions';
import {saveLink} from '../../redux/actions/linkActions';
import initialState from '../../redux/reducers/initialState';
import {Formik} from 'formik';
import * as Yup from 'yup';

const {windowWidth, windowHeight} = Dimensions.get('window');

import {decode, encode} from 'base-64';
import {YellowBox} from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

function AddLink({navigation, ...props}) {
  const [link, setLink] = useState('');

  useEffect(() => {
    props.route.params.data === null
      ? setLink('')
      : setLink(props.route.params.data);

    console.log('addlink: ', props.route);
    console.log("aaa")
    props.getList();
    console.log('listdeneme : ', props.listNames);
  }, []);

  const [list, setList] = useState(props.listNames[0]);
  useEffect(() => {
    console.log("bb")

  }, []);

  let data = props.listNames.map(items => ({value: items}));

  return (
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

      <ButtonComp
        title="Ekle"
        onPress={() => {
          props.saveLink(link, list);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownStyle: {
    width: 300,
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
