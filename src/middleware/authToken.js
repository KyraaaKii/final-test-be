const jwt = require("jsonwebtoken");
const { users } = require("../../models");
const { siswas } = require("../../models");

exports.authToken = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const token = cookie && cookie.accessToken;

    if (!cookie || Object.keys(cookie).length == 0 || cookie == null) {
      return res.render("errors/401", {
        error: "Authentication required. Please log in.",
      });
    }

    const userVerifyId = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          return res.render("errors/401", {
            error: err.message,
          });
        }
        return user.id;
      }
    );

    const userVerified = await users.findOne({
      where: {
        id: userVerifyId,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    req.user = userVerified.dataValues;
    next();
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};
