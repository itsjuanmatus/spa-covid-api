import '../styles/globals.css'
import { AppProps } from 'next/app'
import Navbar from '../components/Layout/Navbar'
import 'regenerator-runtime/runtime';

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
    <Navbar />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
