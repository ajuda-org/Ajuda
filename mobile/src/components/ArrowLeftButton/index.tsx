import React from 'react';
import { TouchableOpacity, Image, GestureResponderEvent } from 'react-native';

import arrowleft from "../../assets/images/icons/arrowleft.png";

interface IButton {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const ArrowLeftButton: React.FC<IButton> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 40}}>
      <Image source={arrowleft}/>
    </TouchableOpacity>
  );
}

export default ArrowLeftButton;