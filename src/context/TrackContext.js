import createDataContext from './createDataContext';
import trackerApi from '../api/trackerApi';
const TrackReducer=(state,action)=>{
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;    
        default:
            break;
    }
};
const fetchTracks=dispatch=>async ()=>{ 
    try{
        const response=await trackerApi.get('/tracks');
        dispatch({type:'fetch_tracks',payload:response.data});
    }
    catch(err){
        console.log(err);
    }
}
const createTrack=dispatch=>async (name,locations)=>{
    try{
        await trackerApi.post('/tracks',{name,locations});
    }
    catch(err){
        console.log(err);
    }
    
}
export const {Provider,Context} =createDataContext(TrackReducer,{fetchTracks,createTrack},[]);
