import React, {useState,useEffect} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import HeadLine from '../../components/headline';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {signUp} from '../../redux/actions/authActions';
import firebase from 'firebase';

function Register({signUp, navigation, error, ...props}) {
 
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('MainNavigator', {screen: 'Home'});
        console.log(user.email);
      }
    });
  }, []);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const errorMsg = error ? <Text style={styles.errorText}>{error}</Text> : null;
  return (
    <View style={{flex: 1}}>
      <HeadLine content="KAYIT OL" />
      <View style={styles.container}>
        <InputComp
          placeholder="Ad Soyad"
          value={fullname}
          onChangeText={value => setFullname(value)}
        />
        <InputComp
          placeholder="Mail"
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
        <InputComp
          placeholder="Sifre"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry
        />

         {errorMsg}
        <ButtonComp
          title="KAYDOL"
          onPress={() =>{ signUp(email, password); console.log(fullname);}}
          //loading={loading}
        />
      </View>
    </View>
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


export default connect(MapStateToProps, {signUp})(Register);
