import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;

const button = ({onPress, title, loading}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#79F021',
        marginTop: 20,
        backgroundColor: '#79F021',
        borderRadius: 20,
        width: windowWidth / 2,
      }}>
      <Button
        title={title}
        onPress={onPress}
        type="clear"
        loading={loading}
        loadingProps={{color:'white'}}
        titleStyle={{color:'white'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});
export default button;
