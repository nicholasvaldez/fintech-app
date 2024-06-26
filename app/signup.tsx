import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import React, { useState } from "react"
import { defaultStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"
import { Link, useRouter } from "expo-router"
import { useSignIn, useSignUp } from "@clerk/clerk-expo"

const Page = () => {
  const [countryCode, setCountryCode] = useState("+49")
  const [phoneNumber, setPhoneNumber] = useState("")
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0
  const router = useRouter()
  const { signUp } = useSignUp()
  const onSignUp = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      })
      router.push({
        pathname: "verify/[phone]",
        params: { phone: fullPhoneNumber },
      })
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
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
        <Link href={"/login"} asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignUp}
        >
          <Text style={defaultStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
})
export default Page
