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

const windowWidth = Dimensions.get('window').width;

function Login({signIn, navigation, error, ...props}) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('MainNavigator', {screen: 'Home'});
      }
    });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorMsg = error ? <Text style={styles.errorText}>{error}</Text> : null;

  
  return (
    <View style={{flex: 1}}>
      <HeadLine content="Giriş Yap" />

      <View style={styles.viewStyle}>
        <InputComp
          placeholder=" Email"
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
        <InputComp
          placeholder=" Şifre"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.textStyle}>Şifremi Unuttum</Text>
        </TouchableOpacity>

        {errorMsg}

        <ButtonComp
          title="GİRİŞ"
          onPress={() => {
            signIn(email, password);
          }}
          //loading={loading}
        />

        <Text style={{fontSize: 16}}>Bir hesabın yok mu? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textStyle}> Kaydol.</Text>
        </TouchableOpacity>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, {signIn})(Login);
