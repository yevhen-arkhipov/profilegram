import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegistrationScreen } from './Screens/auth';
import { Home } from './Screens/main';

const AuthStack = createStackNavigator();

const useRoute = isAuth => {
  if (isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Home">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
  );
};

export default useRoute;
