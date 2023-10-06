import Elipse from "../Elipse";
import styles from "./Background.module.scss";
import { FC, useState } from "react";
import { motion } from 'framer-motion'

type ContactsProps = {
  firstColor: string,
  secondColor: string,
};

const Background: FC<ContactsProps> = ({
  firstColor,
  secondColor
}) => {
  const [y] = useState(getRundomNumber(20));
  const [x] = useState(getRundomNumber(50));
  const [time] = useState(Math.abs(getRundomNumber(30)));

  function getRundomNumber(N: number) {
    let a = Math.random()
    a > 0.5 ? a = -1 : a = 1;
    return a * Math.floor(Math.random() * N)
  }

  return (
    <motion.div className={styles.background}
      transition={{
        ease: "easeOut",
        duration: 10 + time,
        repeat: Infinity
      }}
      animate={
        {
          translateX: [0, x, -x, 0, x, -x, 0],
          translateY: [0, y, -y, 0, x, -x, 0]
        }
      }>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={firstColor}
          rotateX={-22}
          rotateY={-30}
          bottom={0}
          left={25} />
      </div>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={secondColor}
          rotateX={202}
          rotateY={30}
          bottom={0}
          left={25} />
      </div>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={secondColor}
          rotateX={202}
          rotateY={-30}
          bottom={30}
          left={15} />
      </div>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={firstColor}
          rotateX={22}
          rotateY={-30}
          bottom={30}
          left={25} />
      </div>
    </motion.div>
  )
};

export default Background;
