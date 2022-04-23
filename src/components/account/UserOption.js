import { StyleSheet, Text, View } from "react-native";
import React, { useState,useEffect } from "react";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
3;
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";

export default function UserOption(props) {
  const { userInfo, toastRef } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  useEffect(() => {
    
  },[])

  const selectComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
          />
        );
        setShowModal(true);
        break;
      // case "email":
      //   setRenderComponent(<Text>Cambiar email</Text>);
      //   setShowModal(true);
      //   break;
      // case "password":
      //   setRenderComponent(<Text>Cambiar contraseña</Text>);
      //   setShowModal(true);
      //   break;
      default:
        break;
    }
  };

  const menuOption = generateOptions(selectComponent);
  // console.log(menuOption);
  return (
    <View style={styles.container}>
      {map(menuOption, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameL,
            color: menu.iconColor,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameR,
            color: menu.iconColor,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}
function generateOptions(selectComponent) {
  return [
    {
      title: "Cambiar Nombre",
      iconType: "material-community",
      iconNameL: "account-circle",
      iconColor: "#1cac84",
      iconNameR: "chevron-right",
      onPress: () => selectComponent("displayName"),
    },
    // {
    //   title: "cambiar email",
    //   iconType: "material-community",
    //   iconNameL: "at",
    //   iconColor: "#1cac84",
    //   iconNameR: "chevron-right",
    //   onPress: () => selectComponent("email"),
    // },
    // {
    //   title: "cambiar contraseña",
    //   iconType: "material-community",
    //   iconNameL: "lock-reset",
    //   iconColor: "#1cac84",
    //   iconNameR: "chevron-right",
    //   onPress: () => selectComponent("password"),
    // },
  ];
}
const styles = StyleSheet.create({
  menuItem: {
    borderWidth: 1,
    borderColor: "#1b3258",
    borderRadius: 10,
    maxHeight: 57,
  },
  container: {
    width: "90%",
    marginTop: 10,
  },
});
