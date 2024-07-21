import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {fontScale, sHeight, sWidth, vScale} from '../../themes/Scale';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../themes/Colors';
import Font from '../../themes/Font';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, deleteFavorite} from '../../actions/favoritesActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParams} from '../../navigation/types';
import {RootState} from '../../store/types';
type screenNavigationProps = StackNavigationProp<AppStackParams, 'Details'>;
interface DetailsProps {
  navigation: screenNavigationProps;
  route: RouteProp<AppStackParams, 'Details'>;
}

const Details: React.FC<DetailsProps> = ({navigation, route}) => {
  const wallpaper = route?.params?.wallpaper;
  const dispatch = useDispatch();
  const {localId} = useSelector((state: RootState) => state.user);
  const {favorites} = useSelector((state: RootState) => state.favorites);
  const handleAddFavorite = () => {
    dispatch(addFavorite(localId, wallpaper));
  };
  const handleRemoveFavorite = () => {
    dispatch(deleteFavorite(localId, wallpaper));
  };
  const isFavorite = () => {
    return Boolean(favorites.find(favorite => favorite.id === wallpaper.id));
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} style={styles.icon} />
        </Pressable>
        <Text style={styles.titleHeader}>Wallpaper</Text>
        {isFavorite() ? (
          <Pressable onPress={() => handleRemoveFavorite()}>
            <MaterialIcons name="favorite" size={26} style={styles.icon} />
          </Pressable>
        ) : (
          <Pressable onPress={() => handleAddFavorite()}>
            <MaterialIcons
              name="favorite-border"
              size={26}
              style={styles.icon}
            />
          </Pressable>
        )}
      </View>
      <Image
        style={styles.image}
        source={{uri: wallpaper.src.portrait}}
        resizeMode="cover"
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  header: {
    width: sWidth * 0.92,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vScale(20),
  },
  titleHeader: {
    color: Colors.black,
    fontSize: fontScale(26),
    fontFamily: Font.Bold,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.black,
    alignSelf: 'flex-end',
    width: 26,
    height: 26,
  },
  loading: {
    marginTop: vScale(20),
  },
  image: {
    width: sWidth * 0.95,
    height: sHeight * 0.8,
    borderRadius: vScale(20),
  },
});
