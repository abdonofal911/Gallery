import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../themes/Colors';
import {fontScale, scale, sWidth, vScale} from '../../themes/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {removeUserData} from '../../storage';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {logOutUser} from '../../actions/userActions';
import {getWallpapers} from '../../actions/galleryActions';
import {AppInput, Spacer} from '../../components/shared';
import Font from '../../themes/Font';
import firestore from '@react-native-firebase/firestore';
import {setFavorites} from '../../actions/favoritesActions';
import {RootState} from '../../store/types';
interface HomeProps {
  navigation: NavigationProp<any, any>;
}
const Home: React.FC<HomeProps> = ({navigation}) => {
  const {wallpapers, loading} = useSelector(
    (state: RootState) => state.wallpapers,
  );
  const {localId} = useSelector((state: RootState) => state.user);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(localId)
      .onSnapshot(documentSnapshot => {
        dispatch(setFavorites(documentSnapshot.data().favorites));
      });
    return () => subscriber();
  }, []);
  const handleLogeOut = () => {
    dispatch(logOutUser());
    removeUserData();
  };
  const getData = (data = 'random') => {
    dispatch(getWallpapers(data));
  };
  useEffect(() => {
    getData();
  }, []);
  const handleOnChangeText = (text: string) => {
    setQuery(text);
    getData(text);
  };

  const showLogOutAlert = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Sign Out Cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleLogeOut(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Favorites')}>
          <Fontisto name="favorite" size={26} style={styles.icon} />
        </Pressable>
        <Text style={styles.titleHeader}>Wallpapers</Text>
        <Pressable onPress={() => showLogOutAlert()}>
          <Entypo name="log-out" size={26} style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.container}>
        <AppInput
          value={query}
          onChangeText={handleOnChangeText}
          placeholder="Search wallpapers"
          placeholderTextColor={Colors.label}
        />
        {/* {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.mainColor}
            style={styles.loading}
          />
        ) : ( */}
        <View>
          {wallpapers.length === 0 ? (
            <Text style={styles.text}>
              sorry , No wallpapers found with this search
            </Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              data={wallpapers}
              contentContainerStyle={styles.list}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Details', {wallpaper: item})
                  }>
                  <Image
                    resizeMode="cover"
                    source={{uri: item.src.landscape}}
                    style={styles.imageContainer}
                  />
                </TouchableOpacity>
              )}
            />
          )}
          {/* <Spacer space={400} /> */}
        </View>
        {/* )} */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    width: sWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: vScale(20),
  },
  icon: {
    color: Colors.red,
  },
  container: {
    alignItems: 'center',
  },
  loading: {
    marginTop: vScale(20),
  },
  searchContainer: {
    borderRadius: vScale(10),
    overflow: 'hidden',
    paddingVertical: vScale(10),
    marginBottom: vScale(10),
  },
  search: {
    fontSize: scale(18),
    color: Colors.black,
    marginHorizontal: scale(20),
    paddingBottom: 0,
  },
  imageContainer: {
    width: scale(180),
    height: vScale(240),
    margin: scale(5),
    borderRadius: vScale(10),
  },
  altContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: scale(10),
    paddingVertical: vScale(5),
  },
  alt: {
    color: Colors.white,
  },
  text: {
    alignSelf: 'center',
    fontSize: fontScale(16),
    color: Colors.black,
    fontFamily: Font.Medium,
    marginTop: vScale(10),
    textTransform: 'capitalize',
  },
  titleHeader: {
    color: Colors.black,
    fontSize: fontScale(26),
    fontFamily: Font.Bold,
    marginStart: scale(25),
  },
  list: {
    paddingBottom: vScale(300),
  },
});
