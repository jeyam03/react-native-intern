import React, { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { useTheme } from '../ThemeProvider';
import RazorpayCheckout from 'react-native-razorpay';
import { MD3DarkTheme } from "react-native-paper";

const RazorpayScreen = ({ }) => {
  const { paperTheme } = useTheme();
  const textColor = paperTheme === MD3DarkTheme ? 'lightgray' : 'dimgray'

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.background, padding: 24, alignItems: 'center' }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 72 }}>
        <Text style={{
          color: textColor,
          fontSize: 24,
          fontWeight: 'bold'
        }}>
          Payment Gateway </Text>
        <Icon name="credit-card-outline" size={32} color={textColor} />
      </View>

      <InputComponent
        title="Enter Name"
        placeholder="John Doe"
        keyboardType="default"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />

      <InputComponent
        title="Contact Number"
        placeholder="9876543210"
        keyboardType="numeric"
        value={contact}
        onChangeText={(text) => {
          setContact(text);
        }}
      />

      <InputComponent
        title="Email ID"
        placeholder="johndoe@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />

      <InputComponent
        title="Amount"
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          setAmount(text);
        }}
      />


      <TouchableOpacity onPress={() => {
        var options = {
          description: 'Annual subscription',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDZEl_ySPdqSViiXQ_vI6kA0X8ukrEIFPrg&usqp=CAU',
          currency: 'INR',
          key: 'rzp_test_wH6FaE7zkaF2xJ',
          amount: amount * 100,
          name: 'Internship',
          prefill: {
            email: email,
            contact: contact,
            name: name
          },
          theme: { color: '#6750A4' }
        }
        RazorpayCheckout.open(options).then((data) => {
          alert(`Payment Successful: ${data.razorpay_payment_id}`);
        }).catch((error) => {
          alert(`Error: ${error.code} | ${error.description}`);
        });
      }}
        style={{
          backgroundColor: paperTheme.colors.primaryContainer,
          padding: 12,
          borderRadius: 12,
          margin: 10,
          marginTop: 24,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8
        }}
      >
        <Icon name="credit-card" size={28} color={paperTheme.colors.primary} />
        <Text style={{
          color: paperTheme.colors.primary,
          fontSize: 18,
          fontWeight: '500'
        }}>
          Pay Now</Text>
      </TouchableOpacity>

    </View>
  );
};


const InputComponent = ({ title, value, onChangeText, placeholder, keyboardType }) => {
  const { paperTheme } = useTheme();
  const textColor = paperTheme === MD3DarkTheme ? 'lightgray' : 'dimgray'

  return (
    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{
        color: textColor,
        fontSize: 16,
        fontWeight: 'semibold',
        margin: 10,
        width: 125,
      }}>
        {title}
      </Text>

      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        value={value}
        style={{
          borderWidth: 2,
          borderColor: paperTheme.colors.secondary,
          borderRadius: 12,
          margin: 10,
          padding: 12,
          width: 200,
          color: textColor
        }}
      />

    </View>
  );
}

export default RazorpayScreen;