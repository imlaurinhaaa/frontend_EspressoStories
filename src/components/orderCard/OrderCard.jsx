import styles from "./orderCard.module.css";

export default function OrderCard({
    productImage,
    productName,
    orderNumber,
    orderClient,
    productQuantity,
    orderPrice,
    paymentMethod,
    
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

            <p className={styles.paymentMethod}>
                PAGAMENTO - {paymentMethod.toUpperCase()}
            </p>

            <h3 className={styles.orderPrice}>R${orderPrice}</h3>

            <div className={styles.cardButton}>
                <button className={`${styles.actionButton} ${styles.acceptButton}`}>
                    PREPARAR
                </button>
            </div>
        </div>
    );
}
