import Elipse from "../Elipse";
import styles from "./Background.module.scss";
import { FC } from "react";

type ContactsProps = {
  firstColor: string,
  secondColor: string,
};

const Background: FC<ContactsProps> = ({
  firstColor,
  secondColor
}) => {
  return (
    <div className={styles.background}>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={firstColor}
          rotateX={-22}
          rotateY={-30}
          bottom={45}
          left={50} />
      </div>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={secondColor}
          rotateX={202}
          rotateY={30}
          bottom={45}
          left={15} />
      </div>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={secondColor}
          rotateX={22}
          rotateY={-30}
          bottom={75}
          left={50} />
      </div>
      <div className={styles['elipse-wrapper']}>
        <Elipse
          color={firstColor}
          rotateX={202}
          rotateY={-30}
          bottom={75}
          left={15} />
      </div>
    </div>
  )
};

export default Background;
