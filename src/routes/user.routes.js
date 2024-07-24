import { Router } from "express";
import { registerUser, registerTest } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()
console.log('router')

router.route("/register").post(upload.fields([{ name: "avatar", maxCount: 1 }, { name: "cover", maxCount: 3 }]), registerUser)
router.route("/").post(registerTest)

//
export default router