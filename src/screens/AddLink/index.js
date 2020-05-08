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
  // const [link, setLink] = useState('www.instagram.com');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('addlink: ', props.route);
        console.log(initialState.links)
      }
    });
  }, []);

  let data = props.listNames.map(items => ({value: items}));

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{link: '', list: ''}}
        validationSchema={Yup.object().shape({
          link: Yup.string()
            .email('Geçersiz Format')
            .required('Email alanı zorunlu'),
          list: Yup.string()
            .min(8, 'Şifre en az 8 karakter olmalı')
            .required('Şifre alanı zorunlu'),
        })}
        // onSubmit={values => {
        //   handleSubmit(values);
        // }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldTouched,
        }) => (
          <React.Fragment>
            {/* sadece link verilebilmeli */}
            <InputComp
              placeholder="Kayıt Ekle"
              value={
                props.route.params.data === null
                  ? values.link
                  : props.route.params.data
              }
              onChangeText={handleChange('link')}
            />

            <Dropdown
              // containerStyle={{
              //   width: 250,
              //   borderRadius: 20,
              //   backgroundColor: 'yellow',
              //   borderBottomWidth: 1,
              // elevation: 6,
              // shadowOffset: {width: 5, height: 5},
              // shadowColor: 'grey',
              // shadowOpacity: 0.5,
              // shadowRadius: 10,
              // margin: 10,
              // height: 50
              // }}
              pickerStyle={{
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
              }}
              inputContainerStyle={{
                width: 300,
                borderRadius: 20,
                backgroundColor: 'white',
                borderBottomWidth: 1,
                elevation: 6,
                shadowOffset: {width: 5, height: 5},
                shadowColor: 'grey',
                shadowOpacity: 0.5,
                shadowRadius: 10,
                margin: 10,
                height: 50,
                paddingHorizontal: 10,
              }}
              dropdownOffset={{top: 12}}
              rippleCentered={true}
              data={data}
              onChangeText={handleChange('list')}
              value={values.list}
            />

            <ButtonComp
              title="Ekle"
              onPress={() => {
                props.saveLink(values.link, values.list, data);
              }}
            />
          </React.Fragment>
        )}
      </Formik>
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
