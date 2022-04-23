import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useRef} from 'react'
import RegisterForm from '../components/account/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast';

export default function Register() {
  const toastRef = useRef();
  //console.log(toastRef);
  return (
    <KeyboardAwareScrollView>
        <Image
        style={styles.logo}
        resizeMode="contain"
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png",
        }}
      />
      <View style={styles.viewForm}>
          <RegisterForm toastRef={toastRef}/>
          
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 200,
        alignSelf: "center",
    },
    viewForm:{
        marginHorizontal:40,

    }
})