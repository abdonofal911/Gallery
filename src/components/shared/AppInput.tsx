import React from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {fontScale, scale, sWidth, vScale} from '../../themes/Scale';
import Colors from '../../themes/Colors';
import Font from '../../themes/Font';

interface AppInputProps {
  label?: string;
  onChangeText: (text: string) => void;
  value: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onBlur?: () => void;
  errorMessage?: any;
  onEndEditing?: () => void;
  onFocus?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: any;
  containerStyle?: any;
  outerContainerStyle?: any;

  placeholderTextColor?: any;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  onBlur,
  errorMessage,
  onEndEditing,
  onFocus,
  autoCapitalize,
  style,
  containerStyle,
  outerContainerStyle,
  placeholderTextColor,
  ...rest
}) => {
  return (
    <View style={outerContainerStyle || {}}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, containerStyle]}>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          onEndEditing={onEndEditing}
          onFocus={onFocus}
          autoCapitalize={autoCapitalize}
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor}
          {...rest}
        />
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: sWidth * 0.9,
    borderRadius: vScale(10),
    overflow: 'hidden',
    paddingVertical: Platform.OS === 'ios' ? vScale(10) : 0,
    backgroundColor: Colors.border,
    marginBottom: vScale(10),
  },
  label: {
    color: Colors.label,
    fontFamily: Font.Medium,
    fontSize: fontScale(16),
    marginBottom: vScale(10),
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: Colors.border,
    color: Colors.black,
    fontSize: scale(18),
    marginHorizontal: scale(20),
  },
  errorMessage: {
    fontFamily: Font.Light,
    color: Colors.red,
    fontSize: fontScale(12),
    marginTop: vScale(5),
  },
});
