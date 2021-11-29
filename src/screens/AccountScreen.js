import React,{useContext} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Button,Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
const AccountScreen=()=>{
    const {signOut} =useContext(AuthContext);
    return(
        <SafeAreaView forceInset={{top:'always'}} style={{marginTop:50,padding:10,paddingTop:50}}>
            <Text style={{fontSize:30,color:'green',alignSelf:'center',marginBottom:10,marginTop:10}}>SIGN OUT</Text>
        <Button title="SIGN OUT" onPress={()=>signOut() }/>
        </SafeAreaView>
    );
};
AccountScreen.navigationOptions=()=>{
    return {
        title:"SIGN OUT",
        tabBarIcon:<FontAwesome name="sign-out" size={20}/>
    }
}
export default AccountScreen;