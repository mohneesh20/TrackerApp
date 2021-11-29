const express=require('express');
const mongoose=require('mongoose');
const Track=mongoose.model("Track");
const requireAuth=require('../middlewares/requireAuth');
const Router=express.Router();
Router.use(requireAuth);
Router.get('/tracks',async (req,resp)=>{
    const tracks=await Track.find({userId:req.user._id});
    console.log(tracks);
    resp.send(tracks);
})
Router.post('/tracks',(req,resp)=>{
    const {name,locations}=req.body;
    if(!name || !locations){
       return resp.status(422).send({error:"You must provide a name and locations"}); 
    }
    const track=new Track({name,locations,userId:req.user._id});
    try{
        track.save();
        resp.send(track);
    }
    catch(err){
        return resp.send(422).send({error:err.message});
    }
});
module.exports=Router;