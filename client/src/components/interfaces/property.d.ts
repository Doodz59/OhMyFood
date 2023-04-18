import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    propertyType: string,
    location: string,
    price: number | undefined,
}

export interface RestaurantCardProps {
  id?: BaseKey | undefined,
  title: string,
  location: string,
  photo: string,
  restaurantType : string,
}
