import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView,Dimensions,ScrollView} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import HeadLine from '../../components/headline';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {signUp} from '../../redux/actions/authActions';
import firebase from 'firebase';
import {Formik} from 'formik';
import * as Yup from 'yup';


function Register({signUp, navigation, error, ...props}) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('MainNavigator', {screen: 'Home'});
        console.log(user.email);
      }
    });
  }, []);

  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const errorMsg = error ? <Text style={styles.errorText}>{error}</Text> : null;

  handleSubmit = values => {
    signUp(values.email, values.password);
    console.log(values.fullName);
  };

  return (
     <ScrollView>
     <KeyboardAvoidingView style={{ flex: 1}} behavior="position">
      <HeadLine content="KAYIT OL" />
      <View style={styles.container}>
        <Formik
          initialValues={{fullName: '', email: '', password: ''}}
          validationSchema={Yup.object().shape({
            fullName: Yup.string()
              .max(16)
              .min(5, 'en az 5 karakter')
              .required('Fullname alanını zorunlu'),
            email: Yup.string()
              .email('Geçersiz Format')
              .required('Email alanı zorunlu'),
            password: Yup.string()
              .min(8, 'Şifre en az 8 karakter olmalı')
              .required('Şifre alanı zorunlu'),
          })}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <React.Fragment>
              
                <View error={errors.fullName && touched.fullName}>
                  <InputComp
                    placeholder="Ad Soyad"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={() => setFieldTouched('fullName')}
                  />
                </View>

                { (errors.fullName && touched.fullName) && <Text style={{color: 'red'}}>{errors.fullName}</Text>}
                <View error={errors.email && touched.email}>
                  <InputComp
                    placeholder="Mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    keyboardType="email-address"
                  />
                </View>

                { (errors.email && touched.email) && <Text style={{color: 'red'}}>{errors.email}</Text>}
                <View error={errors.password && touched.password}>
                  <InputComp
                    placeholder="Sifre"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry
                  />
                </View>

                { (errors.password && touched.password) && <Text style={{color: 'red'}}>{errors.password}</Text>}
                <ButtonComp
                  title="KAYDOL"
                  onPress={handleSubmit}
                  disabled={!values.email || !values.password || !values.fullName}
                  //loading={loading}
                />
                {errorMsg}
             
            </React.Fragment>
          )}
        </Formik>
      </View>
  </KeyboardAvoidingView> 
  </ScrollView>
  );
}

Register.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
  },
});

const MapStateToProps = state => {
  return {
    user: state.auth.user,
    error: state.auth.error,
  };
};

export default connect(
  MapStateToProps,
  {signUp},
)(Register);
