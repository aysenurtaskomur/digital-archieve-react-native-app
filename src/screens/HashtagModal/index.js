import React,{useEffect,useLayoutEffect} from 'react'
import { View, Text, } from 'react-native'

const HashtagModal = ({navigation,...props}) => {
useLayoutEffect(() => {
  navigation.setOptions({
    title:  '#'+props.route.params.screentitle,
    headerTitleAlign: 'center',
  });

}, [])
  return (
    <View>
      <Text>{props.route.params.title}</Text>
    </View>
  )
}

export default HashtagModal
