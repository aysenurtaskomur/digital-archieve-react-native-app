import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import CardView from 'react-native-cardview';
import HashtagBox from './hashtagBox';
import {getLink, deleteLink, hashtagAdd} from '../redux/actions/linkActions';
import {connect} from 'react-redux';
import {windowWidth, windowHeight} from '../themes/constants';
import Images from '../themes/images';
import InputComp from '../components/input';
import ButtonComp from '../components/button';

const linkCard = ({data, navigation, listName, ...props}) => {
  const [del, setDel] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hashtag, setHashtag] = useState(null);

  const addHashInput = () => {
    props.hashtagAdd(listName, data.link, hashtag);
    setModalVisible(false);
    setDel(false);
  };
  return (
    <View style={styles.context}>
      <TouchableWithoutFeedback
        onLongPress={() => {
          setDel(!del);
        }}>
        <CardView
          cardElevation={7}
          cardMaxElevation={7}
          cornerRadius={15}
          style={styles.cardLink}>
          {del === true ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.hashtagButton}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Image source={Images.AddHashtag} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.hashtagButton}
                onPress={() => {
                  props.deleteLink(data.link, listName);
                  setDel(false);
                }}>
                <Image source={Images.Trash} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => Linking.openURL(data.link)}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {data.link}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 2, flexDirection: 'row',}}>
                {/* <HashtagBox data={item.hashtag} /> */}
                {data.hashtag
                  ? data.hashtag.map((hash, index) => (
                      hash !== null ?
                      (
                        <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate('HashtagModal', {
                            screentitle: hash,
                          });
                        }}>
                        <View style={styles.outline}>
                          <Text style={{fontSize: 14, color: 'white'}}>
                            {hash}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      ): null
                      
                    
                      
                    ))
                  : null}
              </View>
            </>
          )}
        </CardView>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          {
            setModalVisible(!modalVisible);
          }
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <InputComp
                placeholder="Hashtag Ekle"
                value={hashtag}
                onChangeText={value => {
                  setHashtag(value);
                }}
              />
              <ButtonComp
                title="Ekle"
                onPress={() => {
                  addHashInput(listName, data.link, hashtag);
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardLink: {
    // marginTop: height/3,
    flex: 1,
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
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderWidth: 2,
    // width: 100,
    // height: 35,
    marginRight: 7,
    marginBottom: 15,
    padding: 12,
  },
  context: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  hashtagButton: {
    backgroundColor: '#FFC107',
    padding: 7,
    borderRadius: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: windowWidth - windowWidth / 4,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    width: windowWidth - 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

const mapStateToProps = state => {
  return {
    deleted: state.LinkReducer.delete,
  };
};
export default connect(
  mapStateToProps,
  {getLink, deleteLink, hashtagAdd},
)(linkCard);
