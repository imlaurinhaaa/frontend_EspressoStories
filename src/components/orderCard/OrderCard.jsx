import styles from "./orderCard.module.css";
import Image from "next/image";

export default function OrderCard({
    productImage,
    productName,
    orderNumber,
    orderClient,
    productQuantity,
    orderPrice,
}) {
    return (
        <div className={styles.card}>
            <img
                className={styles.cardImage}
                src={productImage}
                alt={productName}
                width={160}
                height={140}
            />
            <h2 className={styles.orderName}>{productName}</h2>
            <p className={styles.orderNumber}>PEDIDO - {orderNumber}</p>
            <p className={styles.orderClient}>
                CLIENTE - {orderClient.toUpperCase()}
            </p>
            <div className={styles.cardDiv}>
                <p className={styles.orderQtde}>QUANTIDADE</p>
                <div className={styles.circle}>{productQuantity}</div>
            </div>
            <h3 className={styles.orderPrice}>R${orderPrice}</h3>

            <div className={styles.cardButtons}>
                <button className={`${styles.actionButton} ${styles.acceptButton}`}>
                    PREPARAR
                </button>
                <button className={`${styles.actionButton} ${styles.rejectButton}`}>
                    RECUSAR
                </button>
            </div>
        </div>
    );
}
