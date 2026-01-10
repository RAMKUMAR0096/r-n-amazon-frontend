import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';


const AddAddressScreen = () => {
    const navigation = useNavigation();
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

                    <Pressable></Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddAddressScreen

const styles = StyleSheet.create({})