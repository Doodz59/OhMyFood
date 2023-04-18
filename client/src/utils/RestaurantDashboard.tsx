
import axios from "axios";
import { Restaurant, Order } from '../components/interfaces/common';

 
  
const GetRestaurantDetailId = async (restaurantIds: string, creatorId: string): Promise<Restaurant[]> => {

    try {
      const response = await axios.get('http://localhost:8080/api/v1/restaurants');
      const restaurants: Restaurant[] = response.data;
      const filteredRestaurants = restaurants.filter((restaurant: Restaurant) => {
        return restaurantIds.includes(restaurant._id) && restaurant.creator === creatorId;
      });
      return filteredRestaurants;
    } catch (error) {
      console.error(error);
      return []; 
    }
  };

  const getOrdersByRestaurantId = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/orders/restaurant/${id}`);
      const orders = response.data;
      
      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const getRestaurant = async (id: string): Promise<Restaurant | null> => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/restaurants/${id}`);
      const restaurants: Restaurant[] = response.data;
      if (restaurants.length > 0) {
        return restaurants[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

 
  
  export { GetRestaurantDetailId, getOrdersByRestaurantId, getRestaurant };
  