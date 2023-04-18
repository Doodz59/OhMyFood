import React, { useEffect, useState } from 'react';
import { getRestaurant } from 'utils/RestaurantDashboard';
import { Restaurant } from '../components/interfaces/common';

const RestaurantAdmin = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const fetchedRestaurant = await getRestaurant(id);
      setRestaurant(fetchedRestaurant);
    };

    fetchRestaurant();
  }, [id]);

  console.log(restaurant);

  return (
    <div>RestaurantAdmin</div>
  );
};

export default RestaurantAdmin;
