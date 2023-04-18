import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import {Box,Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button, width, useTheme} from '@pankod/refine-mui'
import { FormProps } from 'components/interfaces/common'
import CustomButton from './CustomButton'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
;
const Form = ({type, handleImageChange, formLoading,onFinishHandler,propertyImage}:FormProps) => {
  interface Menu {
    entrees: { titre: string; description: string; price: number }[];
    plats: { titre: string; description: string; price: number }[];
    desserts: { titre: string; description: string; price: number }[];
  }
  
  const { register, handleSubmit } = useForm();
  const [menu, setMenu] =  useState<Menu>({ entrees: [], plats: [], desserts: [] });

  const onSubmit = (data: any) => {
    const restaurantData = { ...data, menu };
    console.log(restaurantData);
    console.log(menu)
    // envoyer les données à l'API backend ici
  };
  
  const addMenu = (type: keyof Menu) => {
    const newMenuItem = { titre: '', description: '', price: 0 };
    setMenu((prevMenu: Menu) => ({
      ...prevMenu,
      [type]: [...prevMenu[type].slice(), newMenuItem],
    }));
  };
  const handleMenuChange = (
    type: keyof Menu,
    index: number,
    key: keyof typeof menu.entrees[0] | keyof typeof menu.plats[0] | keyof typeof menu.desserts[0],
    value: string | number
  ) => {
    setMenu((prevMenu: Menu) => {
      const updatedMenu: Menu = { 
        entrees: [...prevMenu.entrees],
        plats: [...prevMenu.plats],
        desserts: [...prevMenu.desserts],
      };
      (updatedMenu[type][index] as any)[key] = value;
      return updatedMenu;
    });
  };
  const removeMenu = (type: keyof Menu, index: number) => {
    setMenu((prevMenu: Menu) => {
      const updatedMenu: Menu = { 
        entrees: [...prevMenu.entrees],
        plats: [...prevMenu.plats],
        desserts: [...prevMenu.desserts],
      };
      updatedMenu[type].splice(index, 1);
      return updatedMenu;
    });
  };
  

  

  return (
    
    <form onSubmit={handleSubmit(onFinishHandler)}>
      <TextField {...register('title')} label="Titre" required />
      <TextField {...register('description')} label="Description" required />
      <FormControl sx={{flex:1}}>
<FormHelperText sx={{fontWeight:500, margin:'10px 0', fontSize:16, color:"black"}}>
  Select Property Type

</FormHelperText>
<Box>

</Box>

<Select variant='outlined' color='info' displayEmpty required inputProps={{'aria-label': 'Without label'}}
defaultValue="Cuisine Francaise" {...register('restaurantType')} label="Type de restaurant" 
>
<MenuItem
value="Cuisine Francaise" > Cuisine Francaise
</MenuItem>
<MenuItem
value="Fast Food" > Fast Food
</MenuItem>
<MenuItem
value="Cuisine Chinoise" > Cuisine Chinoise
</MenuItem>
<MenuItem
value="Cuisine Japonaise " > Cuisine Japonaise
</MenuItem>
<MenuItem
value="Cuisine Africaine" > Cuisine Africaine 
</MenuItem>
<MenuItem
value="Cuisine Sud Americaine " > Cuisine Sud Americaine
</MenuItem>
<MenuItem
value="Cuisine Végétarienne" > Cuisine Végétarienne
</MenuItem>
<MenuItem
value="Cuisine du Monde " > Cuisine du Monde
</MenuItem>
</Select>
</FormControl>
      <TextField {...register('location')} label="Lieu" required />
      <Button component="label" sx={{width:'fit-content',  textTransform:'capitalize', fontSize:16}}>
  Upload*
  <input
  hidden
  accept='image/*'
  type='file'
  onChange={(e)=>{//@ts-ignore
    handleImageChange(e.target.files[0])}}/>
</Button>
<Typography fontSize={14} color='#808191' sx={{wordBreak:'break-all'}}>
  {propertyImage?.name}
</Typography>
<div>
        <h4>Menu</h4>
        <h5>Entrées</h5>
        
      <Fab color="primary" aria-label="add" onClick={() => addMenu('entrees')}>
        <AddIcon />
      </Fab>
      
       
        {menu.entrees.map((item, index) => (
          <div key={index}>
            <TextField {...register(`menu.entrees[${index}].titre`, {value: item.titre})}
  label="Titre"   required   value={item.titre}   onChange={(e) => handleMenuChange("entrees", index, "titre", e.target.value)}
/>
<TextField {...register(`menu.entrees[${index}].description`, {value: item.description})}
  label="Description"   required   value={item.description}   onChange={(e) => handleMenuChange("entrees", index, "description", e.target.value)}
/>
<TextField {...register(`menu.entrees[${index}].price`, {value: item.price})}
  label="Price"  required type="number"   value={item.price}   onChange={(e) => handleMenuChange("entrees", index, "price", e.target.value)}
/>
      <Fab color="warning" aria-label="add" onClick={() => removeMenu("entrees", index)}>
        <RemoveIcon />
      </Fab>
      
          </div>
        ))}

        <h5>Plats</h5>
        
        <Fab color="primary" aria-label="add" onClick={() => addMenu('plats')}>
        <AddIcon />
      </Fab>
        {menu.plats.map((item, index) => (
          <div key={index}>
          <TextField {...register(`menu.plats[${index}].titre`, {value: item.titre})}
label="Titre"   required   value={item.titre}   onChange={(e) => handleMenuChange("plats", index, "titre", e.target.value)}
/>
<TextField {...register(`menu.plats[${index}].description`, {value: item.description})}
label="Description"   required   value={item.description}   onChange={(e) => handleMenuChange("plats", index, "description", e.target.value)}
/>
<TextField {...register(`menu.plats[${index}].price`, {value: item.price})}
label="Price"  required type="number"   value={item.price}   onChange={(e) => handleMenuChange("plats", index, "price", e.target.value)}
/>

<Fab color="warning" aria-label="add" onClick={() => removeMenu("plats", index)}>
        <RemoveIcon />
      </Fab>

        </div>
        ))}

        <h5>Desserts</h5>
        <Fab color="primary" aria-label="add" onClick={() => addMenu('desserts')}>
        <AddIcon />
      </Fab>
        
        {menu.desserts.map((item, index) => (
          <div key={index}>
          <TextField {...register(`menu.desserts[${index}].titre`, {value: item.titre})}
label="Titre"   required   value={item.titre}   onChange={(e) => handleMenuChange("desserts", index, "titre", e.target.value)}
/>
<TextField {...register(`menu.desserts[${index}].description`, {value: item.description})}
label="Description"   required   value={item.description}   onChange={(e) => handleMenuChange("desserts", index, "description", e.target.value)}
/>
<TextField {...register(`menu.desserts[${index}].price`, {value: item.price})}
label="Price"  required type="number"   value={item.price}   onChange={(e) => handleMenuChange("desserts", index, "price", e.target.value)}
/>
<Fab color="warning" aria-label="add" onClick={() => removeMenu("desserts", index)}>
        <RemoveIcon />
      </Fab>

        </div>
        ))}
      </div>
      <CustomButton
type='submit'
title={formLoading ?'Submitting...':'Submit'}
backgroundColor='green'
color='white'/>
    </form>

    
  );
};

export default Form;