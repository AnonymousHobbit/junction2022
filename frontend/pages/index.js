import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Map from '../components/Map';

const DEFAULT_CENTER = [60.19, 24.94]

export default function Home() {

  const locations = {
    hospital1: [60.19632640805835, 24.884204864501957],
    hospital2: [60.19880061755633, 24.90480422973633],
    hospital3: [60.20170117734748, 24.94205474853516],
  }

  return (
    <main>
      <Head>
        <title>GetRidOfIt</title>
      </Head>

      <div className={styles.container}>
        <Map coordinates={DEFAULT_CENTER} locations={locations} />
      </div>
    </main>
  )
}
