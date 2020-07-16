import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {ScreenContainer} from 'react-native-screens';
import {FlatGrid} from 'react-native-super-grid';
import {connect} from 'react-redux';
import {deleteList,getList} from '../redux/actions/listActions';
import {windowWidth, windowHeight} from '../themes/constants';
import Images from '../themes/images';
import PropTypes from 'prop-types';

const box = ({navigation, ...props}) => {
  useEffect(() => {
    props.getList();
  }, [])

  const items = props.currentLists.map(item => ({
    name: item,
    code: '#79F021',
    longPressed: false,
  }));

  const [data, setData] = useState(items);

  const content = param => {
    let temp = [...data];
    let currentValue = data[param]['longPressed'];
    temp[param]['longPressed'] = !currentValue;
    setData(temp);
  };

  const deleteFunc = name => {
    props.deleteList(name);
    if (!props.delError) {
      var liste = items.filter(item => {
        if (item.name == name) return item;
      });
      items.pop(liste);
      setData(items);
    } else {
      Alert.alert(props.delError);
    }
  };

  return (
    <View>
      <FlatGrid
        itemDimension={130}
        items={data}
        style={styles.gridView}
        spacing={18}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onLongPress={() => {
              content(index);
            }}
            key={index}
            style={[styles.itemContainer, {backgroundColor: item.code}]}
            onPress={() => {
              navigation.navigate('ListDetail', {name: item.name});
            }}>
            <View style={styles.content}>
              {item.longPressed == true ? (
                <TouchableOpacity
                  onPress={() => {
                    deleteFunc(item.name);
                  }}>
                  <Image source={Images.BigTrash} />
                </TouchableOpacity>
              ) : (
                <Text style={styles.itemName}> {item.name} </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 13,
    padding: 10,
    height: 150,
    //gölge
    elevation: 9,
    // shadowOffset: {width: 8, height: 8},
    // shadowColor: 'grey',
    // shadowOpacity: 0.8,
    // shadowRadius: 10,
  },
  itemName: {
    fontSize: 19,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

box.propTypes = {
  currentLists: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    currentLists: state.ListReducer.lists,
    delete: state.ListReducer.deleteList,
    delError: state.ListReducer.delError,
  };
};

export default connect(
  mapStateToProps,
  {deleteList,getList},
)(box);
