import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {getAllLinks} from '../../redux/actions/linkActions';
import LinkCard from '../../components/linkCard';

const Search = ({navigation, ...props}) => {
  const [search, setSearch] = useState('');
  const [dataSource, setDataSource] = useState('');
  useEffect(() => {
    props.getAllLinks();
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

  return (
    <View>
      <SearchBar
        round
        searchIcon={{size: 26,color:'orange'}}
        lightTheme={true}
        inputContainerStyle={{backgroundColor: 'white'}}
        containerStyle={{backgroundColor: '#F7F7F7'}}
        placeholder="Hashtag ile Ara"
        onChangeText={value => {
          searchFilterFunction(value);
        }}
        value={search}
      />

      <FlatList
        data={dataSource}
        renderItem={({item}) => <LinkCard navigation={navigation} data={item} />}
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
