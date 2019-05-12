
const fse = require('fs-extra');

class GenerateReport {
    saveText(data) {
        let textData = `Horocope of ${data.name} as of ${new Date()}:\n
        Result: ${data.output.horoscope}\n
        Sun Sign: ${data.output.sunsign}\n
        Duration: ${data.duration}\n\n
        Copyright Tapas Adhikary 2019`;

        let fileName = `reports/${data.name}.txt`;
        fse.outputFile(fileName, textData, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`Text Report ${fileName} has been created!`);
        });
    }

    saveHTML(data) {
        let textData = "<h1> Horocope of " + data.name +" as of " + new Date() + "</h1><br><br>"
                    + "<b>Result:</b> " + data.output.horoscope + "<br>"
                    + "<b>Sun Sign:</b> " + data.output.sunsign + "<br>"
                    + "<b>Duration:</b> " + data.duration + "<br><br>"
                    +"<i>Copyright Tapas Adhikary 2019</i>";
        
        let fileName = `reports/${data.name}.html`;
        fse.outputFile(fileName, textData, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`HTML Report ${fileName} has been created!`);
        });
    }
}

module.exports = GenerateReport;