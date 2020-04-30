import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CardView from 'react-native-cardview';
import {ScreenContainer} from 'react-native-screens';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';

import {connect} from 'react-redux';
import {getList} from '../redux/actions/listActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const box = ({navigation, title,...props}) => {

  useEffect(() => {
    console.log("use effect");
    props.getList();
    
  },[]);


  let items = props.currentLists.map(item=> ({name: item, code:'#3498db' }))

  // const items = [
  //   {name: 'TURQUOISE', code: '#1abc9c'},
  //   {name: 'EMERALD', code: '#2ecc71'},
  //   {name: 'PETER RIVER', code: '#3498db'},
  //   //{name: 'AMETHYST', code: '#9b59b6'},
  //   // {name: 'WET ASPHALT', code: '#34495e'},
  //   // {name: 'GREEN SEA', code: '#16a085'},
  //   // {name: 'NEPHRITIS', code: '#27ae60'},
  //   // {name: 'BELIZE HOLE', code: '#2980b9'},
  //   // {name: 'WISTERIA', code: '#8e44ad'},
  //   // {name: 'MIDNIGHT BLUE', code: '#2c3e50'},
  //   // {name: 'SUN FLOWER', code: '#f1c40f'},
  //   // {name: 'CARROT', code: '#e67e22'},
  //   // {name: 'ALIZARIN', code: '#e74c3c'},
  //   // {name: 'CLOUDS', code: '#ecf0f1'},
  //   // {name: 'CONCRETE', code: '#95a5a6'},
  //   // {name: 'ORANGE', code: '#f39c12'},
  //   // {name: 'PUMPKIN', code: '#d35400'},
  //   // {name: 'POMEGRANATE', code: '#c0392b'},
  //   // {name: 'SILVER', code: '#bdc3c7'},
  // ];

  //if props varsa var obj={name: {props} , code: random}
  // if (title != '') {
  //   var obj = {name: title, code: '#d35400'};
  //   items.push(obj);
  //   console.log(items);
  // }

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
              
              navigation.navigate('ListDetail');
            }}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
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
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

function mapStateToProps(state) {
  console.log("————-",  state.ListReducer.lists);
  return{
    currentLists: state.ListReducer.lists,
  }
}

export default connect(
  mapStateToProps,
  {getList},
)(box);
