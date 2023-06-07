const express = require("express");
const router = express.Router();
const controller = require("../controllers/siswas");
const { authToken } = require("../middleware/authToken");

router.get("/", authToken, controller.getAll);
router.get("/ips", authToken, controller.getAllIps);
router.get("/ipa", authToken, controller.getAllIpa);
router.get("/matematika", authToken, controller.getAllMtk);
router.get("/bahasa", authToken, controller.getAllBhs);
router.get("/bela_diri", authToken, controller.getAllBdr);
router.get("/tari", authToken, controller.getAllTri);
router.get("/:id", authToken, controller.getOne);
router.post("/add", authToken, controller.addData);
router.get("/delete/:id", authToken, controller.deleteData);
router.get("/del/admin/:id", authToken, controller.deleteDataAdmin);
router.post("/update/:id", authToken, controller.updateData);
router.get("/get/update/:id", authToken, controller.getDataUpdate);
router.post("/upd/admin/:id", authToken, controller.updateSiswaAdmin);

module.exports = router;