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

// channelRoute.get('/:id',async(req,res)=>{
//   try{
//     const id = req.params.id;
//     const particularChannel = await Channels.findByPk(id,{
//       include:[Messages]
//     });
//     res.json(particularChannel);
//   }catch(e){
//     response.status(404).json({ msg: e.status })
//   }
// })

module.exports = channelRoute;