import React,{useContext} from 'react';
import {Input,Button} from 'react-native-elements';
import {View} from 'react-native';
import useSaveTrack from '../../hooks/useSaveTrack';
import {Context as LocationContext} from '../../context/LocationContext';
const TrackForm=()=>{
    const {state:{name,recording,locations},stopRecording,changeName,startRecording}=useContext(LocationContext);
    // console.log(locations.length);
    const [saveTrack]=useSaveTrack();

    return(
        <>
        <Input style={{borderWidth:2,borderColor:'white',borderRadius:5,padding:10}} value={name} onChangeText={changeName}/>
        <View style={{marginHorizontal:10,marginTop:-15}}>
        {!recording?<Button title="START RECORDING" onPress={startRecording}/>
        :<Button title="STOP RECORDING" onPress={stopRecording}/>
        }
        {
            !recording && locations.length && name?<View style={{marginTop:20}}><Button title='SAVE CHANGES' onPress={saveTrack}/></View>:null
        }
        </View>
        </>
    );
};
export default TrackForm;