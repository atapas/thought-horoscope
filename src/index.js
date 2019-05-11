#!c:/progra~1/nodejs/node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const SunSign = require('./sunsign');
const horoscope = require('./horoscope');

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
        const sunSign = new SunSign().getSunSign(answers.NAME, answers.DOB);
        console.log(
            chalk.yellow(
                `Calculated Zodiac Sign of ${answers.NAME} is, [${sunSign}]`
            )
        );
        
        // Call API to get the Horoscope based on the sunSign
        horoscope.getHoroscope(sunSign, answers.DURATION);
    });
};


doTask();