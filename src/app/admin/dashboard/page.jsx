"use client";

import styles from "./dashboard.module.css";
import { SyncOutlined } from "@ant-design/icons";

export default function Dashboard() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>

            </header>
            <main className={styles.main}>
                <div className={styles.bola1}></div>
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