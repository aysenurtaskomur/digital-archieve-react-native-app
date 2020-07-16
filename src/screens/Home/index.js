import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Box from '../../components/box';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import FabComp from '../../components/fab';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {createList, getList} from '../../redux/actions/listActions';
const windowWidth = Dimensions.get('window').width;

const Home = ({navigation, value, ...props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listeAdi, setListeAdi] = useState('');

  const addList = listeAdi => {
    console.log('addlist');
    props.createList(listeAdi);
    setModalVisible(!modalVisible);
    setListeAdi('');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Box navigation={navigation} />

      <FabComp
        onPress={() => {
          setModalVisible(true);
        }}
      />

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
                onChangeText={value => {
                  setListeAdi(value);
                }}
                style={styles.listnameInput}
                value={listeAdi}
                placeholder="Liste Adı"
              />

              <ButtonComp
                title="Oluştur"
                onPress={() => {
                  addList(listeAdi);
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 40,
    padding: 10,
    elevation: 2,
    width: 80,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  listnameInput: {
    width: (2 * windowWidth) / 3,
    borderRadius: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    elevation: 6,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    margin: 10,
  },
});

const mapStateToProps = state => {
  return {
    addedList: state.ListReducer.createList,
    currentLists: state.ListReducer.lists,
    createError: state.ListReducer.createError,
  };
};

export default connect(
  mapStateToProps,
  {createList, getList},
)(Home);
