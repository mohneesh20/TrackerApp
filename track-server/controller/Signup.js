const path=require('path');
const mongoose=require('mongoose');
const User=mongoose.model("User");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const SignUp=async (req,resp)=>{
    let salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt);
    // console.log(req.body);
    try{
        const user=new User({email:req.body.email,password:req.body.password});
        await user.save()
        // console.log(user._id);
        const token=jwt.sign({userId:user._id},`MY_SECRET_ID`);
        resp.json({"msg":"RECORD INSERTED",token}); 
    }
    catch(err){
        console.log(err.message);
        return resp.status(422).send(err.message);
    }
}
const SignIn=async (req,resp)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return resp.status(422).send({error:"Must provide email and password"});
    }
    const user=await User.findOne({email});
    // console.log(user);
    if(!user){
        return resp.status(404).send({error:"Account not found"});
    }
    else{
        let result=await bcrypt.compare(password,user.password);
        if(result){
            const token=jwt.sign({userId:user._id},"MY_SECRET_KEY");
            resp.send({token});
        }
        else{
            return resp.status(404).send({error:"Account not found"});
        }
    }

}
module.exports={SignUp,SignIn};