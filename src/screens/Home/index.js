import * as React from 'react';
import {View} from 'react-native';
import ListBox from '../../components/listBox';
import {SafeAreaProvider} from 'react-native-safe-area-context';


export default function Home({navigation}) {
  return (
    <SafeAreaProvider>
      <View>
        <ListBox navigation={navigation} />
      </View>
    </SafeAreaProvider>
  );
}
