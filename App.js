import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './src/screens/Search';
import AddLink from './src/screens/AddLink';
import ListDetail from './src/screens/ListDetail';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import SplashPage from './src/screens/SplashPage';
import ForgotPassword from './src/screens/ForgotPassword';
import HashtagModal from './src/screens/HashtagModal';

import Icons from './src/components/icons';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/redux/reducers/index';
import Images from './src/themes/images';

import {decode, encode} from 'base-64';
import {YellowBox} from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
const HomeStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export function MainNavigator(props) {
  // console.log("mainnavigator: ",props.route.params.extraData)
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? Images.HomeActive : Images.HomeInactive;
          } else if (route.name === 'Search') {
            iconName = focused ? Images.SearchActive : Images.SearchInactive;
          } else if (route.name === 'AddLink') {
            iconName = focused ? Images.AddActive : Images.AddInactive;
          }
          return <Icons name={iconName} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'grey',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="AddLink"
        initialParams={{data: props.route.params.extraData}}
        component={AddLink}
      />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home" mode="modal">
      <HomeStack.Screen
        name={'Home'}
        options={{
          headerShown: false,
        }}
        component={Home}
      />
      <HomeStack.Screen
        name={'ListDetail'}
        component={ListDetail}
        options={{title: null}}
      />
      <HomeStack.Screen
        name={'HashtagModal'}
        component={HashtagModal}
        options={{title: null}}
      />
    </HomeStack.Navigator>
  );
}

export default function App(props) {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="SplashPage">
          <MainStack.Screen
            name="SplashPage"
            component={SplashPage}
            options={{
              headerShown: false,
            }}
            initialParams={{
              extraData: props.url,
            }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: null,
            }}
          />
          <MainStack.Screen
            name="MainNavigator"
            component={MainNavigator}
            options={{
              headerShown: false,
            }}
            initialParams={{
              extraData: props.url,
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
