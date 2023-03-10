import styles from '@/styles/components/Countdown.module.css'
import { useEffect, useState } from 'react'

let countdownTimeout: NodeJS.Timeout
// const defaultInitialTime = 25 * 60
const defaultInitialTime = 0.05 * 60

export function Countdown () {
  const [time, setTime] = useState(defaultInitialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown () {
    setIsActive(true)
  }
  function resetCountdown () {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(defaultInitialTime)
  }

  useEffect(
    () => {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(
          () => { setTime(time - 1) },
          1000
        )
      } else if (isActive && time === 0) {
        setHasFinished(true)
        setIsActive(false)
      }
    },
    [isActive, time]
  )

  return (
    <>
      <div>
        <div className={styles.countdown}>
          <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
          </div>
          <span>:</span>
          <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
          </div>
        </div>

        {
          /* TODO: make separated buttons */
          hasFinished ?
            (
              <button
                disabled
                className={styles.startCycleButton}
              >
                Ciclo encerrado
              </button>
            ) :
            (
              isActive ? (
                <button
                  type="button"
                  className={`${styles.startCycleButton} ${styles.startCycleButtonActive}`}
                  onClick={resetCountdown}
                >
                  Abandonar ciclo
                </button>
              ) :
                (
                  <button
                    type="button"
                    className={styles.startCycleButton}
                    onClick={startCountdown}
                  >
                    Iniciar um ciclo
                  </button>
                )
            )
        }
      </div>
    </>
  )
}
