#!c:/progra~1/nodejs/node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const request = require('request');

const sunsign = require('./sunsign');

// init method
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync('HOROSCOPE!', {
                font: 'Ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data);
            })
        )
    );
}

const questionAnswer = () => {
    const questions = [
        {
            name: "NAME",
            type: "input",
            message: "What is your Full Name?"
        },
        {
            name: "DOB",
            type: "input",
            message: "What is your Date of Birth in (dd/mm/yyyy) format?"
        },
        {
            name: "DURATION",
            type: "list",
            message: "For which duration?",
            choices: ["Today", "Week", "Month", "Year"]
        }
    ];
    return inquirer.prompt(questions);
}

const getHoroscope = (sunSign, duration) => {
    
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

const printHoroscope = (info, duration) => {
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

const doTask = async() => {
    // initialize the tool with some text
    init();

    // Ask Questions
    questionAnswer().then(answers => {
        // Calculate Zodiac Sun-Sign
        console.log(
            chalk.yellow(
                `Calculating Zodiac Sign of ${answers.NAME} with date of birth ${answers.DOB}....`
            )
        );
        const sunSign = sunsign.getSunSign(answers.NAME, answers.DOB);
        console.log(
            chalk.yellow(
                `Calculated Zodiac Sign of ${answers.NAME} is, [${sunSign}]`
            )
        );
        
        // Call API to get the Horoscope based on the sunSign
        getHoroscope(sunSign, answers.DURATION);
    });
};


doTask();