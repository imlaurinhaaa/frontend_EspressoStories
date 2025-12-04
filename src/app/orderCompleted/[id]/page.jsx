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
                const response = await fetch(`http://localhost:4000/api/order_items/${orderId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Itens do pedido não encontrados.");
                    }
                    setOrderItems([]);
                    return;
                }

                const data = await response.json();
                if (data.orderItem) {
                    setOrderItems(data.orderItem);
                } else {
                    setOrderItems([]);
                }
            } catch (error) {
                console.error("Erro ao buscar itens do pedido:", error);
            } finally {
                setLoading(false);
            }
        }

        if (orderId) {
            fetchItems();
        } else {
            setLoading(false);
        }
    }, [orderId]);

    if (loading) {
        return <p className={styles.loading}>Carregando itens do pedido...</p>
    }

    if (orderItems.length === 0) {
        return <p className={styles.noItems}>Nenhum item encontrado para este pedido.</p>
    }

    const calculateTotal = () => {
        return orderItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;
            return total + (itemPrice * itemQuantity);
        }, 0);
    };

    const totalCompra = calculateTotal().toFixed(2);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.bannerCompleted}>
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>Seu Pedido</h2>
                <div className={styles.line}></div>

                <div className={styles.contentItems}>
                    <div className={styles.orderItemList}>
                        {orderItems.map((item) => (
                            <div key={item.id} className={styles.itemCard}>

                                {item.photo && typeof item.photo === 'string' && item.photo.trim() !== '' && (
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={`http://localhost:4000/uploads/${item.photo}.jpg`}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            style={{ objectFit: "cover" }}
                                            unoptimized
                                        />
                                    </div>
                                )}

                                <div className={styles.details}>
                                    <h3 className={styles.name}>{item.name}</h3>
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

                <div className={styles.orderSummary}>
                    <div className={styles.summaryLine}></div>
                    <p className={styles.finalTotal}>
                        Total da Compra: <strong>R$ {totalCompra}</strong>
                    </p>
                </div>

                <div className={styles.buttonContainer}>
                    <Link href={"/home"} className={styles.button}>Volte para a nossa home</Link>
                    <Link href={"/status"} className={styles.button}>Ver o status do pedido</Link>
                </div>
            </div>
        </div>
    )
}