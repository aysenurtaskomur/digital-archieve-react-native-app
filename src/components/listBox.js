import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Box from './box';

export default function listBox({navigation, ...props}) {

  return (
    <View style={styles.container}>
      <Box navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
