import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import CardView from 'react-native-cardview';
import HashtagBox from './hashtagBox';
import {getLink} from '../redux/actions/linkActions';
import {connect} from 'react-redux';
import {windowWidth, windowHeight} from '../themes/constants';

const linkCard = ({name, ...props}) => {
  useEffect(() => {
    props.getLink(name);
  }, []);

  return (
    <View style={{flex: 1}}>
      {props.links.map((item, key) => (
        <View key={key}>
          <CardView
            cardElevation={7}
            cardMaxElevation={7}
            cornerRadius={15}
            style={styles.cardLink}>
            <View style={{flex: 2}}>
              <TouchableOpacity onPress={() => Linking.openURL(item)}>
                <Text style={{fontSize: 20, color: 'black'}}>{item}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 2}}>
              <HashtagBox />
            </View>
          </CardView>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardLink: {
    // marginTop: height/3,
    paddingTop: 20,
    paddingLeft: 15,
    backgroundColor: 'white',
    width: windowWidth - 30,
    height: windowHeight / 6,
    marginBottom: 15,
  },
});

const mapStateToProps = state => {
  return {
    links: state.LinkReducer.links,
  };
};

export default connect(
  mapStateToProps,
  {getLink},
)(linkCard);
