#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let playerFuel = 100;
let OpponentFuel = 100;

function rand() {
    return Math.floor(Math.random() * 2);
}

function playerAttack() {
    if (rand() == 0) {
        return 0;
    } else {
        return 25;
    }
}

function opponentAttack() {
    if (rand() == 0) {
        return 0;
    } else {
        return 25;
    }
}

async function game() {
    let nameAsking = await inquirer.prompt([{
        name: "name",
        type: "input",
        message: chalk.yellowBright.bold("Enter Your Name: ")
    }]);
    let playerName = nameAsking.name;

    let selectEnemy = await inquirer.prompt([{
        name: "enemy",
        type: "list",
        message: chalk.yellowBright.bold("Select Any One Of The Opponent..."),
        choices: ["Zombie", "Skeleton", "Alien"]
    }]);
    let enemyName = selectEnemy.enemy;

    console.log(chalk.blueBright.bold(`\n\t------${chalk.underline(playerName)} fuel is ${chalk.underline(playerFuel)} & ${chalk.underline(enemyName)} Fuel is ${chalk.underline(OpponentFuel)}------\t\n`));

    while (playerFuel >= 0 && OpponentFuel >= 0) {
        let selectAttack = await inquirer.prompt([{
            name: "attacking",
            type: "list",
            message: chalk.yellowBright.bold("Select Any One Of The Attack..."),
            choices: ["Attack", "Drink Lucky Potion", "Run For Life.."]
        }]);
        selectAttack = selectAttack.attacking;

        if (selectAttack == "Attack") {
            let playerDamage = playerAttack();
            let opponentDamage = opponentAttack();

            playerFuel -= opponentDamage;
            OpponentFuel -= playerDamage;

            console.log(chalk.greenBright.bold(`${playerName} attacks! ${enemyName} takes ${playerDamage} damage.`));
            console.log(chalk.redBright.bold(`${enemyName} attacks! ${playerName} takes ${opponentDamage} damage.\n`));

            console.log(chalk.greenBright.bold(`${playerName} Fuel is now ${playerFuel}`));
            console.log(chalk.redBright.bold(`${enemyName} Fuel is now ${OpponentFuel}\n`));
        } else if (selectAttack == "Drink Lucky Potion") {
            playerFuel = 100;
            console.log(chalk.greenBright.bold.underline(`\n${playerName} drinks a lucky potion! Fuel is now refilled to ${playerFuel}\n`));
            let opponentDamage = opponentAttack();
            playerFuel -= opponentDamage;
            console.log(chalk.redBright.bold(`${enemyName} attacks! ${playerName} takes ${opponentDamage} damage.`));
            console.log(chalk.greenBright.bold(`${playerName} Fuel is now ${playerFuel}\n`));
        } else {
            console.log(chalk.red.bold("\nYou Lost! Try Again..\n"));
            return;
        }

        if (playerFuel <= 0) {
            console.log(chalk.red.bold("\nYou Lost! Try Again..\n"));
            return;
        } else if (OpponentFuel <= 0) {
            console.log(chalk.green.bold("\n\tCongratulations! You Won!\t\n"));
            return;
        }
    }
}

game();