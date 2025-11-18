"use client";

import styles from "./dashboard.module.css";
import { SyncOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>

            </header>
            <main className={styles.main}>
                <Image
                className={styles.ballImage}
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
                    <button type="button" className={styles.button}>
                        <SyncOutlined />
                        ATUALIZAR
                    </button>
                </div>
            </main>
        </div>
    );
}