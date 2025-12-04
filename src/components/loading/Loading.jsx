import styles from "./loading.module.css";
import Image from "next/image";

export default function Loading({ message = "Carregando pedidos..." }) {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingContent}>
                <div className={styles.cupContainer}>
                    <Image
                        src="/img/cappuccino.png"
                        alt="Loading"
                        width={150}
                        height={120}
                        className={styles.cupImage}
                    />
                    <div className={styles.steam}>
                        <span className={styles.steamParticle}></span>
                        <span className={styles.steamParticle}></span>
                        <span className={styles.steamParticle}></span>
                    </div>
                </div>
                <h2 className={styles.loadingText}>{message}</h2>
                <div className={styles.dots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
            </div>
        </div>
    );
}
