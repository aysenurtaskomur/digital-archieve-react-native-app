import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

export default class ListDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ],
    };
  }

  Item = title => {
    return (
      <TouchableOpacity>
        <View style={{marginHorizontal: 10}}>
          <Card style={{padding: 10}}>
            <CardItem>
              <Body>
                <Text>{title}</Text>
              </Body>
            </CardItem>
          </Card>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return <View style={styles.line} />;
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.Item(item.title)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
});
