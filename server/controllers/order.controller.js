import Restaurant from '../mongodb/Models/Restaurant.js'
import Order from '../mongodb/Models/orders.js'
import User from "../mongodb/models/user.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";


const createOrder =async (req,res)=>{
    try {
    const {RestaurantsID,RestaurantName, date, onPlace,menu} = req.body
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await User.findOne({_id: req.body.userId}).session(session);
  

    if (!user) throw new Error("on est la User not found");

       

        const newOrder = await Order.create({
            RestaurantsID,
            RestaurantName,
            date,
            onPlace,
            creator: user._id,
            menu,
        });

        user.allOrders.push(newOrder._id);
        await user.save({ session });
        
        await session.commitTransaction();

       await res.status(200).json({  orderId: newOrder._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
    

};
const getOrdersByRestaurantId = async (req, res) => {
  try {
    const { restaurantIDs } = req.params;
    const orders = await Order.find({ RestaurantsID: restaurantIDs });

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




const getAllOrdersByUserId = async (req, res) => {
    const { _end, _order, _start, _sort } = req.query;
    const { userId } = req.params;
  
    const query = {
      userId: userId,
    };
  
    try {
      const count = await Order.countDocuments(query);
      const orders = await Order.find(query)
        .limit(_end)
        .skip(_start)
        .sort({ [_sort]: _order });
  
      res.header("x-total-count", count);
      res.header("Access-Control-Expose-Headers", "x-total-count");
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
  
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Order not found lo" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

export{
    getAllOrdersByUserId,
    createOrder,
    getOrderById,
    getOrdersByRestaurantId,
}

