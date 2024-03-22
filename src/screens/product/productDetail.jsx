//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {screenStyle} from '../../styles/secreenStyle';
import Button from '../../components/uı/button';
import {height, width} from '../../utils/constant';
import {AppColors} from '../../theme/color';
import Counter from '../../components/uı/counter';
import {getRequest} from '../../service/verbs';
import {PRODUCTS_URL} from '../../service/url';
import Spinner from '../../components/uı/spinner';
import {Heart, Star} from 'iconsax-react-native';

// create a component
const ProductDetail = ({route}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const {item} = route?.params;
  getProductDetail = () => {
    setLoading(true);
    getRequest(PRODUCTS_URL + `/${item.id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={screenStyle.container}>
        {loading ? (
          <Spinner />
        ) : (
          <ScrollView>
            <View>
              <Image
                style={{
                  width: width,
                  height: width * 0.5,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: item.image,
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 3, marginVertical: 20}}>
                  <Text
                    numberOfLines={2}
                    style={{fontWeight: '700', fontSize: 20}}>
                    {product?.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      marginVertical: 20,
                      color: AppColors.GRAY,
                    }}>
                    {product?.category.toUpperCase()}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontWeight: '700',
                      fontSize: 20,
                      marginVertical: 5,
                    }}>
                    ${product?.price}
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Star color={AppColors.PRIMARY} variant="Bold" size={25} />
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 18,
                        marginHorizontal: 5,
                      }}>
                      {product?.rating?.rate} / {product?.rating?.count}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    padding: 5,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: AppColors.SOFTGRAY,
                      padding: 5,
                      borderRadius: 100,
                    }}>
                    <Heart size={30} color={AppColors.RED} variant="Bold" />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 18,
                    marginVertical: 5,
                    color: AppColors.BLACK,
                  }}>
                  {product?.description}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: height * 0.1,
          width: width,
          backgroundColor: AppColors.WHITE,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: AppColors.SOFTGRAY,
        }}>
        <View style={{flex: 1, marginRight: 5}}>
          <Counter onChange={value => console.warn(value)} />
        </View>
        <View style={{flex: 2}}>
          <Button title={'Sepete Ekle'} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProductDetail;
