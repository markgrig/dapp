
import { FC, ReactNode, MouseEventHandler } from 'react'
import styles from './Button.module.scss'
import Image, { StaticImageData } from 'next/image'
import { useMemo, useState, useLayoutEffect } from 'react'

type ButtonProps = {
    children?: ReactNode,
    leftLogo: StaticImageData,
    rightLogo: StaticImageData,
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<ButtonProps> = (
    {
        children,
        leftLogo,
        rightLogo,
        onClick,
    }) => {

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const handleSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        handleSize()
        window.addEventListener("resize", handleSize);
        return () => window.removeEventListener("resize", handleSize);
    }, [])

    function getContent() {
        if (windowSize.width === 0) return children
        if (windowSize.width <= 700) return (
            <div className={styles.content}>
                <Image
                    className={styles.ico}
                    src={leftLogo}
                    alt="Not loaded" />
                {children}
                <Image
                    className={styles.ico}
                    src={rightLogo}
                    alt="Not loaded" />
            </div>
        )
        return children
    }
    const content = useMemo(() => getContent(), [windowSize.width, children])

    return (
        <button className={styles.button}
            onClick={onClick}>
            {content}
        </button>
    )
}

export default Button