import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import HeadLine from '../../components/headline';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {signIn} from '../../redux/actions/authActions';
import firebase from 'firebase';
import {Formik} from 'formik';
import * as Yup from 'yup';

const windowWidth = Dimensions.get('window').width;

function Login({signIn, navigation, error, loading}) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
       //navigation.navigate('MainNavigator', {screen: 'Home'});
       console.log(user.email)

       
      
      }
    });
  }, []);

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const errorMsg = error ? <Text style={styles.errorText}>{error}</Text> : null;

  handleSubmit = values => {
    signIn(values.email, values.password,navigation);
  };
  return (
    <View style={{flex: 1}}>
      <HeadLine content="Giriş Yap" />
      <View style={styles.viewStyle}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={Yup.object().shape({
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
              <View error={errors.email && touched.email}>
                <InputComp
                  placeholder=" Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && touched.email && (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              )}

              <View error={errors.password && touched.password}>
                <InputComp
                  placeholder=" Şifre"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  secureTextEntry
                />
              </View>
              {errors.password && touched.password && (
                <Text style={{color: 'red'}}>{errors.password}</Text>
              )}

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.textStyle}>Şifremi Unuttum</Text>
              </TouchableOpacity>

              {errorMsg}

              <ButtonComp
                title="GİRİŞ"
                onPress={handleSubmit}
                disabled={!values.email || !values.password}
                loading={loading}
              />

              <Text style={{fontSize: 16}}>Bir hesabın yok mu? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textStyle}> Kaydol.</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </Formik>
      </View>
    </View>
  );
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 2,
    alignItems: 'center',
  },
  textStyle: {
    color: '#1976D2',
    fontSize: 16,
    textAlign: 'right',
    alignSelf: 'stretch',
    marginRight: windowWidth / 6,
  },
  inputTitle: {
    color: '#8A8E9D',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    paddingTop: 5,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

export default connect(
  mapStateToProps,
  {signIn},
)(Login);
