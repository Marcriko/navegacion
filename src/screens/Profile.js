import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import UserInfo from "../components/account/UserInfo";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";
import UserOption from "../components/account/UserOption";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile(props) {
  const {} = props;
  const navegacion = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [login, setLogin] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
  }, []);
  if (login === null) return <Loading />;
  if (login) {
    return (
      <View style={styles.userInfo}>
        {userInfo && (
          <UserInfo
            userInfo={userInfo}
            toastRef={toastRef}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        )}
        <UserOption userInfo={userInfo} toastRef={toastRef} />
        <View style={styles.containerButtons}>
          <View style={styles.btnReportes}>
            <Icon
              type="material-community"
              name="text-box-search-outline"
              iconStyle={styles.icon}
            />
            <TouchableOpacity>
              <Text
                style={styles.textReportes}
                onPress={() => navegacion.navigate("listReportes")}
              >
                Ver incidencias
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnReportes}>
            <Icon
              type="material-community"
              name="note-plus-outline"
              iconStyle={styles.icon}
            />
            <TouchableOpacity>
              <Text
                style={styles.textReportes}
                onPress={() => navegacion.navigate("agregarNoticia")}
              >
                Agregar Platillos
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Cerrar Sesión"
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.btnTitle}
          onPress={() => {
            firebase.auth().signOut();
            navegacion.navigate("index");
          }}
        />
        <Toast ref={toastRef} position="center" opacity={0.9} />
        <Loading isVisible={loading} text={loadingText} />
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../../assets/buffet.jpeg")}
        />
        <TouchableOpacity style={styles.btnContainer}>
          <Text
            style={styles.btnText}
            onPress={() => navegacion.navigate("index")}
          >
            Debes Iniciar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#1b3258",
    marginTop: 100,
    padding: 5,
    paddingHorizontal: 15,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  userInfo: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
  },
  btnCloseSession: {
    marginTop: 40,
    backgroundColor: "#1b3258",
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 30,
  },
  btnTitle: {
    color: "#fff",
  },
  logo: {
    marginTop: 30,
  },
  btnReportes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    borderWidth: 1,
    borderColor: "#1b3258",
    marginTop: 5,
    borderRadius: 10,
    paddingVertical: "3%",
  },
  textReportes: {
    fontSize: 16,
    textAlign: "center",
    marginRight: "5%",
  },
  icon: {
    color: "#1cac84",
    alignItems: "flex-start",
    marginLeft: 15,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent:"space-evenly",
    marginHorizontal:30
  },
});
