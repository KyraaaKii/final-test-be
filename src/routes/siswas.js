const express = require("express");
const router = express.Router();
const controller = require("../controllers/siswas");
const { authToken } = require("../middleware/authToken");
const { authRole } = require("../middleware/authRole");
const { authClass } = require("../middleware/authClass");

router.get("/admin/:category", authToken, authClass, authRole, controller.getAll);
router.get("/user/ips", authToken, controller.getAllIps);
router.get("/user/ipa", authToken, controller.getAllIpa);
router.get("/user/matematika", authToken, controller.getAllMtk);
router.get("/user/bahasa", authToken, controller.getAllBhs);
router.get("/user/bela_diri", authToken, controller.getAllBdr);
router.get("/user/tari", authToken, controller.getAllTri);
router.get("/:id", authToken, controller.getOne);
router.post("/add", authToken, controller.addData);
router.get("/delete/:id", authToken, controller.deleteData);
router.get("/del/admin/:id", authToken, authRole, controller.deleteDataAdmin);
router.post("/update/:id", authToken, controller.updateData);
router.get("/get/update/:id", authToken, authRole, controller.getDataUpdate);
router.post("/upd/admin/:id", authToken, authRole, controller.updateSiswaAdmin);

module.exports = router;
