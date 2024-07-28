import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyList = ({title, subtitle}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 200 }}>
      <Text style={{ fontSize: 36 }}>{title}</Text>
      <Text style={{ fontSize: 24, color: "gray" }}>{subtitle}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})