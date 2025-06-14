import Head from 'next/head'
import { ProductCalculator } from '../components/ProductCalculator'

export default function Home() {
  return (
    <>
      <Head>
        <title>CAM | Cam ve Ayna Fiyat Hesaplama</title>
      </Head>
      <main>
        <h1>CAM Fiyat Hesaplama</h1>
        <ProductCalculator />
      </main>
    </>
  )
}