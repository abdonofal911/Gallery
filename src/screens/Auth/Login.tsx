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
import {login} from '../../actions/userActions';
import {NavigationProp} from '@react-navigation/native';
import {RootState} from '../../store/types';

interface LoginProps {
  navigation: NavigationProp<any, any>;
}
const Login: React.FC<LoginProps> = ({navigation}) => {
  const {loginLoader} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('please enter a valid email')
      .required('please enter email'),
    password: Yup.string().required('please enter password'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values),
  });

  const handleSubmit = async (values: {email: string; password: string}) => {
    const {email, password} = values;
    dispatch(login({email, password}));
  };

  return (
    <ContainerView style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Logging</Text>
      <Text style={styles.subTitle}>Enter your emails and password</Text>
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
        errorMessage={formik.touched.email && formik.errors.password}
        onBlur={() => formik.setFieldTouched('password')}
        placeholderTextColor={Colors.label}
        outerContainerStyle={styles.inputContainer}
      />
      <Spacer space={32} />
      <AppButton
        title="Login"
        onPress={formik.handleSubmit}
        loading={loginLoader}
      />
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupColor}>Singup</Text>
        </Text>
      </Pressable>
    </ContainerView>
  );
};

export default Login;

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
  subTitle: {
    color: Colors.black,
    fontSize: fontScale(16),
    fontFamily: Font.Medium,
    opacity: 0.5,
    marginTop: vScale(10),
    marginStart: scale(25),
    marginBottom: vScale(40),
  },
  inputContainer: {
    alignSelf: 'center',
  },
  forgotPassText: {
    color: Colors.black,
    fontFamily: Font.Regular,
    textAlign: 'right',
    fontSize: fontScale(14),
    marginEnd: scale(10),
    marginTop: vScale(10),
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
