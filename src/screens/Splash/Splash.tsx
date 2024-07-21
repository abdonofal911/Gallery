import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import images from '../../assets/images';
import Colors from '../../themes/Colors';
import {scale, vScale} from '../../themes/Scale';

const Splash: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: scale(200),
    height: vScale(200),
  },
});
