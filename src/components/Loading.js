import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import {Overlay} from 'react-native-elements'

export default function Loading(props) {
    const {isVisible, text} = props;
  return (
    <Overlay 
    isVisible={isVisible}
    windowBackgroundColor="rgba(0,0,0,0.5)"
    overlayBakgroundColor="trasparent"
    overlayStyle={styles.overlay}>
        <View style={styles.view}>
            <ActivityIndicator size={"large"} color="#dedede"/>
            <Text style={styles.text}>{text}</Text>
        </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay:{
        height:100,
        width:200,
        backgroundColor:"#fff",
        borderColor:"#fcb823",
        borderWidth:3,
        borderRadius:10
    },
    view:{
        flex:100,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"#5d5e60",
        textTransform:"uppercase",
        marginTop:10
    }
})