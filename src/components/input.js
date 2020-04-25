import React from 'react';
import {TextInput, StyleSheet, Dimensions, View} from 'react-native';
import PropTypes from 'prop-types';

const windowWidth = Dimensions.get('window').width;

const input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  onBlur,
  style,
  ...props
}) => {
  return (
    <TextInput
      underlineColorAndroid="transparent"
      style={style ? style:styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      onBlur={onBlur}
    />
  );
};

input.propTypes = {
  change: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    width: (4 * windowWidth) / 5,
    borderRadius: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    elevation: 6,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    margin: 10,
  },
});

export default input;
