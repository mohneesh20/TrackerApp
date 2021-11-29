import React,{useContext} from 'react';
import {StyleSheet,ActivityIndicator} from 'react-native';
import MapView,{Polyline,Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {Context as LocationContext} from '../../context/LocationContext';
const Map=()=>{
    const {state:{currentLocation,locations}}=useContext(LocationContext);
    return(
        <>
        {currentLocation?<MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
             latitudeDelta:0.01,
            longitudeDelta:0.01,
            ...currentLocation.coords,
        }}
        region={{
            latitudeDelta:0.01,
            longitudeDelta:0.01,
            ...currentLocation.coords,            
        }}
        >
        <Circle
        center={currentLocation.coords}
        radius={10}
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,0.5)"
        />
        <Polyline
        coordinates={locations.map((location)=>location.coords)}
        lineDashPattern={[1]}
        lineCap="square"
        strokeWidth={2} 
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,0.5)"
        />
        </MapView>:
        <ActivityIndicator size='large' color='dodgerblue' style={{marginTop:120}}/>}
        </>
    );
};
const styles=StyleSheet.create({
    map:{
        marginVertical:10,
        height:350.0,
        width:'100%',
        // backgroundColor:'red',
    }
})
export default Map;