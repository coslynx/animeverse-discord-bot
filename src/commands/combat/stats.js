const { SlashCommandBuilder } = require('discord.js');
const { getUserCombatStats } = require('../../services/combatService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('View your combat statistics'),
  async execute(interaction) {
    const userId = interaction.user.id;

    try {
      const stats = await getUserCombatStats(userId);
      if (!stats) {
        return interaction.reply('You have not participated in any combat yet.');
      }

      const statsString = [
        `Wins: ${stats.wins}`,
        `Losses: ${stats.losses}`,
        `Damage Dealt: ${stats.damageDealt}`,
        `Damage Received: ${stats.damageReceived}`,
      ].join('\n');

      return interaction.reply(`Your combat statistics:\n${statsString}`);
    } catch (error) {
      console.error('Error fetching combat stats:', error);
      return interaction.reply('There was an error fetching your combat stats. Please try again later.');
    }
  },
};