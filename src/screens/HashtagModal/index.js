import React, {useEffect, useLayoutEffect} from 'react';
import {View, ScrollView,Button} from 'react-native';
import {connect} from 'react-redux';
import {getSelectedHashLinks} from '../../redux/actions/linkActions';
import LinkCard from '../../components/linkCard';

const HashtagModal = ({navigation, ...props}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '#' + props.route.params.screentitle,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'orange',
      },
    });
  }, []);
  useEffect(() => {
    props.getSelectedHashLinks(props.route.params.screentitle);
  }, []);

  return (
    <ScrollView>
    <View style={{paddingTop: 25}}>
      {props.selectedInfo && props.selectedInfo.map((item,index) => (
        <View key={index}>
          <LinkCard data={item} navigation={navigation}/>
        </View>
      ))}
    </View>
    
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    selectedInfo: state.LinkReducer.selectedHashLinks,
  };
};

export default connect(
  mapStateToProps,
  {getSelectedHashLinks},
)(HashtagModal);
