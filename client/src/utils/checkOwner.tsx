import { useState, } from 'react';
import axios from "axios";




const CheckOwner = () => {
    const [owner, setOwner] = useState(false);    
    axios.get('http://localhost:8080/api/v1/users', )
.then(response => {
  const user = response.data; 

  if (user[0].allRestaurants.length > 0) {
   
   setOwner(false);
  } else {
    setOwner(true);
  }
  
})
.catch(error => {
 
  console.log(error);
});
return (
    owner
  )
  
};

export {CheckOwner}

