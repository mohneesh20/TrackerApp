import createDataContext from './createDataContext';
import trackerApi from '../api/trackerApi';
// import {AsyncStorage} from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {navigate} from '../navigatorRef';
const authReducer=(state,action)=>{
    switch (action.type) {
        case 'add_error':
            return {...state,errorMessage:action.payload};
        case 'signUp':
            return {errorMessage:'',token:action.payload};
        case 'signIn':
            return {errorMessage:'',token:action.payload};
        case 'clear_error_message':
            return {...state,errorMessage:''};
        case 'signOut':
            return {token:null,errorMessage:''};
        default:
            return state;
    }
}
const signUp=(dispatch)=>{
    return async ({email,password})=>{
        try{
            const response=await trackerApi.post(`/signUp`,{email,password});
            const {token}=response.data;
            await AsyncStorage.setItem('token',token);
            dispatch({type:'signUp',payload:response.data.token});
            navigate('TrackList');
        }
        catch(err){
            dispatch({type:'add_error',payload:err.response.data});
        }
    }
}
const signIn=(dispatch)=>{
    return async ({email,password})=>{
        try{
            // console.log(email);
            const response=await trackerApi.post(`/signIn`,{email,password});
            const {token}=response.data;
            await AsyncStorage.setItem('token',token);
            dispatch({type:'signIn',payload:response.data.token});
            navigate('TrackList');
        }
        catch(err){
            dispatch({type:'add_error',payload:err.response.data.error});
        }
    }
}
// const signOut=(dispatch)=>{
//     return ()=>{
        
//     }
// }
const tryLocalStorage=(dispatch)=>async ()=>{
    const token=await AsyncStorage.getItem('token');
    if(token){
        await dispatch({type:'signIn',payload:token});
        navigate('TrackList');
    }
    else{
        navigate('Signin');
    }
}
const clearErrorMessage=(dispatch)=>{
    return ()=>{
        dispatch({type:'clear_error_message'})
    }
}
const signOut=dispatch=>async ()=>{
    await AsyncStorage.removeItem('token');
    dispatch({type:'signOut'});
    navigate('Signin');
}
export const {Provider,Context}=createDataContext(authReducer,{signIn,signUp,clearErrorMessage,tryLocalStorage,signOut},{token:null,errorMessage:''});