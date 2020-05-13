import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScreenContainer} from 'react-native-screens';
import {FlatGrid} from 'react-native-super-grid';
import {connect} from 'react-redux';
import {getList} from '../redux/actions/listActions';
import {getLink} from '../redux/actions/linkActions';
import {windowWidth,windowHeight} from '../themes/constants';

const box = ({navigation, ...props}) => {
  useEffect(() => {
    props.getList();
  }, []);

  let items = props.currentLists.map(item => ({name: item, code: '#79F021'}));

  return (
    <View>
      <FlatGrid
        itemDimension={130}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
        //fixed
        spacing={18}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[styles.itemContainer, {backgroundColor: item.code}]}
            onPress={() => {
                
              navigation.navigate('ListDetail', {name: item.name});
            }}>
            <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    //marginTop: 10,
    //flex: 1,
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

const mapStateToProps = state => {
  return {
    currentLists: state.ListReducer.lists,
    links : state.LinkReducer.links
  };
};

export default connect(
  mapStateToProps,
  {getList,getLink},
)(box);
