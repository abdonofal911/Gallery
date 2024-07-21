import {
  ActivityIndicator,
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
import React, {useEffect} from 'react';
import Colors from '../../themes/Colors';
import {fontScale, scale, sWidth, vScale} from '../../themes/Scale';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {Spacer} from '../../components/shared';
import Font from '../../themes/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setFavorites} from '../../actions/favoritesActions';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../../store/types';

interface FavoritesProps {
  navigation: NavigationProp<any, any>;
}
const Favorites: React.FC<FavoritesProps> = ({navigation}) => {
  const {favorites, loading} = useSelector(
    (state: RootState) => state.favorites,
  );

  return (
    <View style={{flex: 1}}>
      <SafeAreaView />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} style={styles.icon} />
        </Pressable>
        <Text style={styles.titleHeader}>Favorites</Text>
      </View>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.mainColor}
            style={styles.loading}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {favorites.length === 0 ? (
              <Text style={styles.text}>
                oh , you didn't save any wallpaper yet
              </Text>
            ) : (
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                data={favorites}
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
            <Spacer space={400} />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Favorites;

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
    width: 360,
    borderRadius: vScale(10),
    overflow: 'hidden',
    paddingVertical: vScale(10),
    backgroundColor: Colors.border,
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
    flex: 1,
    color: Colors.black,
    fontSize: fontScale(26),
    fontFamily: Font.Bold,
    marginStart: scale(10),
  },
});
