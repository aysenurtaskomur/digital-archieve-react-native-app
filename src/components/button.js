import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;

const button = ({onPress, title, loading,disabled}) => {
  return (
    <View
      style={disabled ? styles.disabledStyle: styles.buttonStyle}>
      <Button
        title={title}
        onPress={onPress}
        type="clear"
        loading={loading}
        loadingProps={{color:'white'}}
        titleStyle={{color:'white'}}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle:{
    borderWidth: 1,
    borderColor: '#79F021',
    marginTop: 20,
    backgroundColor: '#79F021',
    borderRadius: 20,
    width: windowWidth / 2,
  },
  disabledStyle:{
    borderWidth: 1,
    borderColor: '#79F021',
    marginTop: 20,
    //backgroundColor: '#B2FF59',
    backgroundColor:'red',
    borderRadius: 20,
    width: windowWidth / 2,
  }
});
export default button;
