import React,{useState,useContext,useEffect} from 'react';
import {View,TouchableOpacity} from 'react-native';
import { Text,Input,Button} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation';
const SignInScreen=({navigation})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {state,signIn,clearErrorMessage,tryLocalStorage}=useContext(AuthContext);
    useEffect(()=>{
        tryLocalStorage();
    },[]);
    return(
        <View style={{margin:5,flex:1,justifyContent:'center'}}>
            <NavigationEvents
            onWillBlur={()=>clearErrorMessage()}
            />
            <Text h3 style={{marginBottom:30,alignSelf:'center'}}>SIGN IN</Text>
            <Input label="EMAIL" value={email} onChangeText={(text)=>setEmail(text)} autoCapitalize="none" autoCorrect={false}></Input>
            <Input label="PASSWORD"value={password} onChangeText={(text)=>setPassword(text)} autoCapitalize="none" autoCorrect={false} secureTextEntry></Input>
            <View style={{marginTop:-15.0,marginHorizontal:10}}>
            {state.errorMessage?<Text style={{color:'red',marginBottom:5}} h10>{state.errorMessage}</Text>:null}
            <Button title="S I G N  I N" onPress={()=>signIn({email,password})}/>
            <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                <Text style={{color:'dodgerblue',fontSize:15,fontWeight:'bold',marginTop:5}}>Dont have an account?SignUp instead!</Text>
            </TouchableOpacity>
            </View>
        </View>  
    );
};
SignInScreen.navigationOptions=()=>{
    return {
        headerShown:false
    }
}
// const styles=StyleSheet.create({});
export default SignInScreen;