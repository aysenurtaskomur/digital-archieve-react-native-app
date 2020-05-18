import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import CardView from 'react-native-cardview';
import HashtagBox from './hashtagBox';
import {getLink} from '../redux/actions/linkActions';
import {connect} from 'react-redux';
import {windowWidth, windowHeight} from '../themes/constants';
import {getAllHashtag, searchAllLinks} from '../redux/actions/hashtagActions';

const linkCard = ({name, ...props}) => {
  useEffect(() => {
    console.log('k: ', name);
    props.getLink(name);
  }, []);

  return (
    <View style={{flex: 1}}>
      {props.linkInfo.map((item, key) => (
        <View key={key}>
          <CardView
            cardElevation={7}
            cardMaxElevation={7}
            cornerRadius={15}
            style={styles.cardLink}>
            <View style={{flex: 2}}>
              <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <Text style={{fontSize: 20, color: 'black'}}>{item.link}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              {/* <HashtagBox data={item.hashtag} /> */}
              {item.hashtag
                ? item.hashtag.map((hash, index) => (
                    <View key={index} style={styles.outline}>
                      <Text style={{fontSize: 15}}>{hash} </Text>
                    </View>
                  ))
                : null}
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
    paddingHorizontal: 15,
    backgroundColor: 'white',
    width: windowWidth - 30,
    height: windowHeight / 6,
    marginBottom: 15,
  },
  outline: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'orange',
    borderWidth: 2,
    // width: 100,
    // height: 35,
    marginRight: 7,
    marginBottom: 8,
    padding: 12,
  },
});

const mapStateToProps = state => {
  return {
    linkInfo: state.LinkReducer.linkInformation,
  };
};

export default connect(
  mapStateToProps,
  {getLink, searchAllLinks},
)(linkCard);
