import styles from "./error.module.css";
import Image from "next/image";

export default function ErrorMessage({ message = "Erro ao carregar pedidos!"}) {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <h2 className={styles.errorTitle}>Oops!</h2>
                <p className={styles.errorText}>{message}</p>
            </div>
        </div>
    );
}
