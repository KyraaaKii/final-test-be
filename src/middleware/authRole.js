exports.authRole = (req, res, next) => {
  const roleAllowed = ["admin"];
  let allowedBool = false;

  roleAllowed.map((item) => {
    if (req.user.role == item) {
      allowedBool = true;
    }
  });

  if (allowedBool) {
    return next();
  } else {
    return res.render("errors/403", {
      error: "Only Admin Can Access This Page!",
    });
  }
};
