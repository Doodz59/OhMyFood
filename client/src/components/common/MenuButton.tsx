import React, { useState, useEffect } from 'react';
import { Stack, Typography, IconButton, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { MenuButtonProps } from 'components/interfaces/common';

const MenuButton: React.FC<MenuButtonProps> = ({ item, onSelect, onRemove }) => {
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showActions, setShowActions] = useState(false);
  
const id = item._id;
const name = item.titre;
const price = item.price;
const selectedProduct = {
  id: id,
  quantity: quantity,
  price: price,
  name : name
};
const handleDoneClick = () => {
  setShowActions(false);
  if (onSelect) {
    
    
    onSelect(selectedProduct);
  }
  setSelected(false);
};



  const handleRemoveClick = () => {
    setQuantity(0);
    setShowActions(false);
    setSelected(false);
    if (onRemove) {
      onRemove(selectedProduct);
    }
  };
  
  

  const handleAddClick = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtractClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box  display='flex' 
   
    sx={{
      alignItems: 'center',
      justifyContent:'space-between',
      direction:'row',
      boxShadow: '1px 1px 8px #aaaaaa',
      borderRadius: '16px',
      bgcolor:'white',
      m: 1,
      p: 1,
      width: '100%',
      cursor: 'pointer',
    }}>
    <Stack id={item._id}
          onClick={() => {
        setSelected(!selected);
        setShowActions(true);
      }}
    >
      <Stack sx={{ flexGrow: 1, alignItems: 'flex-start' }}>
        <Typography fontSize="16px" fontWeight={800}>
          {item.titre}
        </Typography>
        <Typography>{item.description}</Typography>
      </Stack>
      
    </Stack>
    {showActions ? (
      <Stack direction="row" alignItems="center">
        
        
        <IconButton size="small" onClick={handleSubtractClick}>
          <RemoveIcon />
        </IconButton>
        <Typography>{quantity}</Typography>
        <IconButton size="small" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
        <IconButton size="small" onClick={handleDoneClick}>
          <DoneIcon color='success' />
        </IconButton>
        <IconButton size="small" onClick={handleRemoveClick}>
          <RemoveIcon color='error' />
        </IconButton>
      </Stack>
    ) : (
      <Typography>{item.price}€</Typography>
    )}
    </Box>
  );
};

export default MenuButton;
