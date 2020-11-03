const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "What is you GitHub user name?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },
    {
      type: "input",
      name: "project",
      message: "What is your project name?"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of your last project?"
    },
    {
      type: "input",
      name: "licence",
      message: "What kind of Licence should your project have?"
    },
    {
      type: "input",
      name: "dependencies",
      message: "What command should be run to instal dependencies?"
    },
    {
      type: "input",
      name: "tests",
      message: "What command should be run to run tests?"
    },
    {
      type: "input",
      name: "using",
      message: "What does the user need to know about using the repo?"
    },
    {
      type: "input",
      name: "contributing",
      message: "What does the user need to know about contributing to the repo?"
    }
  ]);
}

function generateHTML(answers) {
  return `
  # GitHub User Name:
  * ${answers.github}
  
  ## Email Address:
  * ${answers.email}
  
  ## Project Name:
  * ${answers.project}
  
  ## Description of the project:
  * ${answers.description}
  
  ## Project Licence:
  * ${answers.licence}
  
  ## Command to run the instal:
  * ${answers.instal}
  
  ## Command to run tests:
  * ${answers.tests}
  
  ## What you should know about using the repo:
  * ${answers.using}
  
  ## What you should know about contributing to the repo:
  * ${answers.contributing}`
;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const README = generateHTML(answers);

    await writeFileAsync("README.md", README);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();
