const { InteractionType } = require('discord.js');
const { commands } = require('../../config');

const executeCommand = async (interaction) => {
  // Find the command that matches the interaction name
  const command = commands.find(
    (cmd) => cmd.data.name === interaction.commandName,
  );

  if (!command) {
    console.error(`No command found for ${interaction.commandName}`);
    return interaction.reply({
      content: 'Invalid command. Please try again.',
      ephemeral: true,
    });
  }

  try {
    // Execute the command's function
    await command.execute(interaction);
  } catch (error) {
    console.error('Error executing command:', error);
    await interaction.reply({
      content: 'There was an error executing that command. Please try again later.',
      ephemeral: true,
    });
  }
};

module.exports = { executeCommand };