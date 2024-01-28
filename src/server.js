const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.get('api/status', (req, res) => {
    res.send('Hello from Node.js!');
});
app.get('/api/getData', (req, res) => {
  return("SUCCESSS")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});