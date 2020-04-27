import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Box from './box';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useSafeArea} from 'react-native-safe-area-context';

export default function listBox({navigation,title}) {
  return (
    //kayit sayisi kadar cagirmak icin
      <View style={styles.container}>
        <Box navigation={navigation} title={title} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});
