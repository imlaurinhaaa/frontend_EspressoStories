"use client";

import React from "react";
import Image from "next/image";
import styles from './create.module.css';
import Link from "next/link";
import Header from "../../../components/headerAdmin/HeaderAdmin.jsx";

export default function Create() {
    return (
<div className={styles.page}>
            <Header />
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
                    <h1 className={styles.title}>CRIAR NOVO PRODUTO</h1>
                    <p className={styles.text}>Como deseja criar o produto?</p>
                </div>
                <div className={styles.linksSection}>
                    <Link href="createGeral" className={styles.button}>GERAL</Link>
                    <Link  href="createFilial" className={styles.button}>FILIAL</Link>
                </div>
                </main>
        </div>
    );
}