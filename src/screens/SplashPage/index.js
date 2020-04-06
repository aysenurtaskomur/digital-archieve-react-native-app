import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import firebase from 'firebase';

export default function SplashPage({navigation}) {
  React.useEffect(() => {
  console.log("Splash Effect");
  firebase.auth().signOut();
    setTimeout(() => {
     firebase.auth().signOut()
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate('MainNavigator', {screen: 'Home'});
        } else {
          navigation.navigate('Login');
        }
      });
      
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Text>SPLASH PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
