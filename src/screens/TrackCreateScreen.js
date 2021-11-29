import './_mockLocations';
import React,{useContext,useCallback} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {withNavigationFocus} from 'react-navigation';
import Map from './components/Map';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from  '../hooks/useLoacation';
import TrackForm from './components/TrackForm';
import {FontAwesome} from '@expo/vector-icons';
const TrackCreateScreen=({isFocused})=>{
    const {state,addLocation} =useContext(LocationContext); 
    const callback=useCallback((location)=>{
        addLocation(location,state.recording);
     },[state.recording]);
    const [error]=useLocation(callback,isFocused||state.recording);
    return(
        <>
        <View style={{marginTop:50}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:'green'}}>CREATE A TRACK</Text>
        <Map/>
        {error?<Text h5>Please Enable the Permissions</Text>:null}
        <TrackForm/>
        </View>
        </>
    );
};
TrackCreateScreen.navigationOptions={
    title:"Add Track",
    tabBarIcon:<FontAwesome name='plus' size={20}/>
}
export default withNavigationFocus(TrackCreateScreen); 