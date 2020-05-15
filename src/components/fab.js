import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Fab} from 'native-base';
//import Icon from 'react-native-vector-icons/Ionicons';
import Images from '../themes/images';
import Icons from '../components/icons';

const actionButton = ({onPress}) => {
  const iconName= Images.AddList;
  return (
    <Fab
      active={'true'}
      direction="up"
      containerStyle={{flex: 1}}
      style={{backgroundColor: 'orange'}}
      position="bottomRight"
      onPress={onPress}>
      <Icons name={iconName} />
    </Fab>
  );
};
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
export default actionButton;
