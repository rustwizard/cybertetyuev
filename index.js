const http = require('http');
const requests = require('request-promise');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/gaziki/, async (msg, _) => {
    const chatId = msg.chat.id;

    try {
        const resp = await requests.get('https://www.powernext.com/data-feed/1467707/819/17', {
            json: true
        });

        const history = resp.values;
        const lastPrice = history[0].data[history[0].data.length - 1].y;
        
        bot.sendMessage(chatId, `Газики нынче по ${lastPrice} за ${resp.unit} согласно https://www.powernext.com/spot-market-data`);
    } catch (error) {
        console.log(error);
        bot.sendMessage(chatId, 'Не могу узнать, что там с газиками');
    }
});

const himarsikiOptions = [
    'Это определенно HIMARS',
    'На HIMARS указывает характерная маркировка и ромбовидные сегменты',
    'Не, стопудово HIMARS',
    'Скорее всего HIMARS',
    'Не похоже на HIMARS, на HIMARS указывает характерная маркировка и ромбовидные сегменты, а тут...'
];

bot.onText(/\/himarsiki/, async (msg, _) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, himarsikiOptions[Math.floor(Math.random() * himarsikiOptions.length)]);
});

bot.onText(/\/help/, async (msg, _) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 
        `Вечер в хату, с вами Кибер Тетюев, коллективный разум и эксперт по всем вопросам.
        
        /gaziki@cybertetyuev_bot покажет почем нынче газики
        /himarsiki@cybertetyuev_bot тщательно проанализирует ситуацию и ответит HIMARS это был или нет (не хуже любого военкора)
        `, {
        
    });
});

const uazikiOptions = [
    'Петух без УАЗа!',
    'Двигатель с западными свистелками и перделками на УАЗ последнего рестайла уже 300 тыщ стоит!',
    'Звучит даже хуже шумоизоляции от УАЗа',
    'Раньше хотел купить УАЗ Хантер. Я думал, нормальный пацан, хотел его в Монино свозить.',
    'Маркетологи УАЗа знают толк. УАЗ не гниет и не ржавеет!'
];

bot.onText(/\/uaziki/, async (msg, _) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, uazikiOptions[Math.floor(Math.random() * uazikiOptions.length)]);
});


http.createServer(function (_, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Всем привет, это КиберТетюев"!');
  res.end();
}).listen(8080);