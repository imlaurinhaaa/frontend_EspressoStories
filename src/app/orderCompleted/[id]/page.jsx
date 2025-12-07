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
    const total = Number(order?.total_value);

    return (
        <div className={styles.page}>
            <div className={styles.bannerContainer}>
                <Image src="/img/orderCompleted.png"
                    alt="Order Completed"
                    width={1600}
                    height={400}
                    quality={100}
                    priority
                    sizes="100vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                />
            </div>

            <div className={styles.cardContainer}>
                <div className={styles.infoContainer}>
                    <h3 className={styles.subTitle}>Informações do Pedido</h3>
                    <p><strong>Cliente:</strong> {order.user_name}</p>
                    <p><strong>Forma de Pagamento:</strong> {order.payment_method}</p>

                    <h3 className={styles.subTitle}>Itens</h3>
                    <div className={styles.lineItems}></div>
                </div>

                <div className={styles.contentItems}>
                    <div className={styles.orderItemList}>
                        {order.items?.map((item) => {
                            const name = item.product_name || item.featured_product_name;
                            const photo = item.product_photo
                                ? `http://localhost:4000/uploads/${item.product_photo}.jpg`
                                : item.featured_product_photo
                                    ? `http://localhost:4000/uploads/${item.featured_product_photo}.jpg`
                                    : "/img/logo.png";

                            return (
                                <div key={item.item_id} className={styles.itemCard}>
                                    <div className={styles.itemInfo}>
                                        <div className={styles.imageContainer}>
                                            <Image
                                                src={photo}
                                                alt={name}
                                                width={80}
                                                height={80}
                                                style={{ objectFit: "cover" }}
                                                unoptimized
                                            />
                                        </div>

                                        <p className={styles.name}>{name}</p>
                                    </div>

                                    <div className={styles.details}>
                                        <p className={styles.quantity}>Quantidade: {item.quantity}</p>
                                        <p className={styles.price}>Preço: R$ {Number(item.price).toFixed(2)}</p>
                                    </div>

                                    <div className={styles.lineItems}></div>
                                </div>
                            );
                        })}
                    </div>

                    <aside className={styles.sideImage}>
                        <Image src={"/img/mensagem_order.png"} alt="Café Completo" width={350} height={380} style={{ objectFit: "cover" }} />
                    </aside>
                </div>

                <div className={styles.totals}>
                    <h3 className={styles.subTitle}>Resumo</h3>

                    <div className={styles.totalsGroup}>
                        <p>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
                        <p>Frete: <strong>R$ {frete.toFixed(2)}</strong></p>
                    </div>

                    <div className={styles.totalFinal}>
                        <p className={styles.totalText}>Total:</p> 
                        <strong>R$ {total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>

            <div className={styles.buttons}>
                <button className={styles.homeBtn} onClick={() => router.push("/home")}>
                    Voltar para Home
                </button>

                <button className={styles.statusBtn} onClick={() => router.push("/orderStatus")}>
                    Ver Status do Pedido
                </button>
            </div>
        </div>
    );
}

