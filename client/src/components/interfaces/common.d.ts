export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void,
    onClick?: () => void, 
    
}
export interface  Restaurant {
    _id: string;
    title: string;
    creator: string;
    description: string;
    location: string;
    phone: string;
    photo?: string;
    RestaurantsID: string;
    restaurantType : string;
  }

  export type Order = {
    _id: string;
    RestaurantsID: string;
    RestaurantName: string;
    creator: string;
    menu: Array<{
      id : string;
      quantity: number;
      price: number;
      name: string;
    }>;
    date: string;
    onPlace: boolean;
  };
  
interface MenuButtonProps {
    item: MenuItem;
    onSelect?: (selectedProduct) => void;
    onClick?: () => void;
    onRemove?:(selectedProduct)=> void;
  }
  

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    properties: Array | undefined
}

export interface PropertyProps {
    _id: string,
    title: string,
    description: string,
    location: string,
    price: string,
    photo: string,
    creator: string
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    propertyImage: { name: string, url: string },
}
