import React,{useContext} from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {Context as TrackContext} from '../context/TrackContext'; 
import MapView,{Polyline,Circle,PROVIDER_GOOGLE} from 'react-native-maps';
const TrackDetailScreen=({navigation})=>{
    const _id=navigation.getParam('_id');
    const {state}=useContext(TrackContext);
    const track=state.find(t=>t._id===_id);
    const initialCoords=track.locations[0].coords;
    // console.log(_id);
    return(
        <>
        <Text style={{fontSize:30,color:'green',alignSelf:'center',marginBottom:50,marginTop:10}}>TRACK DETAILS</Text>
        <Text h2 style={{marginHorizontal:20,marginTop:20}}>{track.name}</Text>
        <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
             latitudeDelta:0.01,
            longitudeDelta:0.01,
            ...initialCoords,
        }}
        region={{
            latitudeDelta:0.01,
            longitudeDelta:0.01,
            ...initialCoords,            
        }}
        >
        <Circle
        center={track.locations[track.locations.length-1].coords}
        radius={5}
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,0.5)"
        />
        <Polyline
        coordinates={track.locations.map(loc=>loc.coords)}
        lineDashPattern={[1]}
        lineCap="square"
        strokeWidth={2} 
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,0.5)"
        />
        </MapView>
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
export default TrackDetailScreen;