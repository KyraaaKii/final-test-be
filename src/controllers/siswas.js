const { siswas } = require("../../models");
const { users } = require("../../models");
const bcrypt = require('bcrypt');
const joi = require("joi");

exports.getAll = async (req, res) => {
  try {
    const category = req.params.category;
    let data = {}

    if (category == "all") {
      data = await siswas.findAll();
    } else if (category == "matematika") {
      data = await siswas.findAll({
        where: {
          class_category: "Matematika",
        },
      });
    } else if (category == "ipa") {
      data = await siswas.findAll({
        where: {
          class_category: "IPA",
        },
      });
    } else if (category == "ips") {
      data = await siswas.findAll({
        where: {
          class_category: "IPS",
        },
      });
    } else if (category == "bahasa") {
      data = await siswas.findAll({
        where: {
          class_category: "Bahasa",
        },
      });
    } else if (category == "bela_diri") {
      data = await siswas.findAll({
        where: {
          class_category: "Bela Diri",
        },
      });
    } else if (category == "tari") {
      data = await siswas.findAll({
        where: {
          class_category: "Tari",
        },
      });
    }
    
    res.render("pages/admin", { data: data }); 
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getAllMtk = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await siswas.findAll({
      where: {
        class_category: "Matematika",
      },
    });

    const update = await siswas.findOne({
      where: {
        id: user,
      },
    });

    res.render("pages/mtk", { data: data, id: user, update: update });
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getAllIps = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await siswas.findAll({
      where: {
        class_category: "IPS",
      },
    });

    const update = await siswas.findOne({
      where: {
        id: user,
      },
    });

    res.render("pages/ips", { data: data, id: user, update: update });
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getAllIpa = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await siswas.findAll({
      where: {
        class_category: "IPA",
      },
    });

    const update = await siswas.findOne({
      where: {
        id: user,
      },
    });

    res.render("pages/ipa", { data: data, id: user, update: update });
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getAllBhs = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await siswas.findAll({
      where: {
        class_category: "Bahasa",
      },
    });

    const update = await siswas.findOne({
      where: {
        id: user,
      },
    });

    res.render("pages/bhs", { data: data, id: user, update: update });
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getAllBdr = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await siswas.findAll({
      where: {
        class_category: "Bela Diri",
      },
    });

    const update = await siswas.findOne({
      where: {
        id: user,
      },
    });

    res.render("pages/bdr", { data: data, id: user, update: update });
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getAllTri = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await siswas.findAll({
      where: {
        class_category: "Tari",
      },
    });

    const update = await siswas.findOne({
      where: {
        id: user,
      },
    });

    res.render("pages/tri", { data: data, id: user, update: update });
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;

    const datas = await siswas.findAll();

    const data = await siswas.findOne({
      where: {
        id,
      },
    });

    res.render("pages/admin", { one: data, data: datas });
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.addData = async (req, res) => {
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

    res.redirect("/siswas/all");
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;

    const findData = await siswas.findOne({
      where: {
        id,
      },
    });

    const deleteData = await siswas.destroy({
      where: {
        id,
      },
    });

    const deleteUser = await users.destroy({
      where: {
        email: findData.email,
      },
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.deleteDataAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const findData = await siswas.findOne({
      where: {
        id,
      },
    });

    const deleteData = await siswas.destroy({
      where: {
        id,
      },
    });

    const deleteUser = await users.destroy({
      where: {
        email: findData.email,
      },
    });

    res.redirect("/siswas/all");
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.updateData = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const body = req.body;
    const schema = joi.object({
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
      console.error(error.details[0].message);
      return res.render("errors/400", { error: error.details[0].message });
    }

    const update = await siswas.update(body, {
      where: {
        id,
      },
    });

    const findData = await siswas.findOne({
      where: {
        email: user.email,
      },
    });

    let category = findData.dataValues.class_category.toLowerCase();
    if (category.includes(" ")) {
      category = category.replace(/\s/g, "_");
    }

    res.redirect(`/siswas/${category}`);
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.updateSiswaAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const schema = joi.object({
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
      console.error(error.details[0].message);
      return res.render("errors/400", { error: error.details[0].message });
    }

    const update = await siswas.update(body, {
      where: {
        id,
      },
    });

    res.redirect(`/siswas/all`);
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
};

exports.getDataUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await siswas.findOne({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: 200,
      data: data
    })
  } catch (err) {
    console.error(err);
    res.render("errors/500", {});
  }
}