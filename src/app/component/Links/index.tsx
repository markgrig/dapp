import styles from './Links.module.scss'
import { FC } from 'react'
import { v4 as uuidv4 } from 'uuid';

export type link = {
  url?: string,
  text: string,
}

type LinksProps = {
  elements: Array<link>
}


const Links: FC<LinksProps> = (
  {
    elements,
  }) => {
  return (
    <ul className={styles.links}>
      {elements.map((el) =>
        <li key={uuidv4()}> {el.text}</li>
      )
      }
    </ul>
  )
}

export default Links