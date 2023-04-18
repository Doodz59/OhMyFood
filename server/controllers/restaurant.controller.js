import Restaurant from '../mongodb/Models/Restaurant.js'
import User from "../mongodb/models/user.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getAllRestaurants = async (req,res)=>{
    const {_end,_order,_start,_sort, title_like='', restaurantType=''}=req.query;
    const query = {};
    if(restaurantType!==''){
        query.restaurantType = restaurantType;
    }

    if(title_like){
        query.title= {$regex:title_like, $options:'i'};}
    
    try{

        const count = await Restaurant.countDocuments({query});
const restaurants = await Restaurant
.find(query)
.limit(_end)
.skip(_start)
.sort({[_sort]:_order})
res.header('x-total-count',count);
res.header('Access-Control-Expose-Headers', 'x-total-count');
res.status(200).json(restaurants);



    }catch(error){
res.status(500).json({message: error.message})

    }

};
const createRestaurant =async (req,res)=>{
    try {
    const {title, description, restaurantType, location,photo, lat, lng,menu} = req.body
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await User.findOne({email: req.body.email}).session(session);

    if (!user) throw new Error("User not found");

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newRestaurant = await Restaurant.create({
            title,
            description,
            restaurantType,
            location,
            lat,
            lng,
            photo: photoUrl.url,
            creator: user._id,
            menu,
        });

        user.allRestaurants.push(newRestaurant._id);
        await user.save({ session });
        
        await session.commitTransaction();
        
        res.status(200).json({ message: "Restaurant créé" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
    

};
const updateRestaurant =async (req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,restaurantType, location, price,lat,
            lng, photo, menu}=req.body;
        
        const photoUrl= await cloudinary.uploader.upload(photo);
        
        await Restaurant.findByIdAndUpdate({_id:id},{
            title,description,restaurantType,location,price,lat,lng,menu,photo:photoUrl.url || photo
        })
        res.status(200).json({message:'Restaurant updated successfully'})
            }catch (error) {
        res.status(500).json({message: error.message})
            }

};

const deleteRestaurant =async (req,res)=>{
    try {
        const { id } = req.params;

        const restaurantToDelete = await Restaurant.findById({ _id: id }).populate(
            "creator",
        );

        if (!restaurantToDelete) throw new Error("Restaurant not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        await Restaurant.deleteOne({ _id: id }, { session });
        restaurantToDelete.creator.allProperties.pull(restaurantToDelete);

        await restaurantToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const getRestaurantDetail =async (req,res)=>{
    const { id } = req.params;
    const restaurantExists = await Restaurant.findOne({ _id: id }).populate(
        "creator",
    );

    if (restaurantExists) {
        res.status(200).json(restaurantExists);
    } else {
        res.status(404).json({ message: "Restaurant not found" });
    }
};




export {
    getAllRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantDetail,
    
}
