import express from "express";

import {
    createOrder,
    getAllOrdersByUserId,
    getOrderById,
    getOrdersByRestaurantId,
    
} from "../controllers/order.controller.js";

const router = express.Router();


router.route("/").post(createOrder);
router.route("/:id").get(getOrderById);
router.route("/").get(getAllOrdersByUserId);
router.route("/restaurant/:restaurantIDs").get(getOrdersByRestaurantId);




export default router;