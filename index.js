#!c:/progra~1/nodejs/node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

// init method
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync('Thought-CLI', {
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

const questionAns = () => {
    const questions = [
        {
            name: "FILE_NAME",
            type: "input",
            message: "What is the file name(without extension)?"
        },
        {
            name: "EXTENSION",
            type: "list",
            message: "What is the file extension?",
            choices: [".rb", ".js", ".php", ".css", ".java"],
            filter: function(val) {
                return val.split('.')[1];
            }

        }

    ];
    
    return inquirer.prompt(questions);
}

const execute = (fileName, extension) => {
    console.log(`Creating file with name ${fileName} and extenstion ${extension}....`);
    const filePath = `${process.cwd()}/${fileName}.${extension}`;
    shell.touch(filePath);
    return filePath;
}

const showSuccess = (filePath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! File Created at ${filePath}`)
    );
}

const doTask = async() => {
    // initialize the tool with some text
    init();

    // Ask Questions
    questionAns().then(answers =>  {
        // Do Operation
        const filePath = execute(answers.FILE_NAME, answers.EXTENSION);

        // Show Success Message
        showSuccess(filePath);
    });
};

doTask();