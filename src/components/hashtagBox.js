import React, {useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {windowWidth, windowHeight} from '../themes/constants';

const hashtagBox = ({data,hash,index,navigation}) => {
  
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap',width:windowWidth-60,}}>
      {data.hashtag ?
      data.hashtag.map(
        (hash, index) =>
          hash !== null ?  (
        <TouchableOpacity
          key={index}
          style={styles.outline}
          onPress={() => {
            navigation.navigate('HashtagModal', {
              screentitle: hash,
            });
          }}>
            <Text style={{fontSize: 14, color: 'white'}}>
              {hash}
            </Text>
        </TouchableOpacity>
        
        
        ) : null
      ):null}
    </View>
    
  );
};

const styles = StyleSheet.create({
  outline: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderWidth: 2,
    marginRight: 7,
    marginBottom: 15,
    marginTop:10,
    padding: 12,
  },
});

export default hashtagBox;
