import '../styles/globals.css'
import { Caramel } from '@next/font/google'

const caramel = Caramel({ 
  subsets: ['latin'],
  weight: ['400'] 
})


export default function App({ Component, pageProps }) {
  return (
  <main className={caramel.className}>
      <Component {...pageProps} />
  </main>)
}
