import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface ContainerViewProps {
  style?: any;
  children: React.ReactNode;
  contentContainerStyle?: any;
}

const ContainerView: React.FC<ContainerViewProps> = ({
  style,
  children,
  contentContainerStyle,
}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={contentContainerStyle}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={[styles.container, style]}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default ContainerView;
