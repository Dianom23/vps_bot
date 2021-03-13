const { match } = require('assert');
const { request } = require('http');
const requestt = require('request');
const TelegramBot = require('node-telegram-bot-api');
const os = require('os');
const bot = new TelegramBot('1571135022:AAGkHNrviS8dnVqgixN_o3NvsrMXFM-qm08', { polling: true });

// bot.on('message', msg => {
//         bot.sendMessage(msg.chat.id, 'Platform: ' + os.version() + '  Привет ' + msg.from.first_name);
//     })
// "${msg.from.first_name}"')
// , os.platform()
bot.onText(/\/curse/, (msg, match) => {

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Какая валюта вас интересует?', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'EUR',
                    callback_data: 'EUR'
                }, {
                    text: 'USD',
                    callback_data: 'USD'
                }, {
                    text: 'RUB',
                    callback_data: 'RUR'
                }, {
                    text: 'BTC',
                    callback_data: 'BTC'
                }]
            ]
        }

    })

});

bot.on('callback_query', query => {
    const id = query.message.chat.id;
    requestt('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function(error, response, body) {
        const data = JSON.parse(body);

        const result = data.filter(item => item.ccy === query.data)[0];
        let md = `
            *${result.ccy} => ${result.base_ccy}*
            Buy: _${result.buy}_
            Sale: _${result.sale}_
        `;
        bot.sendMessage(id, md, { parse_mode: 'Markdown' });
    })
})