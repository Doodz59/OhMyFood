import mongoose from "mongoose";

const RestaurantAdminSchema = new mongoose.Schema({
    
    RestaurantsID : { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants", required:true,},

  totalOrders: {
    type: Number,
    default: 0
  },
  mostOrderedItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
      },
      count: {
        type: Number,
        default: 0
      }
    }
  ],
  mostProfitableItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
      },
      profit: {
        type: Number,
        default: 0
      }
    }
  ],
 
  // top 3 des produits les plus vendu
  // prix moyen par commande
  //3 produits les plus rentable
  

}, { timestamps: true });

const RestaurantAdmin = mongoose.model("RestaurantAdmin", RestaurantAdminSchema);

export default RestaurantAdmin;

