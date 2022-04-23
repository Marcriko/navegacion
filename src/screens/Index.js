import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import { firebaseApp } from '../utils/firebase';
import * as firebase from 'firebase';
import Login from './Login';
import Loading from '../components/Loading';
import Reportes from './Reportes';

export default function Index(props) {
  const {navigation} = props;
  const [login, setLogin] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      !user ? setLogin(false) : setLogin(true)
    })
  }, [])

  if(login === null) return <Loading/>
  
  if(login){
    return (
      <View>
       <Reportes/>
      </View>
    )
  }else{
    return(
      <Login/>
    )
  }

}

const styles = StyleSheet.create({})