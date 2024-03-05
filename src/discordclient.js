const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages} =
  GatewayIntentBits;
const { User, Message, GuildMember, Channel } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages],
  partials: [User, Message, GuildMember, Channel],
});

module.exports = client;
