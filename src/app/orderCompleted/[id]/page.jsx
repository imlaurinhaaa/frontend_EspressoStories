"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";

export default function OrderCompleted({ params }) {
    const { id: orderId } = use(params);
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await fetch(`http://localhost:3000/api/order_items/${orderId}`);
                const data = await response.json();
                if (data.orderItem) {
                    setOrderItems(data.orderItem);
                }
            } catch (error) {
                console.error("Erro ao buscar itens do pedido:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchItems();
    }, [orderId]);

    if (loading) {
        return <p className={styles.loading}>Carregando itens do pedido...</p>
    }

    if (orderItems.length === 0) {
        return <p className={styles.noItems}>Nenhum item encontrado para este pedido.</p>
    }

    return (
        <div className={styles.container}>
            <div className={styles.bannerCompleted}>
                <Image src={"/img/orderCompleted.png"} alt="Pedido Completo" width={1500} height={500} style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>Seu pedido foi concluído com sucesso! #{orderId}</h2>
                <div className={styles.line}></div>
                <div className={styles.contentItems}>
                    <div className={styles.contentOrder}>
                        {orderItems.map((item) => (
                            <div key={item.id} className={styles.items}>
                                <h3 className={styles.name}>{item.name}</h3>
                                <div className={styles.details}>
                                    <p className={styles.quantity}>Quantidade: {item.quantity}</p>
                                    <p className={styles.price}>Preço: R$ {parseFloat(item.price).toFixed(2)}</p>
                                </div>
                                <div className={styles.lineItems}></div>
                            </div>
                        ))}
                    </div>
                    <aside className={styles.sideImage}>
                        <Image src={"/img/mensagem_order.png"} alt="Café Completo" width={350} height={380} style={{ objectFit: "cover" }} />
                    </aside>
                </div>
                <div className={styles.buttonContainer}>
                    <Link href={"/home"} className={styles.button}>Volte para a nossa home</Link>
                    <Link href={"/status"} className={styles.button}>Ver o status do pedido</Link>
                </div>
            </div>
        </div>
    )
}