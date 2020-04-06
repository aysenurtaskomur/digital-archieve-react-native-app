import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';



export default class icons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {name} = this.props;
    return (
      <View>
        <Image style={{width: 30, height: 30}} source={name} />
      </View>
    );
  }
}
