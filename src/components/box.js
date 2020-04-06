import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import ListDetail from '../screens/ListDetail';
import {ScreenContainer} from 'react-native-screens';

export default function box({navigation}) {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ListDetail');
          }}>
          <View style={styles.size}>
            <Text>fdgdfg</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  size: {
    width: 120,
    height: 120,
    backgroundColor: '#90A4AE',
  },
  content: {
    width: windowWidth / 2,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 30,
  },
});
