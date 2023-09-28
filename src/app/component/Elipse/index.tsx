
"use client";
import { FC } from 'react'
import styles from './Elipse.module.scss'
import { motion } from 'framer-motion'

type ElipseProps = {
    color: string,
    rotateX: number,
    rotateY: number,
    bottom: number,
    left: number,
}

const Elipse: FC<ElipseProps> = ({
    color,
    rotateX,
    rotateY,
    bottom,
    left
}) => {

    const y = getRundomNumber(50);
    const x = getRundomNumber(100);
    const time = Math.abs(getRundomNumber(30));

    function getRundomNumber(N: number) {
        let a = Math.random()
        a > 0.5 ? a = -1 : a = 1;
        return a * Math.floor(Math.random() * N)
    }

    return (
        <motion.div
            className={styles.elipse}
            style={{
                rotateX: `${rotateX}deg`,
                rotateY: `${rotateY}deg`,
                bottom: `${bottom}%`,
                left: `${left}%`,
                backgroundColor: color,
                boxShadow: `0px 0px 100px 110px ${color}`
            }}
            transition={{
                ease: 'linear',
                duration: 10 + time,
                repeat: Infinity
            }}
            animate={
                {
                    translateX: [0, x, -x, 0],
                    translateY: [0, y, -y, 0]
                }
            }>
        </motion.div>
    )
}

export default Elipse