import React, {useEffect} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getFullName} from '../../redux/actions/authActions';
import {windowWidth, windowHeight} from '../../themes/constants';
import {Right, Left, List, ListItem} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from '../../components/icons';
import Images from '../../themes/images';
import HeadLine from '../../components/headline';

function Profile({navigation,...props}) {
  useEffect(() => {
    props.getFullName();
  });
  return (
    // <View>
    <View style={styles.container}>
      {/* style={{height: windowHeight/6, justifyContent: 'center', alignItems: 'center'}} */}

   
      <HeadLine content={props.fullName}/>
      <View>
        <List>
      <TouchableOpacity>
        <ListItem >
          <Left>
            <Text style={{fontSize:19}}>E-mail</Text>
          </Left>
          <Right>
            <Icons name={Images.Arrow}/>
          </Right>
        </ListItem>
      </TouchableOpacity>
        
        <TouchableOpacity>
          <ListItem>
          <Left>
            <Text style={{fontSize:19}}>Şifre</Text>
          </Left>
          <Right>
          <Icons name={Images.Arrow}/>
          </Right>
        </ListItem>
        </TouchableOpacity>
        <TouchableOpacity>
          <ListItem>
          <Left>
            <Text style={{fontSize:19}}>Çıkış Yap</Text>
          </Left>
          <Right>
          <Icons name={Images.Arrow}/>
          </Right>
        </ListItem>
        </TouchableOpacity>
        
      </List>
      </View>
      
    </View>
  );
}

const mapStateToProps = state => {
  return {
    fullName: state.AuthReducer.fullName,
  };
};

export default connect(
  mapStateToProps,
  {getFullName},
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  }
})