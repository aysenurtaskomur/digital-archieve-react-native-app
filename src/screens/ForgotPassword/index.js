import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import HeadLine from '../../components/headline';
import Firebase from '../../../config/firebase';

export default function ForgotPassword({navigation}) {
  const [resetMail, setResetMail] = useState(0);

  function clicked(mail) {
    console.log('tiklandi');

    var auth = Firebase.auth();
    var emailAddress = mail;
    if (mail != '') {
      auth
        .sendPasswordResetEmail(emailAddress)
        .then(function() {
          console.log(emailAddress);
        })
        .catch(function(error) {
          Alert.alert('Böyle bir hesap bulunamadi');
        });
    } else {
      Alert.alert('Lütfen mail adresinizi girin');
    }
  }

  return (
    <View style={{flex:1}}>
      <HeadLine content="Şifreni Sıfırla" />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
            margin: 15,
          }}>
          Lütfen aşağıya e-posta adresinizi girin, size hesabınızı kurtarmak
          için bilgi gönderelim.
        </Text>

        <InputComp
          keyboardType="email-address"
          onChangeText={value => setResetMail(value)}
        />
        <ButtonComp
          title="GÖNDER"
          onPress={() => {
            clicked(resetMail);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
  },
});
