const mineflayer = require('mineflayer')
const AutoAuth = require('mineflayer-auto-auth')

const bot = mineflayer.createBot({
  host: process.env.SERVER_HOST,
  username: process.env.BOT_USERNAME,
  port: process.env.SERVER_PORT,
  version: process.env.BOT_VERSION,
  plugins: [AutoAuth],
  AutoAuth: 'password'
})

bot.on('login', () => {
  console.log("Connected :D")
})

bot.on('kicked', console.log)
bot.on('error', console.log)