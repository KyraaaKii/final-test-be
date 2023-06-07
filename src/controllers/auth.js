const { users } = require("../../models");
const { siswas } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const body = req.body;
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(5).required(),
      fullname: joi.string().min(3).required(),
      birth_place: joi.string().min(3).required(),
      birth_date: joi.date().iso().required(),
      class_category: joi
        .string()
        .valid("Matematika", "IPA", "IPS", "Bahasa", "Bela Diri", "Tari")
        .required(),
      address: joi.string().min(3).required(),
      phone: joi.string().min(11).required(),
      parents_name: joi.string().min(3).required(),
      parents_contact: joi.string().min(11).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.render("errors/400", { error: error.details[0].message });
    }

    const emailExisted = await users.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExisted) {
      return res.render("errors/400", {
        error: "Email Already Existed!",
      });
    }

    const encrypt = await bcrypt.hash(body.password, 12);

    const newUser = await users.create({
      email: body.email,
      password: encrypt,
      role: "user",
    });

    const newSiswa = await siswas.create({
      email: body.email,
      fullname: body.fullname,
      birth_place: body.birth_place,
      birth_date: body.birth_date,
      class_category: body.class_category,
      address: body.address,
      phone: body.phone,
      parents_name: body.parents_name,
      parents_contact: body.parents_contact,
    });

    res.redirect("/"); // Back to Login Page
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(5).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.render("errors/400", {
        error: error.details[0].message,
      });
    }

    const userData = await users.findOne({
      where: {
        email: body.email,
      },
    });

    if (!userData) {
      return res.render("errors/400", {
        error: "Email or Password Incorrect!",
      });
    }

    const matched = await bcrypt.compare(body.password, userData.password);

    if (!matched) {
      return res.render("errors/400", {
        error: "Email or Password Incorrect!",
      });
    }

    const result = await users.findOne({
      where: {
        email: body.email,
      },
    });

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
        role: result.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    const role = result.dataValues.role;

    if (role === "admin") {
      res.cookie("accessToken", token);
      return res.redirect(`/siswas/all`);
    }

    const findClass = await siswas.findOne({
      where: {
        email: body.email,
      },
    });

    let category = findClass.dataValues.class_category.toLowerCase();
    if (category.includes(" ")) {
      category = category.replace(/\s/g, "_");
    }
    
    res.cookie("accessToken", token);
    res.redirect(`/siswas/${category}`);
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.redirect("/");
};
