import * as Location from 'expo-location';
const tenMetersWithDegress=0.0001;
const getLoacation=increment=>{
    return{
        timeStamp:100000,
        coords:{
            speed:0,
            heading:0,
            accuracy:5,
            altitudeAccuracy:5,
            altitude:5,
            longitude:74.9331176+increment*tenMetersWithDegress,
            latitude:30.2255613+increment*tenMetersWithDegress,
        }
    };
};
let counter=0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged',{
        watchId:Location._getCurrentWatchId(),
        location:getLoacation(counter),
    });
    getLoacation(counter);
    counter++;
}, 1000);