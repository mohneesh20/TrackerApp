const express=require('express');
const path=require('path');
const cors=require('cors');
const mongoose=require('mongoose');
require('./Schema/User');
require('./Schema/tracker');
const app=express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const AuthRouter=require("./Routers/AuthRoute");
const trackRouter=require("./Routers/trackRoute");
const connection_string=`mongodb+srv://Mohneesh20:Mohneesh20@clusterdata.ieiui.mongodb.net/tracker?retryWrites=true&w=majority`;
mongoose.connect(connection_string,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("CONNECTED");
}).catch((err)=>{
    console.log(err);
});
app.use(AuthRouter);
app.use(trackRouter);
app.listen(3000,()=>{
    console.log("SERVER STARTED");
});