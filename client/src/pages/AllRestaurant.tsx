
import { useTable } from "@pankod/refine-core";
import {
    Box,
    
} from "@pankod/refine-mui";


import RestaurantCard from '../components/common/RestaurantCard'

const NosRestaurants = () => {

  const {
    tableQueryResult: { data },
    
} = useTable();
  const allRestaurants = data?.data ?? []; 


 
  return (
    <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
    {allRestaurants?.map((restaurant) => (
        <RestaurantCard 
            key={restaurant._id}
            id={restaurant._id}
            title={restaurant.title}
            location={restaurant.location}
            restaurantType={restaurant.restaurantType}
            photo={restaurant.photo}
        />
    ))}
</Box>
  )
}

export default NosRestaurants