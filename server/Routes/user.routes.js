import express from "express";

import {
    createUser,
    getAllUsers,
    getUserInfoById,
    getRestaurantInfoByUserID,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/").post(createUser);
router.route("/:id").get(getUserInfoById);
router.route("/:id").get(getRestaurantInfoByUserID)

export default router;