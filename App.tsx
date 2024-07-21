import {StyleSheet, Text, View, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigator from './src/navigation';
import {Splash} from './src/screens/Splash';
import {useDispatch} from 'react-redux';
import {getUserData} from './src/storage';
import {saveUserInfo} from './src/actions/userActions';

LogBox.ignoreAllLogs();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  const getUserDataFromLocalStorage = async () => {
    const response = await getUserData();
    // console.log('getUserDataFromLocalStorage', response);
    if (response) {
      dispatch(saveUserInfo(response));
    }
  };

  useEffect(() => {
    getUserDataFromLocalStorage();
  }, []);

  return (
    <View style={styles.container}>
      {showSplash ? <Splash /> : <Navigator />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
