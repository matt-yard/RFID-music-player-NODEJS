const app = require("./app");
const { db } = require("./db");
const PORT = process.env.PORT || 8080;

const init = async () => {
  try {
    db.sync();
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

init();
