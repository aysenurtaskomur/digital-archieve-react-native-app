import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import ButtonComp from '../../components/button';
export default class index extends Component {

  render() {
    const {route} = this.props;
    console.log("calendar: ", route)
    return (
      <View>
        <Text> calendar </Text>
        <ButtonComp
                title="Ekle"
                onPress={()=>{console.log("a")}}
              />
      </View>
    );
  }
}
