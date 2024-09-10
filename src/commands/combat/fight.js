const { SlashCommandBuilder } = require('discord.js');
const { startCombat, getOpponent } = require('../../services/combatService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fight')
    .setDescription('Challenge a random opponent to a duel')
    .addStringOption(option =>
      option
        .setName('opponent')
        .setDescription('The opponent you want to challenge (optional)')
        .setRequired(false),
    ),
  async execute(interaction) {
    const opponentName = interaction.options.getString('opponent');

    try {
      const opponent = await getOpponent(interaction.user.id, opponentName);

      if (!opponent) {
        return interaction.reply('Could not find a valid opponent.');
      }

      const combatResult = await startCombat(interaction.user.id, opponent.id);

      if (combatResult.success) {
        return interaction.reply(
          `You have challenged ${opponent.name} to a duel! ${combatResult.message}`,
        );
      } else {
        return interaction.reply(`Oops! There was an error starting the combat: ${combatResult.message}`);
      }
    } catch (error) {
      console.error('Error starting combat:', error);
      return interaction.reply('There was an error starting the combat. Please try again later.');
    }
  },
};