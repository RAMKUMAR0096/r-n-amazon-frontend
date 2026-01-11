import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'
import { UserType } from '../context';
import axios from 'axios';
import SummaryApi from '../common';
import { useNavigation } from '@react-navigation/native';


const AddressScreen = () => {

  const [data, setData] = useState({
    name: "",
    mobile: "",
    houseNo: "",
    street: "",
    landmark: "",
    pincode: "",
  });

  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType)

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwtDecode(token)
    const userId = decodedToken?.userId;
    setUserId(userId);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  const handleOnChange = (name, value) => {

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubimt = () => {
    console.log("data",data)
    axios.post(SummaryApi.addAddress.url, { userId,address : data }).then((response) => {
      Alert.alert("Success", "Address added successfully");
      setData({
        name: "",
        mobile: "",
        houseNo: "",
        street: "",
        landmark: "",
        pincode: "",
      })

      setTimeout(()=>{
        navigation.goBack();
      },500)
    }).catch((error)=>{
      console.log(error)
      Alert.alert("Error","Failed to add address");
    })
  }
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 50, backgroundColor: "#00CED1" }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Add a new Address</Text>

          <Text style={{ width: 400, height: 1, backgroundColor: "#D0D0D0", margin: "auto", borderRadius: 20, marginTop: 15 }} />

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name (First and last name)</Text>
            <TextInput value={data?.name} onChangeText={(text) => handleOnChange("name", text)} placeholder='Enter your name' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Mobile number</Text>
            <TextInput value={data?.mobile} onChangeText={(text) => handleOnChange("mobile", text)} placeholder='Enter your mobile number' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Flat, House No, Building, Company</Text>
            <TextInput value={data?.houseNo} onChangeText={(text) => handleOnChange("houseNo", text)} placeholder='' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Area, Street, Village</Text>
            <TextInput value={data?.street} onChangeText={(text) => handleOnChange("street", text)} placeholder='' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
            <TextInput value={data?.landmark} onChangeText={(text) => handleOnChange("landmark", text)} placeholder='Eg near children park' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
            <TextInput value={data?.pincode} onChangeText={(text) => handleOnChange("pincode", text)} placeholder='Enter your pincode' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

          </View>
          <Pressable onPress={() => handleSubimt()} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 6, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})