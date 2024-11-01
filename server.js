const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
