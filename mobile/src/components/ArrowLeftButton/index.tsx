import React from 'react';
import { TouchableOpacity, Image, GestureResponderEvent } from 'react-native';

import arrowleft from "../../assets/images/icons/arrowleft.png";

interface haha {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const ArrowLeftButton: React.FC<haha> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={arrowleft}/>
    </TouchableOpacity>
  );
}

export default ArrowLeftButton;