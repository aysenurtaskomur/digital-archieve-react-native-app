import React, {useEffect} from 'react';
import {View} from 'react-native';
import ListBox from '../../components/listBox';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';


export default function Home({navigation}) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('users')
          .doc(user.uid)
          .set({
            record: '1.kayıt',
          });
      }
    });
  }, []);
  return (
    <SafeAreaProvider>
      <View>
        <ListBox navigation={navigation} />
      </View>
    </SafeAreaProvider>
  );
}
