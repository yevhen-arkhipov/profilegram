import { View, Image, StyleSheet } from 'react-native';

const CurrentProfileBtn = () => {
  return (
    <View style={st.btnCont}>
      <Image source={require('../assets/icon/profileWhiteIcon.png')} />
    </View>
  );
};

const st = StyleSheet.create({
  btnCont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#FF6C00',
    borderRadius: 20,
  },
});

export default CurrentProfileBtn;
