import React,{useContext,useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
// import {NavigationEvents} from 'react-navigation';
const Spinner=()=>{
    const {tryLocalStorage}=useContext(AuthContext);
    useEffect(() => {
        tryLocalStorage();
    }, []);
    return(
        <>
        <ActivityIndicator size='large' color='dodgerblue' style={{marginTop:250}}/>
        </>
    );
};
Spinner.navigationOptions=()=>{
    return {
        headerShown:false
    }
}
export default Spinner;