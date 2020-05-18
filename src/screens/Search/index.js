import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  getAllHashtag,
  searchAllLinks,
} from '../../redux/actions/hashtagActions';
import LinkCard from '../../components/linkCard';

const Search = ({navigation, ...props}) => {
  const [search, setSearch] = useState('');
  const [dataSource, setdataSource] = useState('');
  useEffect(() => {
    // props.getAllHashtag();
    props.searchAllLinks();
  }, []);

  const searchFilterFunction = text => {
    var dizi = [];
    props.matchingLinks.map(item => item.hashtag.forEach(i => dizi.push(i)));

    var tags = dizi.filter(item => {
      const itemData = item ? item.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      // console.log('........................: ', itemData.indexOf(textData));
      return itemData.indexOf(textData) > -1;
    });
     
    var matched = props.matchingLinks.filter(items => {
      //  console.log("test: ", items.hashtag)
       var newData = items.hashtag.filter(value => tags.indexOf(value) !== -1)
       return newData.length > 0
    });
    
     console.log("abc: ",matched)

   

    setSearch(text);
    // setdataSource(matched);
  };

  const checkExist = data => {
    data.map(item => {
      console.log('arannalar: ', item);
      props.searchAllLinks(item);
    });
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
        renderItem={({item}) => <Text>{item}</Text>}

        // keyExtractor={item => item.id}
      />

      {/* {console.log("---------: ",props.matchingLinks)} */}
    </View>
  );
};

const styles = StyleSheet.create({
  context: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
const mapStateToProps = state => {
  return {
    allHashtag: state.HashtagReducer.hashtagAll,
    allList: state.ListReducer.lists,
    matchingLinks: state.HashtagReducer.matchingLinkInfo,
  };
};

export default connect(
  mapStateToProps,
  {searchAllLinks, getAllHashtag},
)(Search);
