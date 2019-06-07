const express = require('express');
const messageRoute = express.Router();
let jwtDecode = require('jwt-decode');
const {Messages,Channels,Users,db} = require('../models');

messageRoute.get('/',async(req,res)=>{
  try{
    const allMessages = await Messages.findAll({include:[Channels]});
    res.json(allMessages);
  }catch(e){
    res.status(500).json({ msg: e.status });
  }
})
// messageRoute.get('/:id',async(req,res)=>{
//   try{
//     const id = req.params.id;
//     const message = await Messages.findByPk(id,{
//       include:[{all: true}]
//     });
//     res.json(message);
//   }catch(e){
//     res.status(404).json({ msg: e.status });
//   }
// })
messageRoute.post('/create',async(req,res)=>{
  try{
    let decoded = jwtDecode(req.headers.token);
    const userCreatedMessage = await Users.findOne({
      where:{
        email:decoded.email
      }
    });
    let createdMessage = await Messages.create(req.body);
    const existingChannel = await Channels.findOne({
      where:{
        id:req.headers.channel
      }
    })    
    await createdMessage.setUser(userCreatedMessage);     
    await createdMessage.setChannel(existingChannel);
    res.send('Message created'); 
  }catch(e){
    console.log("message", e.message);
    res.json({ message: e.message });
  }
})
messageRoute.delete('/delete/:id',async(req,res)=>{
  try{
    let decoded = jwtDecode(req.headers.token);
    const userCreatedMessage = await Users.findOne({
      where:{
        email:decoded.email
      }
    });
    if(userCreatedMessage){
      const id = req.params.id;
      const deletedMessage = await Messages.findByPk(id);
      await deletedMessage.destroy();
      res.send(`Message deleted`);
    } else{
      res.send('user is not autorized')
    }
  }catch(e){
    res.send(e.message)    
  }
})
messageRoute.put('/edit/:id',async(req,res)=>{
  try{
    let decoded = jwtDecode(req.headers.token);
    const userCreatedMessage = await Users.findOne({
      where:{
        email:decoded.email
      }
    });
    if(userCreatedMessage){
      const id = req.params.id;
      const editedMessage = await Messages.update(req.body,{
        where:{
          id:id
        }
      })
      res.send(`Message with id: ${id} edited`);
    }else{
      res.send('You are not authorized to edit Message')
    }
  }catch(e){
    res.status(404).json({ msg: e.status });   
  }
})
module.exports = messageRoute;
