
"use client";
import { FC } from 'react'
import styles from './Elipse.module.scss'

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
    return (
        <div
            className={styles.elipse}
            style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                bottom: `${bottom}%`,
                left: `${left}%`,
                backgroundColor: color,
                boxShadow: `0px 0px 160px 160px ${color}`
            }}>
        </div>
    )
}

export default Elipse