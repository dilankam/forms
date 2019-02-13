const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //to remove Bearer
    jwt.verify(token, "secret_this_should_be_longer");//if verify fail this will throw an error
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
