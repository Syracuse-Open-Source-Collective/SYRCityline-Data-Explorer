console.clear();
const { loadCommands } = require("../../Handlers/commandLoader");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let status = [
      "Waiting for you to run some commands!",
      "Try /search or /random!",
      "Hope you enjoy the data you recieve from me!",
    ];
    try {
      setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
      }, 30000);

      loadCommands(client);
    } catch (error) {
      console.log("Error trying to make the client ready!");
    }
  },
};
