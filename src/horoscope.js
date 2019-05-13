
const chalk = require("chalk");
const request = require('request');
const GenerateReport = require('./gereratereport');

exports.getHoroscope = (dataToProcess) => {

    let constURI = `http://horoscope-api.herokuapp.com//horoscope/${dataToProcess.duration.toLowerCase()}/${dataToProcess.sunsign}`;
    // console.log('constURI ', constURI);
    request(constURI, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let info = JSON.parse(body);
            dataToProcess['output'] = info;
            printHoroscope(dataToProcess);

            const report = new GenerateReport();
            if (dataToProcess.report.indexOf('Text') > -1) {
                report.saveText(dataToProcess);
            } 
            if(dataToProcess.report.indexOf('HTML') > -1) {
                report.saveHTML(dataToProcess);
            }
            

        } else {
            if (error) {
                console.log(chalk.red(`${response.statusCode}: Failed to get Horoscope at this time, Try Later!`));
            }
        }
    });
}

printHoroscope = (dataToProcess) => {
    console.log('\n\n');

    if (dataToProcess.duration === 'Today') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${dataToProcess.output.sunsign}] for the date, ${dataToProcess.output.date}: `
            )
        );
    } else if (dataToProcess.duration === 'Week') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${dataToProcess.output.sunsign}] for the duration, ${dataToProcess.output.week}: `
            )
        );

    } else if (dataToProcess.duration === 'Month') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${dataToProcess.output.sunsign}] for the Month, ${dataToProcess.output.month}: `
            )
        );
        
    }else if (dataToProcess.duration === 'Year') {
        console.log(
            chalk.white.underline.bold(
                `Horoscope of Zodiac Sign [${dataToProcess.output.sunsign}] for the Year, ${dataToProcess.output.year}: `
            )
        );
    }
    
    console.log(chalk.green(dataToProcess.output.horoscope));
    console.log('\n');
}


