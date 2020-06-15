import React, {useEffect,useLayoutEffect} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import LinkCard from '../../components/linkCard';
import {getLink} from '../../redux/actions/linkActions';

function ListDetail({route,navigation, ...props}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name
    })
  }, [])
  useEffect(() => {
    props.getLink(route.params.name);
  }, []);
  return (
    <ScrollView>
      {props.linkInfo.map((item, index) => (
        <View key={index}>
          <LinkCard data={item} navigation={navigation} listName={route.params.name}/>
        </View>
      ))}
    </ScrollView>
  );
}


const mapStateToProps = state => {
  return {
    linkInfo: state.LinkReducer.linkInformation,
  };
};

export default connect(
  mapStateToProps,
  {getLink},
)(ListDetail);
