import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../themes/Colors';
import {fontScale, scale, vScale} from '../../themes/Scale';
import Font from '../../themes/Font';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  icon?: () => React.ReactNode;
  loading: boolean;
};

const AppButton = ({
  title,
  onPress,
  style,
  textStyle,
  icon,
  loading,
}: AppButtonProps) => (
  <Pressable style={[styles.container, style]} onPress={onPress}>
    {loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color={Colors.white} />
      </View>
    ) : (
      <>
        <View style={styles.icon}>{icon && icon()}</View>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        <View style={styles.icon} />
      </>
    )}
  </Pressable>
);

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: scale(360),
    height: vScale(67),
    backgroundColor: Colors.mainColor,
    borderRadius: vScale(12),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  text: {
    color: Colors.white,
    fontFamily: Font.Medium,
    fontSize: fontScale(18),
    textAlign: 'center',
  },
  icon: {
    width: scale(50),
  },
  loading: {
    alignSelf: 'center',
    width: '100%',
  },
});
