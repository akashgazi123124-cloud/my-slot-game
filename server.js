const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));
let balance = 1000;
app.get('/api/balance', (req, res) => {
  res.json({ balance });
});
app.post('/api/spin', (req, res) => {
  const symbols = ['🍒', '🍋', '🔔', '⭐', '7️⃣'];
  const reel1 = symbols[Math.floor(Math.random()*symbols.length)];
  const reel2 = symbols[Math.floor(Math.random()*symbols.length)];
  const reel3 = symbols[Math.floor(Math.random()*symbols.length)];
  let win = 0;
  if (reel1 === reel2 && reel2 === reel3) win = 100;
  else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) win = 20;
  balance = balance - 10 + win;
  res.json({ reels: [reel1, reel2, reel3], win, balance });
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.listen(PORT, () => console.log('Server running on port '+PORT));
