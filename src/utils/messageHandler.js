const { welcomeMessage } = require('../../config');

const handleGuildMemberAdd = async (member) => {
  try {
    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.name === 'welcome',
    );

    if (welcomeChannel) {
      await welcomeChannel.send(`${welcomeMessage} ${member.user.username}!`);
    }
  } catch (error) {
    console.error('Error sending welcome message:', error);
  }
};

module.exports = {
  handleGuildMemberAdd,
};