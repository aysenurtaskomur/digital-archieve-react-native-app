import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const hashtagBox = () => {
  return (
    <View style={styles.outline}>
      <Text></Text>
    </View>
  )
}

const styles= StyleSheet.create({
  outline:{
    borderRadius: 20,
    borderColor: 'orange',
    borderWidth:2,
    width:100,
    height:30
  }
})
export default hashtagBox
