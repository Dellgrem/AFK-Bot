const mineflayer = require("mineflayer");
const AutoAuth = require("mineflayer-auto-auth");
const antiafk = require("mineflayer-antiafk");
const keepAlive = require("./server");
const Monitor = require("ping-monitor");

keepAlive();
const monitor = new Monitor({
  website: "",
  title: "Bot Keep-Alive",
  interval: 2,
});

monitor.on("up", (res) => console.log(`${res.website} its on.`));
monitor.on("down", (res) =>
  console.log(`${res.website} it has died - ${res.statusMessage}`)
);
monitor.on("stop", (website) => console.log(`${website} has stopped.`));
monitor.on("error", (error) => console.log(error));

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.SERVER_HOST,
    username: process.env.BOT_USERNAME,
    port: process.env.SERVER_PORT,
    version: process.env.BOT_VERSION,
    plugins: [AutoAuth],
    AutoAuth: process.env.BOT_PASSWORD,
  });

  bot.loadPlugin(antiafk);

  bot.on("spawn", () => {
    bot.autoEat.options = {
      priority: "saturation",
      startAt: 16,
      bannedFood: ["golden_apple", "enchanted_golden_apple", "rotten_flesh"],
    };
    bot.afk.setOptions({ fishing: false });
    bot.afk.start();
  });

  bot.on("login", () => {
    console.log("Connected :D");
  });

  bot.on("kicked", console.log);
  bot.on("error", console.log);
  bot.on("end", createBot);
}

createBot();
