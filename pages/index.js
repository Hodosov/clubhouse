import { WelcomeStep } from '../components/steps/WelcomeStep'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container} >
      <WelcomeStep />
    </div>
  )
}
