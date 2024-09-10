const { welcomeMessage } = require('../../config');

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute(member) {
    try {
      const welcomeChannel = member.guild.channels.cache.find(
        channel => channel.name === 'welcome',
      );

      if (welcomeChannel) {
        await welcomeChannel.send(
          `${welcomeMessage} ${member.user.username}!`,
        );
      }
    } catch (error) {
      console.error('Error sending welcome message:', error);
    }
  },
};