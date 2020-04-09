import React from 'react';
import {View, Text, StyleSheet,Dimensions} from 'react-native';


const windowHeight = Dimensions.get('window').height;

const headline = ({content}) => {
  return (
    <View style={{height:windowHeight/3, alignItems: 'center', justifyContent: 'center'}}>
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