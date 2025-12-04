"use client";

import styles from "./dashboard.module.css";
import { SyncOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

import OrderCard from "../../../components/orderCard/OrderCard.jsx";
import HeaderAdmin from "../../../components/headerAdmin/HeaderAdmin.jsx";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const cardSectionRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get("http://localhost:4000/api/order_items");
            setOrders(response.data);
            console.log("Encomendas buscadas com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao buscar encomendas:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Carregar pedidos automaticamente ao montar o componente
    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        console.log("STATE orders atualizado:", orders);
    }, [orders]);

    const checkScrollButtons = () => {
        if (cardSectionRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = cardSectionRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const element = cardSectionRef.current;
        if (element) {
            element.addEventListener("scroll", checkScrollButtons);
            // Verificar scroll após carregar pedidos
            window.addEventListener("resize", checkScrollButtons);
            return () => {
                element.removeEventListener("scroll", checkScrollButtons);
                window.removeEventListener("resize", checkScrollButtons);
            };
        }
    }, [orders]); // Adicionar orders como dependência

    const scrollLeft = () => {
        if (cardSectionRef.current) {
            cardSectionRef.current.scrollBy({
                left: -320,
                behavior: "smooth",
            });
            // Aguardar o scroll terminar antes de verificar os botões
            setTimeout(checkScrollButtons, 300);
        }
    };

    const scrollRight = () => {
        if (cardSectionRef.current) {
            cardSectionRef.current.scrollBy({
                left: 320,
                behavior: "smooth",
            });
            // Aguardar o scroll terminar antes de verificar os botões
            setTimeout(checkScrollButtons, 300);
        }
    };
    return (
        <div className={styles.page}>
            <HeaderAdmin />
            <main className={styles.main}>
                <Image
                    className={`${styles.ballImage} ${styles.position1}`}
                    src="/img/ball.png"
                    alt="Ball"
                    width={400}
                    height={400}
                />
                <Image
                    className={`${styles.ballImage} ${styles.position2}`}
                    src="/img/ball.png"
                    alt="Ball"
                    width={80}
                    height={80}
                />
                <Image
                    className={`${styles.ballImage} ${styles.position3}`}
                    src="/img/ball.png"
                    alt="Ball"
                    width={300}
                    height={300}
                />
                <Image
                    className={`${styles.ballImage} ${styles.position4}`}
                    src="/img/ball.png"
                    alt="Ball"
                    width={100}
                    height={100}
                />
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>DASHBOARD</h1>
                    <h3 className={styles.subtitle}>FILA DE PEDIDOS</h3>
                </div>
                <div className={styles.buttonSection}>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={fetchOrders}
                    >
                        <SyncOutlined />
                        ATUALIZAR
                    </button>
                </div>

                {loading ? (
                    <p>Carregando pedidos ...</p>
                ) : error ? (
                    <p>Erro ao carregar pedidos!</p>
                ) : (
                    <>
                        <div className={styles.cardContainer}>
                            <button
                                className={`${styles.scrollButton} ${styles.scrollLeft} ${!canScrollLeft ? styles.disabled : ""
                                    }`}
                                onClick={scrollLeft}
                                disabled={!canScrollLeft}
                            >
                                <LeftOutlined />
                            </button>

                            <div className={styles.cardSection} ref={cardSectionRef}>
                                {orders.map((order) => {
                                    const productImageUrl = `http://127.0.0.1:4000/uploads/${order.order_product_photo}.jpg`;

                                    console.log("Imagem do produto:", productImageUrl);

                                    return (
                                        <OrderCard
                                            key={order.id}
                                            productImage={productImageUrl}
                                            productName={order.order_product_name} 
                                            orderNumber={order.order_id}
                                            orderClient={order.order_user_name}
                                            productQuantity={order.quantity}
                                            orderPrice={order.order_total_value}
                                            paymentMethod={order.order_payment_method}
                                        />
                                    );
                                })}

                            </div>

                            <button
                                className={`${styles.scrollButton} ${styles.scrollRight} ${!canScrollRight ? styles.disabled : ""
                                    }`}
                                onClick={scrollRight}
                                disabled={!canScrollRight}
                            >
                                <RightOutlined />
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
