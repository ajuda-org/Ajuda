import React from 'react';
import { TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { Feather as Icon } from "@expo/vector-icons";

interface IButton {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color: string;
}

const ArrowLeftButton: React.FC<IButton> = ({ onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="arrow-left" color={color} size={20} />
    </TouchableOpacity>
  );
}

export default ArrowLeftButton;