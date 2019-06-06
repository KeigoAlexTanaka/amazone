const { Users, Channels, Messages } = require("./models");
const { messages, channels, users } = require("./data");
const createModels = async () => {
  try {
    Users.destroy({ where: {} });
    Channels.destroy({ where: {} });
    const initialUsers = await Users.bulkCreate(users, { returning: true });
    const initialChannels = await Channels.bulkCreate(channels, {returning: true});
    const initialMessages = await Messages.bulkCreate(messages, {returning: true});
    for (i = 0; i < initialMessages.length; i++) {
      await initialMessages[i].setUser(initialUsers[0]);
      await initialMessages[i].setChannel(initialChannels[2]);
    }
    for (i = 0; i < initialUsers.length; i++) {
      await initialUsers[i].addChannels(initialChannels[2]);
    }
  } catch (e) {
    console.log(e.message);
  } finally {
    await process.exit();
  }
};

createModels();