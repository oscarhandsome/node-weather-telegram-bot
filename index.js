const { Telegraf } = require("telegraf");
// const { message } = require("telegraf/filters");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.on("message", async (ctx) => {
  if (ctx.message.location) {
    const { latitude: lat, longitude: lon } = ctx.message.location;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}`
    );
    ctx.reply(
      `Your weather at ${response.data.name}: ${response.data.main.temp} C`
    );
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
