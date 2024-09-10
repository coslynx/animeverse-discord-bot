const { Client, IntentsBitField } = require('discord.js');
const { token, welcomeMessage, commands } = require('../../config');
const { connectToDatabase } = require('../../utils/databaseService');
const { registerCommands } = require('../../utils/commandHandler');
const { handleGuildMemberAdd } = require('../../utils/messageHandler');

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    await connectToDatabase();
    console.log('Connected to the database!');

    await registerCommands(client, commands);
    console.log('Commands registered!');

    client.on('guildMemberAdd', handleGuildMemberAdd);
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});

client.login(token);