import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {getAllHashtag} from '../../redux/actions/hashtagActions';
import LinkCard from "../../components/linkCard";

const Search = props => {
  const [search, setSearch] = useState('');
  const [dataSource, setdataSource] = useState('');
  useEffect(() => {
     props.getAllHashtag();
  }, []);

  const searchFilterFunction = (text) => {
    const newData = props.allHashtag.filter(item=>{
      const itemData = item ? item.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })

    setSearch(text);
    setdataSource(newData);
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(value)=>{searchFilterFunction(value)}}
        value={search}
      />
      
      <FlatList
        data={dataSource}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={item => item.id}
      />


    </View>
  );
};

const mapStateToProps = state => {
  return {
    allHashtag : state.HashtagReducer.hashtagAll,
  };
};

export default connect(
  mapStateToProps,
  {getAllHashtag},
)(Search);
