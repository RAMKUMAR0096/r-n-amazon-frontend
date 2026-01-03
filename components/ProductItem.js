import { Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const ProductItem = ({data}) => {
  return (
    <Pressable style={{marginVertical:20,marginHorizontal:10}}>
        <Image source={{uri:data?.image}} style={{width:150,height:150,resizeMode:"contain"}}/>
        <Text numberOfLines={1} style={{width:150,marginTop:10}}>{data?.title}</Text>
        <View style={{marginTop:5,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text>{data?.price}</Text>
            <Text style={{color:"#ffce12",fontWeight:"bold",marginHorizontal:5}}>{data?.rating?.rate}+ ratings</Text>
        </View>

        <Pressable style={{backgroundColor:"#ffce12",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginHorizontal:10,marginTop:10}}>
            <Text>Add to Cart</Text>
        </Pressable>
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})