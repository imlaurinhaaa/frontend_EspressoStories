"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { ShoppingCart } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';

export default function HeaderAdmin() {
    return (
        <header className={styles.header}>
            <Link href="/home" className={styles.link}>
                <Image src={"/img/logocompleta.png"} alt="Logo Espresso Stories" width={200} height={100} className={styles.logo} />
            </Link>            <section className={styles.navLinks}>
                <Link href="/home" className={styles.link}>Home</Link>
                <Link href="/menu" className={styles.link}>Menu</Link>
                <Link href="/menuSpecial" className={styles.link}>Menu Especial</Link>
                <Link href="/cart"><ShoppingCart className={styles.link} /></Link>
                <Link href="/user"><CircleUserRound className={styles.link} /></Link>
            </section>
        </header>
    )
} 