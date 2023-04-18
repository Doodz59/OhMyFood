/* eslint-disable no-restricted-globals */
import React, { useEffect, useState, useRef } from 'react';

import { Typography, Box, Stack, Button} from "@pankod/refine-mui";
import {  useGetIdentity, useShow } from "@pankod/refine-core";
import {  useNavigate, } from "@pankod/refine-react-router-v6";

import MenuButton from 'components/common/MenuButton';

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StorefrontIcon from '@mui/icons-material/Storefront';
import axios from 'axios';

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();

  interface Product {
    platid: string;
    quantity: number;
    price: number;
    name : string;
  }

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const total = selectedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  const [onPlace, setOnPlace] = useState(false);
  const { data, isLoading, isError } = queryResult;
  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);
  let orderDate = new Date();
  const restaurantDetails = data?.data ?? {};
  const [menu, setMenu] = useState<any>(null);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const restaurantiD = restaurantDetails._id;
  const userId = user.userid;


 

const handleOrder = () => {
  const orderInfo = {
    menu: selectedProducts,
    onPlace: onPlace,
    RestaurantsID: restaurantiD,
    RestaurantName : restaurantDetails.title,
    userId : userId,
    date : orderDate,

  };
  console.log(orderInfo);
  axios.post('http://localhost:8080/api/v1/orders', orderInfo)
    .then(response => {
      const orderId = response.data.orderId; // récupère l'ID de la commande depuis la réponse du serveur
      navigate(`/orders/show/${orderId}`);
      
    })
    .catch(error => {
      // Une erreur s'est produite lors de l'envoi de la requête
      // Traitez l'erreur ici si nécessaire
      console.log(error);
    });
};


  const handleChange = () => {
    setChecked((prev) => !prev);
  };


  useEffect(()=>{
    async function getMenu(){
      const menu = await restaurantDetails.menu[0];
      setMenu(menu);
      setMenuLoaded(true);
    }
    getMenu();
  },[restaurantDetails._id])

  interface MenuItem {
    _id: string;
    titre: string;
    description: string;
    price: number;
  }
  

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (isError) {
      return <div>Something went wrong!</div>;
  }

 


  const handleSelectProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
  }
const handleOnPlace = ()=> {
  setOnPlace(true);
}
const handleOnDeliver = ()=> {
  setOnPlace(false);
}
  return (
   <Box display='flex' flexDirection='column'>   
    <Stack  display='flex' sx={{    maxWidth: '100%', maxHeight: '25vw', justifyContent:'center'  ,objectFit: 'contain',overflow: 'hidden', zIndex:1, }}  >
    <img
                        src={restaurantDetails.photo}
                        alt="property_details-img"
                        
                        style={{ objectFit: "contain", position:'relative', borderRadius: "10px",width:'100%' }}
                        className="property_details-img"
                    />
    </Stack>   
   <Box mt='-150px' sx={{position: 'relative', zIndex:3, bgcolor:'#e2e2e2', borderRadius: "10px" }}>
    <Stack >
    <Typography fontSize='26px' m={4} fontWeight={800}> {restaurantDetails.title}</Typography>
    <Typography fontSize='18px' m={2}>{restaurantDetails.description}</Typography>
    </Stack>
    <Box display='flex' flexWrap='wrap' justifyContent='space-between' m={4}>
  <Box>
    <Typography variant="h6" m={2}>Entrées</Typography>
    {menuLoaded &&menu.entrees.map((item: MenuItem) => (     
     <MenuButton
     key={item._id}
     item={item}
     
     onSelect={handleSelectProduct}
   />
    ))}
  </Box>
  <Box>
    <Typography variant="h6" m={2} >Plats</Typography>
    {menuLoaded &&menu.plats.map((item: MenuItem) => (
     <MenuButton
     key={item._id}
     item={item}
     
     onSelect={handleSelectProduct}
   />
    ))}
  </Box>
  <Box>
    <Typography variant="h6" m={2} >Desserts</Typography>
    {menuLoaded &&menu.desserts.map((item: MenuItem) => (
       <MenuButton
       key={item._id}
       item={item}
       
       onSelect={handleSelectProduct}
       
     />
    ))}
  </Box>
</Box>
</Box>
<Box>
  <Stack display='flex'>
    <Typography> Type de commande :</Typography>
    <Stack display='flex' flexDirection='row'>
    <Stack onClick={handleOnDeliver} display='flex' sx={{
      cursor:'pointer',
      boxShadow: '1px 1px 8px #aaaaaa',
    }} flexDirection='row' m={1} p={1} bgcolor='green' color='white' borderRadius='15px' >
        <DeliveryDiningIcon/>
      <Typography>En livraison</Typography> 
      </Stack>
      <Stack onClick={handleOnPlace}sx={{
      cursor:'pointer',
      boxShadow: '1px 1px 8px #aaaaaa',
    }}  display='flex' flexDirection='row' m={1} p={1} bgcolor='purple' color='white' borderRadius='15px'  >
  <StorefrontIcon/>
  <Typography> Sur place</Typography>
  </Stack>
    </Stack>
    
  </Stack>
  

 
  <Typography>Votre commande :</Typography>
  {selectedProducts.map((product) => (
    <Box key={product.platid}>
      <Typography>
        {product.quantity} x {product.name} - {product.price * product.quantity} €
      </Typography>
    
    </Box>
  ))}
  <Typography>Total : {total}€</Typography>
  <Button onClick={handleOrder} > Commander </Button>
  
</Box>
   </Box>
  )
}

export default RestaurantDetails