import React, {useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';

const hashtagBox = props => {
  
  return (
    <TouchableOpacity>
      <View style={{flex:1,flexDirection:'row'}}>
      {props.data ? props.data.map((item, index) => (
        <View key={index} style={styles.outline}>
          <Text style={{fontSize:15}}>{item} </Text>
        </View>
      )) : null}
    </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  outline: {
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 50,
    borderColor: 'orange',
    borderWidth: 2,
    // width: 100,
    // height: 35,
    marginRight:7,
    marginBottom:8,
    padding:12
  },
});

export default hashtagBox;
