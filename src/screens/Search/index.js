import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {getAllLinks} from '../../redux/actions/linkActions';
import LinkCard from '../../components/linkCard';

const Search = ({navigation, ...props}) => {
  const [search, setSearch] = useState('');
  const [dataSource, setDataSource] = useState('');
  useEffect(() => {
    props.getAllLinks();
    searchBar;
  }, []);

  var matched;
  const searchFilterFunction = text => {
    var allHashtags = [];
    props.allLinksInfo.map(item =>
      item.hashtag.forEach(i => allHashtags.push(i)),
    );

    var tags = allHashtags.filter(item => {
      const itemData = item ? item.toUpperCase() : ''.toUpperCase();
      const textData = text ? text.toUpperCase() : null;
      return itemData.indexOf(textData) > -1;
    });
    matched = props.allLinksInfo.filter(items => {
      var newData = items.hashtag.filter(value => {
        return tags.indexOf(value) !== -1;
      });
      return newData.length > 0;
    });

    setSearch(text);
    setDataSource(matched);
  };

  const renderCard = (item, navigation) => {
    return (
      <LinkCard navigation={navigation} data={item} listName={item.listname} />
     
    );
  };
  
  function searchBar(){
    return (
      <View style={{marginBottom: 25}}>
        <SearchBar
          round
          searchIcon={{size: 26, color: 'orange'}}
          lightTheme={true}
          inputContainerStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: '#F7F7F7'}}
          placeholder="Hashtag ile Ara"
          onChangeText={value => {
            searchFilterFunction(value);
          }}
          value={search}
        />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={dataSource}
        ListHeaderComponent={searchBar}
        stickyHeaderIndices={[0]}
        renderItem={({item}) => renderCard(item, navigation)}
        keyExtractor={item => item.id}
      />

    </View>
  );
};

const mapStateToProps = state => {
  return {
    allLinksInfo: state.LinkReducer.allLinksInfo,
  };
};

export default connect(
  mapStateToProps,
  {getAllLinks},
)(Search);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
