const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const logs = require("discord-logs");

const { handleLogs } = require("./Handlers/handleLogs");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

logs(client, {
  debug: true
});

const activities = [
  "❰ ★ WS:RP ★ ❱",
  "Készítő: palkodomi"
]
setInterval(()=> {
  const status =  activities[Math.floor(Math.random() * activities.length)];
  client.user.setPresence({activities: [ {name:`'${status}` }]});
},2000);

client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.token).then(() => {
  handleLogs(client);
  loadEvents(client);
  loadCommands(client);
});