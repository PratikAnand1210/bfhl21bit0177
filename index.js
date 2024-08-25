const express = require('express');
const cors = require('cors'); // Import the cors module

const app = express();


app.use(cors());

app.use(express.json());

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input" });
  }

  const user_id = "PratikAnand";
  const email = "pratikanand1210@gmail.com";
  const roll_number = "21BIT0177";

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highest_lowercase = alphabets
    .filter(item => item === item.toLowerCase())
    .sort()
    .pop();

  const response = {
    is_success: true,
    user_id: user_id,
    email: email,
    roll_number: roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highest_lowercase ? [highest_lowercase] : []
  };

  return res.status(200).json(response);
});

app.get('/bfhl', (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
