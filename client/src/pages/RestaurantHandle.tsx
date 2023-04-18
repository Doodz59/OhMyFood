import React, { useEffect, useState } from 'react';
import { CheckOwner } from 'utils/checkOwner';
import { GetRestaurantDetailId, getOrdersByRestaurantId } from 'utils/RestaurantDashboard';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { useTable } from '@pankod/refine-core';
import { Restaurant, Order } from '../components/interfaces/common';
import { Typography, Box, Stack } from '@pankod/refine-mui';
import RestaurantCard from '../components/common/CardRestaurant';

const RestaurantHandle = () => {
  const {
    tableQueryResult: { data },
  } = useTable();
  const user = data?.data ?? [];
  const [restaurants, setRestaurants] = useState<Restaurant[][]>([]);
  const creatorId = user[0]?._id ?? '';
  const allRestaurants = user[0]?.allRestaurants ?? [];

  const restaurantIDs = allRestaurants;

  useEffect(() => {
    const handleGetRestaurantsAndOrders = async () => {
      const [restaurants] = await Promise.all([
        Promise.all(
          restaurantIDs.map(async (restaurantID: any) => await GetRestaurantDetailId(restaurantID, creatorId))
        ),
      ]);

      setRestaurants(restaurants);
    };

    handleGetRestaurantsAndOrders();
  }, [restaurantIDs, creatorId]);

  if (restaurantIDs.length > 1) {
    return (
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {restaurants?.map((restaurantList, index) => (
          <React.Fragment key={index}>
            {restaurantList?.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                title={restaurant.title}
                location={restaurant.location}
                restaurantType={restaurant.restaurantType}
                photo={restaurant.photo ?? 'defaultPhotoUrl'}
              />
            ))}
          </React.Fragment>
        ))}
      </Box>
    );
  } else {
    return <div>No restaurants to display</div>;
  }
  return(
    <div>mianm</div>
  )
};


export default RestaurantHandle
