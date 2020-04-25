import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import initialState from '../../redux/reducers/initialState';
import LinkCard from '../../components/linkCard'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class ListDetail extends Component {
  render() {
    return (
      <View style={styles.context}>
        <LinkCard/>
      </View>
      
      
    );
  }
}
 
const styles = StyleSheet.create({
  context: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

