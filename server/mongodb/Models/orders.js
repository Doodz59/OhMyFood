
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    
    RestaurantsID : { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants", required:true,},
    RestaurantName : {type: String, required: true,},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    menu: [
      {
       
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },

      name:{
        type: String,
        required: true,
      },
      id:{
        type: String,
        required: true,
      }
      }
    ],
    date : {type: Date, required: true},
    onPlace :{type: Boolean, required: true},

     
    });

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;