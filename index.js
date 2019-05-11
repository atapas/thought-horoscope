#!c:/progra~1/nodejs/node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const request = require('request');

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

const getSunSign = (name, dob) => {
    console.log(
        chalk.yellow(
            `Calculating Zodiac Sign of ${name} with date of birth ${dob}....`
        )
    );

    let day = parseInt(dob.split('/')[0], 10);
    let month = parseInt(dob.split('/')[1], 10);
    // console.log(`day and month: ${day} and ${month}`);

    let astroSign; 
          
    // checks month and date within the  
    // valid range of a specified zodiac 
    if (month === 12){     
        if (day < 22) {
            astroSign = "Sagittarius";
        }
        else {
            astroSign ="capricorn";
        }
    } else if (month === 1){ 
        if (day < 20) {
            astroSign = "Capricorn";
        } else {
            astroSign = "aquarius";
        }
    } else if (month === 2){ 
        if (day < 19) {
            astroSign = "Aquarius"; 
        } else {
            astroSign = "pisces";
        } 
    } else if(month === 3){ 
        if (day < 21) {
            astroSign = "Pisces";
        } else {
            astroSign = "aries";
        }
    } else if (month === 4){ 
        if (day < 20) 
            astroSign = "Aries"; 
        else
            astroSign = "taurus"; 
    } else if (month === 5){ 
        if (day < 21) 
            astroSign = "Taurus"; 
        else
            astroSign = "gemini"; 
    } else if( month === 6){ 
        if (day < 21) 
            astroSign = "Gemini"; 
        else
            astroSign = "cancer"; 
    } else if (month === 7){ 
        if (day < 23) 
            astroSign = "Cancer"; 
        else
            astroSign = "leo"; 
    } else if( month === 8){ 
        if (day < 23)  
            astroSign = "Leo"; 
        else
            astroSign = "virgo"; 
    } else if (month === 9){ 
        if (day < 23) 
            astroSign = "Virgo"; 
        else
            astroSign = "libra"; 
    } else if (month === 10){ 
        if (day < 23) 
            astroSign = "Libra"; 
        else
            astroSign = "scorpio"; 
    } else if (month === 11){ 
        if (day < 22) 
            astroSign = "scorpio"; 
        else
            astroSign = "sagittarius"; 
    } 
    return astroSign;
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
        const sunSign = getSunSign(answers.NAME, answers.DOB);
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