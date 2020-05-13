import React, {useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import LinkCard from '../../components/linkCard';

export default function ListDetail({route, ...props}) {
  return (
    <ScrollView>
      <View style={styles.context}>
        <LinkCard name={route.params.name} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  context: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
