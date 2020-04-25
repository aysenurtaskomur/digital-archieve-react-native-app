import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';

export default function Addlink() {
  return (
    <View style={styles.container}>
      <InputComp
        placeholder="Link Ekle"

      />

  {/* Liste Seçtir */}

      <ButtonComp
        title="Ekle"
      />
    </View>
  );
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center'
  }
})