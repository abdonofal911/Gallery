import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {fontScale, scale, vScale} from '../../themes/Scale';
import ContainerView from '../../components/shared/ContainerView';
import Colors from '../../themes/Colors';
import Font from '../../themes/Font';
import AppInput from '../../components/shared/AppInput';
import Spacer from '../../components/shared/Spacer';
import AppButton from '../../components/shared/AppButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {signup} from '../../actions/userActions';
import {NavigationProp} from '@react-navigation/native';
import {RootState} from '../../store/types';

interface SignupProps {
  navigation: NavigationProp<any, any>;
}
const Signup: React.FC<SignupProps> = ({navigation}) => {
  const {signupLoader} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const initValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('please enter email')
      .email('please enter a valid email'),
    password: Yup.string()
      .required('please enter password')
      .min(8, 'Minimum eight characters'),
  });

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validationSchema,
    onSubmit: values => handleOnSubmit(values),
  });

  const handleOnSubmit = async (values: {email: string; password: string}) => {
    // console.log('signup values', values);
    dispatch(signup(values));
  };

  return (
    <ContainerView style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subTitle}>Enter your credentials to continue </Text>

      <AppInput
        label="Email"
        placeholder="Enter your email ..."
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
        errorMessage={formik.touched.email && formik.errors.email}
        onBlur={() => formik.setFieldTouched('email')}
        placeholderTextColor={Colors.label}
        outerContainerStyle={styles.inputContainer}
      />
      <Spacer space={20} />
      <AppInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        errorMessage={formik.touched.password && formik.errors.password}
        onBlur={() => formik.setFieldTouched('password')}
        placeholderTextColor={Colors.label}
        outerContainerStyle={styles.inputContainer}
      />
      <Pressable>
        <Text style={styles.terms}>
          By continuing you agree to our
          <Text style={styles.signupColor}> Terms of Service</Text> and
          <Text style={styles.signupColor}> Privacy Policy.</Text>
        </Text>
      </Pressable>
      <Spacer space={32} />
      <AppButton
        title="Signup"
        onPress={formik.handleSubmit}
        loading={signupLoader}
      />
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupColor}>Login</Text>
        </Text>
      </Pressable>
    </ContainerView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    paddingTop: vScale(40),
  },
  logo: {
    width: scale(48),
    height: vScale(56),
    alignSelf: 'center',
    marginTop: vScale(77),
    marginBottom: vScale(100),
  },
  title: {
    color: Colors.black,
    fontSize: fontScale(26),
    fontFamily: Font.Bold,
    marginStart: scale(25),
  },
  inputContainer: {
    alignSelf: 'center',
  },
  subTitle: {
    color: Colors.black,
    fontSize: fontScale(16),
    fontFamily: Font.Medium,
    opacity: 0.5,
    marginTop: vScale(10),
    marginStart: scale(25),
    marginBottom: vScale(40),
  },
  terms: {
    color: Colors.black,
    fontFamily: Font.Regular,
    textAlign: 'left',
    fontSize: fontScale(14),
    marginHorizontal: scale(25),
    marginTop: vScale(10),
    lineHeight: 20,
  },
  signupText: {
    alignSelf: 'center',
    fontSize: fontScale(14),
    color: Colors.black,
    fontFamily: Font.Regular,
    marginTop: vScale(10),
  },
  signupColor: {
    color: Colors.mainColor,
  },
});
