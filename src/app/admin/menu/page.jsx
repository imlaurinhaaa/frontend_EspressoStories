"use client";

import React from "react";
import Image from "next/image";
import styles from './menu.module.css';
import Link from "next/link";
import { Search } from 'lucide-react';

import Header from "../../../components/headerAdmin/Header.jsx";

export default function Menu() {
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
                    <h1 className={styles.title}>CARDÁPIO</h1>
                </div>
                <div className={styles.searchSection}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Buscar item do menu..."
                            className={styles.input}
                        />
                        <div className={styles.iconBox}>
                            <Search className={styles.searchIcon} />
                        </div>
                    </div>
                    <Link href="createProduct" className={styles.button}>
                        <h1 className={styles.buttonText}>CRIAR PRODUTO</h1>
                    </Link>
                </div>
                <div className={styles.categoriesSection}>
                    <div>
                        <h2 className={styles.categoryTitle}>Bebidas</h2>
                    </div>
                    <div>
                        <h2 className={styles.categoryTitle}>Sobremesas</h2>
                    </div>
                    <div>
                        <h2 className={styles.categoryTitle}>Salgados</h2>
                    </div>
                </div>
            </main>
        </div>
    )
}