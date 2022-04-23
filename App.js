import 'react-native-gesture-handler';
import Navigation from './src/navigations/Navigation';
import React, { useEffect } from 'react';

export default function App() {
  console.disableYellowBox = true;
  return (
    <Navigation/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
