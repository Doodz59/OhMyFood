import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  restaurantType: { type: String, required: true },
  location: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  photo: { type: String, required: true },
  menu: [
    {
      entrees: [
        {
          titre: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
      plats: [
        {
          titre: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
      desserts: [
        {
          titre: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default RestaurantModel;
