// Importations de la librairie refine et de react
import { useTable } from "@pankod/refine-core";
import {
  Box,
  Stack,
  Typography,
 
  MenuItem,
 
} from "@pankod/refine-mui";

import { useMemo } from "react";

const Orders = () => {



  interface MenuItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }

  const {
    tableQueryResult: { data},
 
  } = useTable();

  const allOrders = data?.data ?? [];

  const menus = useMemo(() => {
    const menuItems = allOrders.flatMap((order) => order.menu);
    const uniqueMenuItems = Array.from(new Set(menuItems));
    return uniqueMenuItems;
  }, [allOrders]);

  return (
    <Box mt="20px">
      <Typography variant="h2">Vos commandes</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {allOrders.map((order) => (
          <Box key={order._id}>
            <Typography variant="h4">Commande n°{order._id}</Typography>
            <Typography>Chez {order.RestaurantName}</Typography>
            <Typography>Date de commande: {order.date}</Typography>
            <Stack>
              <Typography>Résumé de la commande:</Typography>
              {order.menu.map((item: MenuItem) => (
                <Typography key={item._id}>
                  {item.quantity}x {item.name} ({item.price})
                </Typography>
              ))}
            </Stack>
            <Typography>Prix total: {order.totalPrice}</Typography>
          </Box>
        ))}
        {/* Render menu items */}
        {menus.map((menuItem) => (
          <MenuItem key={menuItem._id} value={menuItem}>
            {menuItem.name}
          </MenuItem>
        ))}
      </Box>
    </Box>
  );
};

export default Orders;
