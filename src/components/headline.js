import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const headline = ({content}) => {
  return (
    <View style={{flex: 5 / 4, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.headlineStyle}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headlineStyle: {
    fontSize: 40,
  },
});

export default headline;