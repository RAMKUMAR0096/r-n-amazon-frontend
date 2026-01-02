import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import SummaryApi from '../common';

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()

  const handleRegister = () => {
  try {
    const user = {
      name,
      email,
      password,
    };

    axios
      .post(SummaryApi.register.url, user)  
      .then((response) => {
        Alert.alert("Registration Successful", "You have registered successfully");
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log("registration failed", error.response?.data || error.message);
        Alert.alert(
          "Registration Failed",
          "Something went wrong"
        );
      });
  } catch (error) {
    console.log("error", error);
  }
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
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
          <Text style={{ fontSize: 19, fontWeight: "bold", marginTop: 12, color: "041e42" }}>Create Account</Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <Ionicons style={{ marginLeft: 8 }} name="person" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10, width: 300, fontSize: name ? 16 : 16
              }}
              placeholder='enter your name'
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
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
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder='enter your password' />
          </View>
        </View>

        {/* <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 2 }}>
          <Text>Keep me logged in</Text>

          <Text style={{ color: "#007FFF", fontWeight: "500" }}>Forgot Password ?</Text>
        </View> */}

        <View style={{ marginTop: 70 }} />

        <Pressable onPress={handleRegister} style={{ fontWeight: "bold", fontSize: 16, width: 200, backgroundColor: "#FEBE10", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
          <Text style={{ fontWeight: "bold", textAlign: "center", color: "white", fontSize: 15 }}>Register</Text>
        </Pressable>

        <Pressable style={{ marginTop: 15 }} onPress={() => { navigation.goBack() }}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>Already have an account ? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})