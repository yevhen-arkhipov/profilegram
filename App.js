import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import Main from './components/Main';

const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
