"use client";

import styles from "./dashboard.module.css";
import { SyncOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRef } from "react";

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
                    width={230}
                    height={230}
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
                        <div className={styles.card}>
                        <Image
                        className={styles.cardImage}
                            src="/img/paoDeQueijo.png"
                            alt="Pão de Queijo"
                            width={140}
                            height={140}
                        />
                        <p className={styles.orderName}>
                            PÃO DE QUEIJO
                        </p>
                        <p className={styles.orderNumber}>
                            PEDIDO #0006
                        </p>
                        <p></p>
                    </div>
                    <div className={styles.card}>
                        <Image
                            className={styles.cardImage}
                            src="/img/cappuccino.png"
                            alt="Cappuccino"
                            width={160}
                            height={140}
                        />
                    </div>
                    <div className={styles.card}>
                        {/* <Image
                            src="/img/paoDeQueijo.png"
                            alt="Pão de Queijo"
                            width={100}
                            height={100}
                        /> */}
                    </div>
                    <div className={styles.card}>
                        {/* <Image
                            src="/img/paoDeQueijo.png"
                            alt="Pão de Queijo"
                            width={100}
                            height={100}
                        /> */}
                    </div>
                    <div className={styles.card}>
                        {/* <Image
                            src="/img/paoDeQueijo.png"
                            alt="Pão de Queijo"
                            width={100}
                            height={100}
                        /> */}
                    </div>
                    <div className={styles.card}>
                        {/* <Image
                            src="/img/paoDeQueijo.png"
                            alt="Pão de Queijo"
                            width={100}
                            height={100}
                        /> */}
                    </div>
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