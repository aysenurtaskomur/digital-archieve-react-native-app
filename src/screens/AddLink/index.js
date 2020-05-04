import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import firebase from 'firebase';

export default function Addlink({ navigation, route}) {


  useEffect(() => {
    console.log(route);
    //firebase.auth().onAuthStateChanged(user => {
     // if (user) {
    //    console.log('addlink: ', route);
    //  }
   // });
  }, []);
  // navigation kısmı nerede 
  return (
    <View style={styles.container}>
      <InputComp placeholder="Link Ekle" />


      <ButtonComp title="Ekle" />
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
