import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios'
import SummaryApi from '../common';
import { UserType } from '../context';
import Octicons from '@expo/vector-icons/Octicons';


const AddAddressScreen = () => {
    const navigation = useNavigation();

    const [address, setAddress] = useState([]);
    const { userId, setUserId } = useContext(UserType)

    const fetchAddress = async () => {
        try {
            const response = await axios.get(`${SummaryApi.getAddress.url}/${userId}`)
            
            const  addresses  = response.data.data;
            setAddress(addresses)


        } catch (error) {
            console.log(error.message)
            Alert.alert("Error", "Unable to get the address");
        }
    }
    useEffect(() => {
        fetchAddress();
    }, [])

    useFocusEffect(
        useCallback(()=>{
            fetchAddress();
        },[])
    )
    return (
        <SafeAreaView >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header />
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>
                    <Pressable onPress={() => navigation.navigate("Add")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderColor: "#D0D0D0", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingVertical: 7, paddingHorizontal: 10 }}>
                        <Text>Add Address</Text>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </Pressable>

                    <Pressable>
                        {address.map((item,index)=>(
                            <Pressable key={index} style={{borderWidth:1,borderColor:"#D0D0D0",padding:10,flexDirection:"column",gap:5,marginVertical:10}}>
                                <View style={{flexDirection:"row",alignItems:"center",gap:6}}>
                                    <Text style={{fontSize:15,fontWeight:"bold"}}>{item.name}</Text>
                                    <Octicons name="location" size={24} color="red" />
                                </View>
                                <Text style={{fontSize:15,color:"#181818"}}>{item?.houseNo} , {item?.landmark}</Text>
                                <Text style={{fontSize:15,color:"#181818"}}>{item?.street}</Text>
                                <Text style={{fontSize:15,color:"#181818"}}>Phone : {item?.mobile}</Text>
                                <Text style={{fontSize:15,color:"#181818"}}>Pincode : {item?.pincode}</Text>

                                <View style={{flexDirection:"row",alignItems:"center",gap:10,marginTop:7}}>
                                    <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0"}}>
                                        <Text>Edit</Text>
                                    </Pressable>
                                    <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0"}}>
                                        <Text>Delete</Text>
                                    </Pressable>
                                    <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0"}}>
                                        <Text>Set as default</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddAddressScreen

const styles = StyleSheet.create({})