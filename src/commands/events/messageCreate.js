const { welcomeMessage } = require('../../config');

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    // Check for specific commands or keywords in the message content
    // Implement logic based on the message content
    // For example:
    // if (message.content.startsWith('!anime')) {
    //   // Handle anime-related commands
    // } else if (message.content.includes('kawaii')) {
    //   // Respond with a cute emoji or message
    // }

    // Consider using message events to trigger actions based on the message content or context.
    // Example:
    // if (message.content.includes('help')) {
    //   // Send a help message or direct the user to a help channel
    // }

    // You can also use message.reply() to respond to specific messages.
    // Example:
    // if (message.content.includes('hello')) {
    //   message.reply('Hello there!');
    // }
  },
};