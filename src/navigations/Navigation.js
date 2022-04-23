import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SmartStack from "./SmartStack";
import IndexStack from "./IndexStack";
import { Icon } from "react-native-elements";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="index"
        tabBarOptions={{
          inactiveTintColor: "black",
          activeTintColor: "#1cac84",
          activeBackgroundColor: "#1B3258",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenIcon(route, color),
        })}
      >
        <Tab.Screen
          name="index"
          component={IndexStack}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name="noticias"
          component={SmartStack}
          options={{ title: "Menú del día" }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileStack}
          options={{ title: "Perfil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenIcon(route, color) {
  let icono;
  switch (
    route.name //Indica la ruta en donde esta posicionado
  ) {
    case "index":
      icono = "home-outline";
      break;

    case "noticias":
      icono = "newspaper-variant-multiple-outline";
      break;

    case "profile":
      icono = "account-outline";
      break;
    default:
      break;
  }

  return (
    <Icon type="material-community" name={icono} size={24} color={color}></Icon>
  );
}
