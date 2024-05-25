import { View, Text, StyleSheet, TextInput } from "react-native"
import React, { useState } from "react"
import { defaultStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"

const Page = () => {
  const [countryCode, setCountryCode] = useState("+49")
  const [phoneNumber, setPhoneNumber] = useState("")
  const onSignUp = async () => {}
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let's get started!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number and we will send you a confirmation code.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Country code"
          placeholderTextColor={Colors.gray}
          value={countryCode}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Mobile number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholderTextColor={Colors.gray}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 22,
    marginRight: 10,
  },
})
export default Page
