import '../styles/globals.css'
import { Caramel } from '@next/font/google'
import { Provider } from 'react-redux';
import { store } from '../app/store';

const caramel = Caramel({ 
  subsets: ['latin'],
  weight: ['400'] 
})


export default function App({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <main className={caramel.className}>
        <Component {...pageProps} />
    </main>
  </Provider>)
}
