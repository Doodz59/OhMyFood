import React from 'react'
import {   useShow } from "@pankod/refine-core";

import { Typography, Box} from "@pankod/refine-mui";

const OrderConfirmation = () => {

  const { queryResult } = useShow();
  const { data, isLoading, isError } = queryResult;
  const orderDetails = data?.data ?? {};
  const menu = orderDetails.menu;

  interface MenuItem {
    _id: string;
    name: string;
    quantity: number;
    price: number;
  }
  if (isLoading) {
    return <div>Loading...</div>;
}
if (isError) {
    return <div>Something went wrong!</div>;
}

  return (
    <Box>
      <Typography> Commande n°{orderDetails._id} confirmée </Typography>
      <Typography> Résumé de votre commande : </Typography>
      {menu.map((item: MenuItem) => (
       <Typography>
 {item.name} -- {item.quantity} prix unitaire= {item.price} prix total = {item.price * item.quantity}
       </Typography>
    ))}
    </Box>
  )
}

export default OrderConfirmation