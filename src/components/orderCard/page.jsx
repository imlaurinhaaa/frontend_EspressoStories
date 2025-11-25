import styles from './orderCard.module.css';
import Image from 'next/image';

export default function OrderCard({ cardImage, orderName, orderNumber, orderClient, orderQtde, orderPrice }) {
    return (
        <div className={styles.card}>
            <Image
                className={styles.cardImage}
                src={cardImage || "/img/paoDeQueijo.png"}
                alt={orderName}
                width={160}
                height={140}
            />
            <h2 className={styles.orderName}>
                {orderName}
            </h2>
            <p className={styles.orderNumber}>
                PEDIDO {orderNumber}
            </p>
            <p className={styles.orderClient}>CLIENTE - {orderClient}</p>
            <div className={styles.cardDiv}>
                <p className={styles.orderQtde}>QUANTIDADE</p>
                <div className={styles.circle}>
                    {orderQtde}
                </div>
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