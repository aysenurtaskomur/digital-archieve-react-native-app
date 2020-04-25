import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import CardView from 'react-native-cardview';
import initialState from '../redux/reducers/initialState';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const linkCard = () => {
  return (
    <TouchableOpacity>
      <CardView
        cardElevation={7}
        cardMaxElevation={7}
        cornerRadius={15}
        style={{
          backgroundColor: 'white',
          width: windowWidth - 30,
          height: 110,
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>
          {initialState.receivedLink}
        </Text>
      </CardView>
    </TouchableOpacity>
  );
};

export default linkCard;
