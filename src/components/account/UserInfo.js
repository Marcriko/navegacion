import { StyleSheet, Text, View } from "react-native";
import React,{useEffect,useState} from "react";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";

export default function UserInfo(props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    setLoading,
    setLoadingText,
  } = props;
  const [name, setName] = useState("")
  const changeAvatar = async () => {
    // console.log("ChangeAvatar")
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA);
    console.log(resultPermission);
    const resultPermissionCamera = resultPermission.permissions.camera.status;
    if (resultPermissionCamera == "denied") {
      toastRef.current.show("Es necesario otorgar permisos!!");
    } else {
      toastRef.current.show("OK");
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      // console.log(result);
      if (result.cancelled) {
        toastRef.current.show("Has cancelado la operación!!");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoURL();
            toastRef.current.show("Imagen subida");
          })
          .catch(() => {
            toastRef.current.show("Error al subir la imagen");
          });
      }
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText("Cargando imagen");
    setLoading(true);
    // console.log(uri);
    const response = await fetch(uri);
    // console.log(JSON.stringify(response));
    const blob = await response.blob();
    // console.log(JSON.stringify(blob));
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoURL = () => {
    setLoadingText("Actualizando avatar");
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        // console.log(response);
        const update = {
          photoURL: response,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setLoading(false);
        console.log("imagen actualizada");
      })
      .catch(() => {
        setLoading(false);
        toastRef.current.show("Error al actualizar la imagen !!");
      });
  };
  useEffect(()=> {
  
  },[name])
  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        onEditPress={() => changeAvatar()}
        rounded
        size="large"
        showEditButton
        containerStyle={styles.userAvatar}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/avatar-default.jpg")
        }
      />
      <View>
        <Text style={styles.userName}>
          {name ? displayName : "Anónimo"}
        </Text>
        <Text style={styles.userDates}>{email ? email : "Invitado"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    padding: 15,
    borderWidth: 2,
    borderColor: "#1b3258",
  },
  userAvatar: {
    marginRight: 20,
  },
  userName: {
    fontWeight: "bold",
    paddingBottom: 5,
    color: "black",
    fontSize: 16,
  },
  userDates: {
    color: "black",
    marginRight: 15,
    fontSize: 16,
  },
});
