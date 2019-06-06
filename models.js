const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

/* *** DEFINE DATABASE *** */
const db = new Sequelize({
  database: "discourse_db",
  dialect: "postgres",
  operatorsAliases: false,
  define:{
    underscored:true,
    returning: true
  }
})

/* *** DEFINE MODELS *** */
const Users = db.define('user',{
  email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true,
    validate:{
      isEmail:{
        msg: "Name must be valid email address"
      }     
    }
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      len: [5,10]
    }
  }
})

const Channels = db.define('channels',{
  name:{
    type: Sequelize.STRING,
    allowNull:false
  },
  description:{
    type: Sequelize.STRING
  }
})

const Messages = db.define('messages',{
  text:{
    type: Sequelize.STRING,
    allowNull:false
  }
})

/* ************************************************* */
/* *** DEFINE RELATIONSHIP *** */
/* ** Users => Messages (one to many) ** */
Users.hasMany(Messages,{onDelete: 'cascade'});
Messages.belongsTo(Users);
/* ************************************************* */
/* ** Users => Channels (many to many) ** */
Users.belongsToMany(Channels,{through:"users_channels_xref"});
Channels.belongsToMany(Users,{through:"users_channels_xref"});
/* ************************************************* */
/* ** Messages => Channels (one to many) ** */
Channels.hasMany(Messages,{onDelete: 'cascade'});
Messages.belongsTo(Channels);
/* ************************************************* */
/* ** Encrypting password of user before creating** */
Users.beforeCreate(async(user, options) => {
  const hashPassword = await bcrypt.hash(user.password,12);
  user.password = hashPassword;
});
Users.beforeBulkCreate(async(users, options) => {
  for(const user of users){
    const hashPassword = await bcrypt.hash(user.password,12);
    user.password = hashPassword;
  }
});
/* ************************************************* */
/* **EXPORT MODELS & DATABASE** */
module.exports = {
  db,
  Users,
  Channels,
  Messages,
}