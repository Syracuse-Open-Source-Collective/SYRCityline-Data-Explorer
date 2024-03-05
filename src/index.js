require("dotenv").config();

const { Collection } = require("discord.js");
const client = require("./discordclient");

client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.cooldowns = new Collection();

const { loadEvents } = require("../handlers/eventLoader");
loadEvents(client);

require("../jobs/updateCSVcron");

client.login(process.env.token);
