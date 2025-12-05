"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../page.module.css";
import { message } from "antd";

export default function OrderCompleted() {
    const params = useParams();
    const router = useRouter();
    const orderId = params?.id;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadOrder = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/orders/${orderId}`);
            const data = await res.json();

            if (!res.ok) {
                alert("Erro ao carregar pedido.");
                return;
            }
            
            setOrder(data.order);
        } catch (err) {
            console.error("Erro ao carregar pedido:", err);
            alert("Erro ao carregar pedido.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) loadOrder();
    }, [orderId]);

    if (loading) return <p>Carregando...</p>;
    if (!order) return <p>Pedido não encontrado</p>;

    const subtotal = Number(order?.subtotal_value);
    const frete = 15;
    const total = Number(order?.total_value) ;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Image src="/img/ball.png" alt="Ball" width={200} height={200} className={styles.ball1} />

                <div className={styles.cardContainer}>
                    <h2 className={styles.title}>Pedido Finalizado 🎉</h2>
                    <p className={styles.text}>
                        Obrigado pela sua compra! Seu pedido foi registrado com sucesso.
                    </p>

                    <h3 className={styles.subTitle}>Informações do Pedido</h3>

                    <p><strong>ID do Pedido:</strong> {order.id}</p>
                    <p><strong>Cliente:</strong> {order.user_name}</p>
                    <p><strong>Forma de Pagamento:</strong> {order.payment_method}</p>

                    <h3 className={styles.subTitle}>Itens</h3>

                    {order.items?.map((item) => {
                        const name = item.product_name || item.featured_product_name;
                        const photo = item.product_photo
                            ? `http://localhost:4000/uploads/${item.product_photo}.jpg`
                            : item.featured_product_photo
                                ? `http://localhost:4000/uploads/${item.featured_product_photo}.jpg`
                                : "/img/logo.png";

                        return (
                            <div key={item.item_id} className={styles.itemRow}>
                                <Image
                                    src={photo}
                                    alt={name}
                                    width={120}
                                    height={90}
                                    className={styles.itemImage}
                                    unoptimized
                                />

                                <div className={styles.itemDetails}>
                                    <p className={styles.text}>{name}</p>
                                    <p className={styles.text}>Quantidade: {item.quantity}</p>
                                    <p className={styles.text}>Preço: R$ {Number(item.price).toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}

                    <h3 className={styles.subTitle}>Resumo</h3>
                    <p>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
                    <p>Frete: <strong>R$ {frete.toFixed(2)}</strong></p>
                    <p className={styles.totalText}>Total: <strong>R$ {total.toFixed(2)}</strong></p>

                    <button className={styles.finishBtn} onClick={() => router.push("/home")}>
                        Voltar para Home
                    </button>
                </div>
            </main>
        </div>
    );
}