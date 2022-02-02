const inquirer = require('inquirer');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const fs = require('fs');

const employee = [];

function menuPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            choices: ['Engineer', 'Intern', 'Finish Building']
        }
    ]).then((data) => {
        switch (data.role) {
            case 'Engineer':
                createEngineer();
                break;
            case 'Intern':
                createIntern();
                break;
            case 'Finish Building':
                console.log(employee);
                generateTeam(employee);
                break;
            
        }
    })
};

function createManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Enter the Manager name`,  
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email?',
        },
        {
            type:'input',
            name:'officeNumber',
            message:'What is the office number?',
        }
    ]).then((data) => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber)
        employee.push(manager);
        console.log(manager);
        menuPrompt();
    })
};

function createEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Enter the Engineer name`,  
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email?',
        },
        {
            type:'input',
            name:'github',
            message:'What is the Github user?',
        }
    ]).then((data) => {
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        employee.push(engineer);
        console.log(engineer);
        menuPrompt();
    })
};

function createIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Enter the Intern name`,  
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email?',
        },
        {
            type:'input',
            name:'school',
            message:'What school?',
        }
    ]).then((data) => {
        const intern = new Intern(data.name, data.id, data.email, data.school);
        employee.push(intern);
        console.log(intern);
        menuPrompt();
    })
};

createManager();

const generateTeam = team => {

    // create the manager html
    const generateManager = manager => {
        return `
        <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${manager.getName()}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${manager.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
            </ul>
        </div>
    </div>
        `;
    };

    // create the html for engineers
    const generateEngineer = engineer => {
        return `
        <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${engineer.getName()}</h2>
        <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${engineer.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
        </ul>
    </div>
</div>
        `;
    };

    // create the html for interns
    const generateIntern = intern => {
        return `
        <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${intern.getName()}</h2>
        <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${intern.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
            <li class="list-group-item">School: ${intern.getSchool()}</li>
        </ul>
    </div>
</div>
        `;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => generateManager(manager))
    );
    html.push(team
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => generateEngineer(engineer))
        .join("")
    );
    html.push(team
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => generateIntern(intern))
        .join("")
    );
    console.log('complete');
    const donezo = html.join("");
    console.log(donezo);
    generateFile(donezo);
}

// export function to generate entire page

const generateFile = donezo => { fs.appendFile('index.html', `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${donezo}
            </div>
        </div>
    </div>
</body>
</html>
    `, (err) => 
    err ? console.error(err) : console.log('donzo'));
}