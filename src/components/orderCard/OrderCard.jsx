import styles from './orderCard.module.css';
import Image from 'next/image';

export default function OrderCard({ order }) {

    if (!order) {
        return <p>Erro: Dados do pedido não encontrados.</p>;
    }

    const getOrderProductPhoto = () => {
        if (!order || !order.order_product_photo) return "/img/logo.png";

        const filename = order.order_product_photo;

        if (filename.includes(".")) {
            return `http://localhost:4000/uploads/${filename}`;
        }

        return `http://localhost:4000/uploads/${filename}.jpg`;
    };

    return (
        <div className={styles.card}>
            <Image
                className={styles.cardImage}
                src={getOrderProductPhoto()}
                alt={order.order_product_name || 'Produto'}
                width={160}
                height={140}
            />
            <h2 className={styles.orderName}>
                {order.order_product_name || 'Nome do Produto'}
            </h2>
            <p className={styles.orderNumber}>
                PEDIDO - {order.order_id || 'N/A'}
            </p>
            <p className={styles.orderClient}>
                CLIENTE - {(order.order_user_name || 'Desconhecido').toUpperCase()}
            </p>
            <div className={styles.cardDiv}>
                <p className={styles.orderQtde}>QUANTIDADE</p>
                <div className={styles.circle}>{order.quantity || '1'}</div>
            </div>
            <h3 className={styles.orderPrice}>
                R${order.order_total_value || '0.00'}
            </h3>

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