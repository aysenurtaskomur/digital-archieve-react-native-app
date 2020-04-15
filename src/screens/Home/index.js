import React, {useEffect} from 'react';
import {View,Text,Linking,Alert} from 'react-native';
import ListBox from '../../components/listBox';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import ThemeContext from '../../components/context'

export default function Home({navigation}){
  useEffect(() => {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     firebase.firestore().collection('users')
    //       .doc(user.uid)
    //       .set({
    //         record: '1.kayıt',
    //       });
    //   }
    // });

    
    // Linking.getInitialURL().then((url) => {
    //   // if your app was launched from the share you will get the text
    //   // else url will be null
    //   if (url) {
    //     console.log('shared string/text is ', url);
    //     Alert.alert(url);
    //   }
    //   else{
    //     Alert.alert("yok");
    //   }
    // }).catch(err => console.error('An error occurred', err));
    
  }, []);
  return (
    <SafeAreaProvider>
      <View>
      <ThemeContext.Consumer>
      {
        context => <Text>{ context }</Text>
      }
      </ThemeContext.Consumer>
        <ListBox navigation={navigation} />
      </View>
    </SafeAreaProvider>
  );
}
