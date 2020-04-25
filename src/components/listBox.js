import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Box from './box';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useSafeArea} from 'react-native-safe-area-context';

export default function listBox({navigation}) {
  return (
    //kayit sayisi kadar cagirmak icin
      <View style={styles.container}>
        <Box navigation={navigation} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});
