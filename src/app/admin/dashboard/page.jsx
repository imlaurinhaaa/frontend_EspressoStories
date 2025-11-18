"use client";

import styles from "./dashboard.module.css";
import { SyncOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRef } from "react";
import OrderCard from "../../../components/orderCard/page.jsx";

export default function Dashboard() {
    const cardSectionRef = useRef(null);

    const scrollLeft = () => {
        if (cardSectionRef.current) {
            cardSectionRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (cardSectionRef.current) {
            cardSectionRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };
    return (
        <div className={styles.page}>
            <header className={styles.header}>

            </header>
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
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>DASHBOARD</h1>
                    <h3 className={styles.subtitle}>FILA DE PEDIDOS</h3>
                </div>
                <div className={styles.buttonSection}>
                    <button type="button" className={styles.button}>
                        <SyncOutlined />
                        ATUALIZAR
                    </button>
                </div>
                <div className={styles.cardContainer}>
                    <button 
                        className={`${styles.scrollButton} ${styles.scrollLeft}`}
                        onClick={scrollLeft}
                    >
                        <LeftOutlined />
                    </button>
                    
                    <div className={styles.cardSection} ref={cardSectionRef}>
                        <OrderCard 
                            cardImage="/img/paoDeQueijo.png"
                            orderName="PÃO DE QUEIJO"
                            orderNumber="001"
                            orderClient="JOÃO"
                            orderQtde={2}
                            orderPrice={10.00}
                        />
                        <OrderCard 
                            cardImage="/img/cappuccino.png"
                            orderName="CAPPUCCINO"
                            orderNumber="002"
                            orderClient="MARIA"
                            orderQtde={1}
                            orderPrice={8.50}
                        />
                        <OrderCard 
                            cardImage="/img/paoDeQueijo.png"
                            orderName="ESPRESSO"
                            orderNumber="003"
                            orderClient="CARLOS"
                            orderQtde={3}
                            orderPrice={7.00}
                        />
                        <OrderCard 
                            cardImage="/img/cappuccino.png"
                            orderName="LATTE"
                            orderNumber="004"
                            orderClient="ANA"
                            orderQtde={1}
                            orderPrice={9.00}
                        />
                        
                        <OrderCard 
                            cardImage="/img/paoDeQueijo.png"
                            orderName="MOCHA"
                            orderNumber="005"
                            orderClient="PEDRO"
                            orderQtde={2}
                            orderPrice={11.00}
                        />
                        <OrderCard 
                            cardImage="/img/cappuccino.png"
                            orderName="CAFÉ"
                            orderNumber="006"
                            orderClient="BRUNA"
                            orderQtde={3}
                            orderPrice={12.00}
                        />
                    </div>

                    <button 
                        className={`${styles.scrollButton} ${styles.scrollRight}`}
                        onClick={scrollRight}
                    >
                        <RightOutlined />
                    </button>
                </div>
            </main>
        </div>
    );
}