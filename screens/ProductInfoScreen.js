import {  Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/reducer/CartReducer';

const ProductInfoScreen = () => {

    const route=useRoute();
    const {width}=Dimensions.get("window");
    const height = (width*100) /100;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [addedToCart,setAddedTocart] = useState(false)

    const addItemToCart =(item)=>{
        setAddedTocart(true)
        dispatch(addToCart(item));
        setAddedTocart(false)
    }
    const cart = useSelector((state)=>state.cart.cart);
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:55,flex:1,backgroundColor:"white",marginBottom:35}}>
        <Header />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {route?.params?.carouselImages?.map((item,index)=>(
                <ImageBackground style={{width,height,marginTop:25,resizeMode: "contain"}} source={{uri : item}} key={index}>
                    <View style={{flexDirection:"row",padding:"10",alignItems:"center",justifyContent:"space-between"}}>
                        <View style={{margin:10,width:40,height:40,borderRadius:40,backgroundColor:"#C60C30",justifyContent:'center',alignItems:"center", flexDirection:"row"}}>
                            <Text style={{textAlign:"center",color:"white",fontWeight:"600",fontSize:12}}>20% off</Text>
                        </View>
                        <View style={{margin:10,width:40,height:40,borderRadius:20,backgroundColor:"#E0E0E0",justifyContent:'center',alignItems:"center", flexDirection:"row"}}>
                            <AntDesign name="share-alt" size={24} color="black" />
                        </View>
                    </View>
                    <View style={{margin:10,width:40,height:40,borderRadius:20,backgroundColor:"#E0E0E0",justifyContent:'center',alignItems:"center", flexDirection:"row",marginTop:"auto",marginLeft:10,marginBottom:20,marginLeft:20}}>
                        <FontAwesome5 name="heart" size={24} color="black" />
                    </View>
                </ImageBackground>
            ))}
        </ScrollView>
        <View style={{padding:10}}>
            <Text style={{fontSize:15,fontWeight:"500"}}>{route?.params?.title}</Text>
            <Text style={{fontSize:18,fontWeight:"600",marginTop:6}}>₹{route?.params?.price}</Text>
        </View>
         <Text style={{ width: 400, height: 1, backgroundColor: "#D0D0D0", margin: "auto", borderRadius: 20, marginTop: 15 }} />

        <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
            <Text>Color: </Text>
            <Text style={{fontSize:15,fontWeight:"bold"}}>{route?.params?.color}</Text>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
            <Text>Size: </Text>
            <Text style={{fontSize:15,fontWeight:"bold"}}>{route?.params?.size}</Text>
        </View>

        <Text style={{ width: 400, height: 1, backgroundColor: "#D0D0D0", margin: "auto", borderRadius: 20, marginTop: 15 }} />
        <View style={{padding:10}}>
            <Text style={{fontSize:15,fontWeight:"bold",marginVertical:10}}>Total : ₹{route?.params?.price}</Text>
            <Text style={{color:"#00CED1"}}>Free Delivery Tommorrow by 3 PM. Order within 10hrs 30 mins</Text>

            <View style={{flexDirection:"row",alignItems:"center",marginVertical:10,gap:5}}>
                <Ionicons name="location" size={24} color="black" />
                <Text style={{fontSize:15,fontWeight:"500"}}>Delivered to Ram - Bangalore 627755</Text>
            </View>
        </View>

        <Text style={{color:"green",fontWeight:"500",fontSize:14,marginHorizontal:20,paddingBottom:10}}>In Stock</Text>

        <Pressable onPress={()=>addItemToCart(route?.params?.item)} style={{backgroundColor:"#FFC72C",padding:10,borderRadius:20,alignItems:"center",justifyContent:"center",marginHorizontal:10,marginVertical:10}}>
            <Text>Add to Cart</Text>
        </Pressable>

        <Pressable style={{backgroundColor:"#FFAC1C",padding:10,borderRadius:20,alignItems:"center",justifyContent:"center",marginHorizontal:10,marginVertical:10}}>
            <Text>Buy Now</Text>
        </Pressable>

    </ScrollView>
  )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})