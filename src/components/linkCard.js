import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import CardView from 'react-native-cardview';
import HashtagBox from './hashtagBox';
import {getLink} from '../redux/actions/linkActions';
import {connect} from 'react-redux';
import {windowWidth, windowHeight} from '../themes/constants';

const linkCard = ({data,navigation,...props}) => {
  useEffect(() => {
    console.log(data)
  }, []);
  return (
    <View style={styles.context}>
      <CardView
        cardElevation={7}
        cardMaxElevation={7}
        cornerRadius={15}
        style={styles.cardLink}>
        <View style={{flex: 2}}>
          <TouchableOpacity onPress={() => Linking.openURL(data.link)}>
            <Text style={{fontSize: 20, color: 'black'}}>
              {data.link}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          {/* <HashtagBox data={item.hashtag} /> */}
          
          {data.hashtag
            ? data.hashtag.map((hash, index) => (
              <TouchableOpacity key={index} onPress={()=>{navigation.navigate('HashtagModal', {screentitle: hash})}}>
                <View style={styles.outline}>
                  <Text style={{fontSize: 16}}>{hash} </Text>
                </View>
              </TouchableOpacity>
                
              ))
            : null}
        </View>
      </CardView>
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
    marginBottom: 5,
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
    marginBottom: 15,
    padding: 12,
  },
  context: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default connect(
  null,
  {getLink},
)(linkCard);
