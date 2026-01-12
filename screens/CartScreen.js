import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import Divider from '../components/Divider'
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { decrementQuantity, incrementQuantity, removeFromCart } from '../store/reducer/CartReducer'
import { useNavigation } from '@react-navigation/native'

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart)

    const navigation = useNavigation();

    const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
    
    const dispatch = useDispatch();

    const increaseQuantity =(item)=>{
        dispatch(incrementQuantity(item));
    }

    const decreaseQuantity =(item)=>{
        dispatch(decrementQuantity(item));
    }

    const deleteItem =(item)=>{
        dispatch(removeFromCart(item));
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <Header />

                <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
                </View>

                <Pressable onPress={()=>navigation.navigate("Confirm")} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 5, justifyContent: "center", alignItems: "center", marginHorizontal: 10, marginTop: 10 }}>
                    <Text>Proceed to Buy ({cart.length}) items</Text>
                </Pressable>

                <Divider />
                <View style={{ marginHorizontal: 10 }}>
                    {cart.map((item, index) => (
                        <View style={{ backgroundColor: "white", marginVertical: 10, borderBottomColor: "#F0F0F0", borderWidth: 2, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0 }} key={index}>
                            <Pressable style={{ marginVertical: 10, flexDirection: "row" }}>
                                <View>
                                    <Image style={{ width: 140, height: 140, resizeMode: "contain" }} source={{ uri: item?.image }} />
                                </View>
                                <View>
                                    <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
                                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>{item?.price}</Text>
                                    <Image
                                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                                        source={{
                                            uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                                        }}
                                    />
                                    <Text style={{ color: "green" }}>In Stock</Text>
                                    {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
                                </View>
                            </Pressable>

                            <Pressable
                                style={{
                                    marginTop: 15,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius: 7,
                                    }}
                                >
                                    {item?.quantity > 1 ? (
                                        <Pressable
                                            onPress={() => decreaseQuantity(item)}
                                            style={{
                                                backgroundColor: "#D8D8D8",
                                                padding: 7,
                                                borderTopLeftRadius: 6,
                                                borderBottomLeftRadius: 6,
                                            }}
                                        >
                                            <AntDesign name="minus" size={24} color="black" />
                                        </Pressable>
                                    ) : (
                                        <Pressable
                                            onPress={() => deleteItem(item)}
                                            style={{
                                                backgroundColor: "#D8D8D8",
                                                padding: 7,
                                                borderTopLeftRadius: 6,
                                                borderBottomLeftRadius: 6,
                                            }}
                                        >
                                            <AntDesign name="delete" size={24} color="black" />
                                        </Pressable>
                                    )}

                                    <Pressable
                                        style={{
                                            backgroundColor: "white",
                                            paddingHorizontal: 18,
                                            paddingVertical: 6,
                                        }}
                                    >
                                        <Text>{item?.quantity}</Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => increaseQuantity(item)}
                                        style={{
                                            backgroundColor: "#D8D8D8",
                                            padding: 7,
                                            borderTopLeftRadius: 6,
                                            borderBottomLeftRadius: 6,
                                        }}
                                    >
                                        <Feather name="plus" size={24} color="black" />
                                    </Pressable>
                                </View>
                                <Pressable
                                    onPress={() => deleteItem(item)}
                                    style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 8,
                                        paddingVertical: 10,
                                        borderRadius: 5,
                                        borderColor: "#C0C0C0",
                                        borderWidth: 0.6,
                                    }}
                                >
                                    <Text>Delete</Text>
                                </Pressable>
                            </Pressable>

                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    marginBottom: 15,
                                }}
                            >
                                <Pressable
                                    style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 8,
                                        paddingVertical: 10,
                                        borderRadius: 5,
                                        borderColor: "#C0C0C0",
                                        borderWidth: 0.6,
                                    }}
                                >
                                    <Text>Save For Later</Text>
                                </Pressable>

                                <Pressable
                                    style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 8,
                                        paddingVertical: 10,
                                        borderRadius: 5,
                                        borderColor: "#C0C0C0",
                                        borderWidth: 0.6,
                                    }}
                                >
                                    <Text>See More Like this</Text>
                                </Pressable>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({})