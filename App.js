import React from 'react';
import {createAppContainer ,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import Spinner from './src/screens/Spinner';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import {Provider as AuthProvider} from './src/context/AuthContext'; 
import {Provider as LocationProvider} from './src/context/LocationContext'; 
import {Provider as TrackProvider} from './src/context/TrackContext'; 
import {setNavigator} from './src/navigatorRef';
import {FontAwesome} from "@expo/vector-icons";
let TrackListFlow=createStackNavigator({
  TrackList:TrackListScreen,
  TrackDetail:TrackDetailScreen
  });
  TrackListFlow.navigationOptions={
    title:'Tracks',
    tabBarIcon:<FontAwesome name="th-list" size={20}/>
  }
const switchNavigator=createSwitchNavigator({
   loginflow:createStackNavigator({
     default:Spinner,
     Signin:SignInScreen,
     Signup:SignUpScreen,
   }),
   mainflow:createBottomTabNavigator({
     TrackListFlow,
     TrackCreate:TrackCreateScreen, 
     Account:AccountScreen,
   })
});
const App= createAppContainer(switchNavigator);
export default ()=>{
  return(
    <TrackProvider>
      <LocationProvider>
          <AuthProvider>
            <App ref={(navigator)=>setNavigator(navigator)}/>
          </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};