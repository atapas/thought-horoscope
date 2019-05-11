#!c:/progra~1/nodejs/node

const chalk = require("chalk");
const request = require('request');

exports.getHoroscope = (sunSign, duration) => {

    let constURI = `http://horoscope-api.herokuapp.com//horoscope/${duration.toLowerCase()}/${sunSign}`;
    request(constURI, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let info = JSON.parse(body);
            printHoroscope(info, duration);
        } else {
            if (error) {
                console.log(chalk.red(`${response.statusCode}: Failed to get Horoscope at this time, Try Later!`));
            }
        }
    });
}

printHoroscope = (info, duration) => {
    console.log('\n\n');

    if (duration === 'Today') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${info.sunsign}] for the date, ${info.date}: `
            )
        );
    } else if (duration === 'Week') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${info.sunsign}] for the duration, ${info.week}: `
            )
        );

    } else if (duration === 'Month') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${info.sunsign}] for the Month, ${info.month}: `
            )
        );
        
    }else if (duration === 'Year') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${info.sunsign}] for the Year, ${info.year}: `
            )
        );
    }
    
    console.log(chalk.green(info.horoscope));
    console.log('\n');
}


