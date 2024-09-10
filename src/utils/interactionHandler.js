const { InteractionType } = require('discord.js');
const { executeCommand } = require('./commandHandler');

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction) {
    // Ignore interactions that are not slash commands
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    try {
      await executeCommand(interaction);
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.reply({ content: 'There was an error executing that command. Please try again later.', ephemeral: true });
    }
  },
};