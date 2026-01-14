import { StyleSheet, Text, View, Image, SafeAreaViewBase, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import SummaryApi from '../common';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigation = useNavigation()

  const handleLogin = ()=>{
    const user ={
      email : email,
      password : password
    }

    try {
      axios.post(SummaryApi.login.url,user).then((response)=>{
        const token = response.data.data;
        AsyncStorage.setItem("authToken",token);
        navigation.replace('Main');

      }).catch((error)=>{
        Alert.alert("Login Error","Invalid Login")

      })
    } catch (error) {
      Alert.alert("Something went wrong","Please Relogin")
      navigation.navigate('login')
    }
  }

  useEffect(()=>{
    const checkLoginStatus = async ()=>{
      try {
        const token = await AsyncStorage.getItem("authToken")

        if(token){
          navigation.replace('Main')
        }
      } catch (error) {
        console.log("Error",error)
      }
    };
    checkLoginStatus();
  },[])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center"}}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 19, fontWeight: "bold", marginTop: 12, color: "041e42" }}>Login to your Account</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10, width: 300, fontSize: email ? 16 : 16
              }}
              placeholder='enter your email'
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <FontAwesome style={{ marginLeft: 8 }} name="lock" size={24} color="gray" />

            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder='enter your password' />
          </View>
        </View>
        <View style={{marginTop:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:2}}>
          <Text>Keep me logged in</Text>

          <Text style={{color:"#007FFF",fontWeight:"500"}}>Forgot Password ?</Text>
        </View>

        <View style={{marginTop:80}} />

        <Pressable onPress={handleLogin} style={{fontWeight:"bold",fontSize:16,width:200 ,backgroundColor:"#FEBE10",borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15}}>
          <Text style={{fontWeight:"bold",textAlign:"center",color:"white",fontSize:15}}>Login</Text>
        </Pressable>

        <Pressable style={{marginTop:15}} onPress={()=>{navigation.navigate("Register")}}>
          <Text style={{textAlign:"center",color:"gray",fontSize:16}}>Don't have an account ? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})