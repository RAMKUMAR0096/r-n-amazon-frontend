import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
const Header = () => {
    return (
        <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <Pressable style={{
                flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 38, flex: 1
            }}>
                <EvilIcons name="search" size={24} color="black" style={{ paddingLeft: 10 }} />
                <TextInput placeholder='Search amazon.in' />
            </Pressable>
            <Feather name="mic" size={24} color="black" />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})