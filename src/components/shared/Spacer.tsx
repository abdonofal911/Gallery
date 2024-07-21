import React from 'react';
import {View} from 'react-native';
import {vScale} from '../../themes/Scale';

interface SpacerProps {
  space: number;
}

const Spacer: React.FC<SpacerProps> = ({space}) => {
  return <View style={{height: vScale(space)}} />;
};

export default Spacer;
