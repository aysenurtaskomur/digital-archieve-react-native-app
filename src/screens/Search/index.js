import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {getAllHashtag,searchAllLinks} from '../../redux/actions/hashtagActions';
import LinkCard from '../../components/linkCard';

const Search = props => {
  const [search, setSearch] = useState('');
  const [dataSource, setdataSource] = useState('');
  useEffect(() => {
    props.getAllHashtag();
    props.searchAllLinks();
  }, []);

  const searchFilterFunction = text => {
    const newData = props.allHashtag.filter(item => {
      const itemData = item ? item.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setSearch(text);
    setdataSource(newData);
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={value => {
          searchFilterFunction(value);
        }}
        value={search}
      />

      {/* {props.allList.map(listname => {
        <FlatList
          data={dataSource}
          renderItem={({item}) => <LinkCard name={listname} />}
          keyExtractor={item => item.id}
        />;
      })} */}


      <FlatList
          data={dataSource}
          renderItem={({item}) => <LinkCard name={"Instagram"}/>}
          keyExtractor={item => item.id}
        />



    </View>
  );
};

const mapStateToProps = state => {
  return {
    allHashtag: state.HashtagReducer.hashtagAll,
    allList: state.ListReducer.lists,
  };
};

export default connect(
  mapStateToProps,
  {getAllHashtag,searchAllLinks},
)(Search);
