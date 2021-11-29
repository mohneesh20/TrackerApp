  import {useState,useEffect} from 'react';
  import {Accuracy,requestForegroundPermissionsAsync,watchPositionAsync} from 'expo-location';
  export default  (callback,shouldTrack)=>{
    const [error,setError]=useState(null);
    // const [subscriber, setSubscriber] = useState(null)
    useEffect(()=>{
        let subscriber;
        const startWatching=async ()=>{
            try{
                let response= await requestForegroundPermissionsAsync();
                if(!response.granted){
                    setError('NOT GRANTED');
                    return;
                }
                else{
                    setError(null);
                    const subscriber=await watchPositionAsync({
                        accuracy:Accuracy.BestForNavigation,
                        timeInterval:1000,
                        distanceInterval:10,
                    },
                    callback
                    );
                }
            }
            catch(e){
                console.log(e);
            }
        }
        if(shouldTrack){
            startWatching();
        }
        else{
            if(subscriber){
                subscriber.remove();
            }
            subscriber=null; 
        }
        return ()=>{
            if(subscriber){
                subscriber.remove(); 
            }
        }
    },[shouldTrack,callback]);
    return [error];
  }