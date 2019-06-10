const express = require('express');
const {Channels,Messages,Users} = require('../models')
const channelRoute = express.Router();

channelRoute.get('/',async(req,res)=>{
  try{
    const allChannels = await Channels.findAll({
      include:[{model: Messages, include: [Users]}]
    });
    res.json(allChannels);
  }catch(e){
    res.status(404).json({ msg: e.status })
  } 
})

channelRoute.post('/create',async(req,res)=>{
  try{
    let createdChannel = await Channels.create(req.body);
    res.send('Channel created'); 
  }catch(e){
    console.log("message", e.message);
    res.json({ message: e.message });
  }
})

channelRoute.delete('/delete/:id',async(req,res)=>{
  try{
    let channel = await Channels.findByPk(req.params.id);
    await channel.destroy();
    res.send('Channel destroyed'); 
  }catch(e){
    console.log("message", e.message);
    res.json({ message: e.message });
  }
})

channelRoute.patch('/edit/:id',async(req,res)=>{
  try{
    const editedChannel = await Channels.update(req.body,{
      where:{
        id:req.params.id
      }
    })
    res.send(`Channel with id: ${id} edited`);
  }catch(e){
    console.log("message", e.message);
    res.json({ message: e.message });
  }
})

module.exports = channelRoute;