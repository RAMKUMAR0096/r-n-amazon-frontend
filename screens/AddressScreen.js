import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddressScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height:50,backgroundColor:"#00CED1"}}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})