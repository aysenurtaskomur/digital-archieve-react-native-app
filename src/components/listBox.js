import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Box from './box';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useSafeArea} from 'react-native-safe-area-context';

export default function listBox({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        <Box navigation={navigation} />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
