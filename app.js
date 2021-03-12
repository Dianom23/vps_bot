const TelegramBot = require('node-telegram-bot-api');
const os = require('os');
const bot = new TelegramBot('1571135022:AAGkHNrviS8dnVqgixN_o3NvsrMXFM-qm08', { polling: true });

bot.on('message', msg => {
        bot.sendMessage(msg.chat.id, 'Platform: ' + os.version() + '  Привет ' + msg.from.first_name);
    })
    // "${msg.from.first_name}"')
    // , os.platform()