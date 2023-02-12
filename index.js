const express = require('express');
const app = express();
const port = 3000;

const events = [
  { text: 'textOne', dateTime: '2020-07-10 15:00:00.000' },
  { text: 'textTwo', dateTime: '2020-07-11 16:00:00.000' },
  { text: 'textThree', dateTime: '2020-07-12 17:00:00.000' },
  { text: 'textFour', dateTime: '2020-07-13 18:00:00.000' },
  { text: 'textFive', dateTime: '2020-07-14 19:00:00.000' },
  { text: 'textSix', dateTime: '2020-07-15 20:00:00.000' },
  { text: 'textSeven', dateTime: '2020-07-16 21:00:00.000' },
  { text: 'textEight', dateTime: '2020-07-17 22:00:00.000' },
  { text: 'textNine', dateTime: '2020-07-18 23:00:00.000' },
  { text: 'textTen', dateTime: '2020-07-19 00:00:00.000' },
];

app.get('/schedule', (req, res) => {
  events.forEach((event) => {
    setTimeout(() => {
      console.log(event.text.split('').reverse().join(''));
    }, event.text.length * 1000);
  });
  res.send('Events have been scheduled');
});

app.listen(port, () => {
  console.log(`Scheduler app listening at http://localhost:${port}`);
});
