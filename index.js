const express = require('express');
const app = express();
 

app.use(express.json());

app.post('/sum', (req, res) => {
  const { numbers } = req.body || {};

  if (!Array.isArray(numbers)) {
    return res.status(400).json({ error: '"numbers" must be an array' });
  }

  // Check that every item is a finite number
  const invalidItem = numbers.find(n => typeof n !== 'number' || !Number.isFinite(n));
  if (invalidItem !== undefined) {
    return res.status(400).json({ 
      error: `"numbers" must contain only valid numbers. Found invalid: ${invalidItem}` 
    });
  }

  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return res.json({ sum });
});

// catch json parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON payload',
      details: err.message
    });
  }
  
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}