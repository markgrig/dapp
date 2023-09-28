import Image from "next/image";
import styles from "./Contacts.module.scss";
import { FC } from "react";
import { StaticImageData } from "next/image";
import { v4 as uuidv4 } from "uuid";

export type contact = {
  src: StaticImageData;
};

type ContactsProps = {
  elements: Array<contact>;
};

const Contacts: FC<ContactsProps> = ({ elements }) => {
  return (
    <div>
      <div className={styles.contacts}>
        {elements.map((el) => (
          <Image
            className={styles.logo}
            src={el.src}
            alt="Not loaded"
            key={uuidv4()}
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
