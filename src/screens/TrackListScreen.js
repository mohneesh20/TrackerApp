import React,{useContext} from 'react';
import {Text,Button,FlatList,TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Context as TrackContext} from '../context/TrackContext';
import {ListItem} from 'react-native-elements';
const TrackListScreen=({navigation})=>{
    const {state,fetchTracks}=useContext(TrackContext);
    // console.log(state);
    return(
        <>
        <NavigationEvents
        onWillFocus={fetchTracks}
        />
        <Text style={{fontSize:30,color:'green',alignSelf:'center',marginBottom:50,marginTop:10}}>LIST OF TRACKS</Text>
        <FlatList 
        data={state}
        keyExtractor={item=>item._id}
        renderItem={({item})=>{
            // console.log(item.name);
            return(
                <TouchableOpacity onPress={()=>navigation.navigate('TrackDetail',{_id:item._id})}>
                   <ListItem topDivider bottomDivider>
                       <ListItem.Content>
                           <ListItem.Title style={{alignSelf:'center',fontSize:20}}>
                               {item.name}
                           </ListItem.Title>
                       </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
            )
        }}/>
        </>
    );
};
TrackListScreen.navigationOptions=()=>{
    return {
        title:'LIST OF TRACKS'
    }
}
export default TrackListScreen;