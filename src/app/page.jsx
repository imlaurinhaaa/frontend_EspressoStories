import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className={styles.logo}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.posterContainer}>
          <Image
            src="/img/poster.png"
            alt="Poster"
            width={800}
            height={900}
            style={{
              width: '70%',
              height: 'auto'
            }}
            className={styles.posterImage}
          />
        </div>
        <div className={styles.formContainer}></div>
      </div>
    </div>
  );
}
