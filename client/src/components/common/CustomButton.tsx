import React from 'react'
import { Button, minWidth } from '@pankod/refine-mui'
import { CustomButtonProps } from 'components/interfaces/common'


const CustomButton = ({type, title, color, fullWidth,backgroundColor,disabled, icon, handleClick, onClick}:CustomButtonProps) => {
  return (
    <Button 
    disabled={disabled}
    type={type === 'submit' ?'submit' : 'button'} 
    sx={{flex:fullWidth ? 1: 'unset',
    padding:'10px 15px',
    width:fullWidth? '100%': 'fit-content',
    minWidth:130,
    backgroundColor,
    color,
    fontWeight:600,
    fontSize:16,
    gap:'10px',
    textTransform:'capitalize',
    '&:hover':{
      opacity: 0.9,
      backgroundColor
    }
    }}
    onClick={onClick}>
      {icon}
      {title}
    </Button>
  )
}

export default CustomButton