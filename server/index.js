const app = require("./app");

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
