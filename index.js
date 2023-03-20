import inquirer from 'inquirer';
import chalk from 'chalk'

// Prompt the user for the number of players
inquirer.prompt([
  {
    type: 'number',
    name: 'numPlayers',
    message: 'How many players are participating?',
    validate: value => {
      if (value <= 0) {
        return 'Please enter a positive number';
      }
      return true;
    }
  }
]).then(({ numPlayers }) => {
  // Generate the fixture
  const rounds = [];
  const halfNumPlayers = Math.floor(numPlayers / 2);
  for (let round = 0; round < numPlayers - 1; round++) {
    const matches = [];
    for (let i = 0; i < halfNumPlayers; i++) {
      const home = (round + i) % (numPlayers - 1);
      const away = (numPlayers - 1 - i + round) % (numPlayers - 1);
      matches.push(`${home + 1} vs ${away + 1}`);
    }
    rounds.push(matches);
  }

  // Print the fixture
  console.log(chalk.green('Round Robin Tournament Fixture'));
  rounds.forEach((matches, index) => {
    console.log(chalk.blue(`Round ${index + 1}:`));
    matches.forEach(match => {
      console.log(match);
    });
  });
});
