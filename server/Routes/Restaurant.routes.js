import express from "express";

import {
    getAllRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantDetail,
   
} from '../controllers/restaurant.controller.js'
   

const router = express.Router();

router.route("/").get(getAllRestaurants);
router.route("/:id").get(getRestaurantDetail);
router.route("/").post(createRestaurant);
router.route("/:id").patch(updateRestaurant);
router.route("/:id").delete(deleteRestaurant);

export default router;