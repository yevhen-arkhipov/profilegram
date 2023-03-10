import { View, Image, StyleSheet } from 'react-native';

const CreateBtn = () => {
  return (
    <View style={st.btnCont}>
      <Image source={require('../assets/icon/creatWhiteIcon.png')} />
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

export default CreateBtn;
