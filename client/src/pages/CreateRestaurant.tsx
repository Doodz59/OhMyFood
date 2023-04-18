import React from 'react'
import {useState} from 'react'
import { useGetIdentity } from '@pankod/refine-core'
import { FieldValues, useForm } from '@pankod/refine-react-hook-form'
import { useNavigate } from '@pankod/refine-react-router-v6'
import Form from 'components/common/Form'
import { v4 as uuidv4 } from 'uuid';

import { LoadScript, GoogleMap,  } from '@react-google-maps/api';
import Geocode from 'react-geocode';

const CreateRestaurant = () => {

   const navigate = useNavigate();
  const  {data: user}= useGetIdentity();
  const [propertyImage, setPropertyImage]= useState({name:'', url:''})
  const {refineCore:{onFinish, formLoading}, register, handleSubmit }= useForm();
  
  const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  Geocode.setApiKey(apiKey);
  
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  };
  const [lat, setLat] = useState(0);
const [lng, setLng] = useState(0);
const onFinishHandler = async (data: FieldValues) => {
  if (!propertyImage.name) return alert('Please select an image');

  try {
    const response = await Geocode.fromAddress(data.location);
    const { lat, lng } = response.results[0].geometry.location;
    setLat(parseFloat(lat));
    setLng(parseFloat(lng));
    const uniqueId = uuidv4();
    console.log(data.menu)
 
    await onFinish({
      ...data,
      id: uniqueId,
      photo: propertyImage.url,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      email: user.email,
      menu : data.menu,
    });
    
    
   
  } catch (error) {
    console.log(error);
  }
  };
  
  return (
    <Form
    type="Create"
    register={register}
    onFinish={onFinish}
    formLoading={formLoading}
    handleSubmit={handleSubmit}
    handleImageChange={handleImageChange}
    onFinishHandler={onFinishHandler}
    propertyImage={propertyImage}/>
  )
}

export default CreateRestaurant