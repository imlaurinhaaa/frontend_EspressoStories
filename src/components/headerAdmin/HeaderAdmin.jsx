"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { UserRoundCheck } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
import { SquarePen } from 'lucide-react';

export default function HeaderAdmin() {
    return (
        <header className={styles.header}>
            <Link href="dashboard" className={styles.link}>
                <Image src={"/img/logocompleta.png"} alt="Logo Espresso Stories" width={200} height={100} className={styles.logo} />
            </Link>
            <section className={styles.navLinks}>
                <Link href="dashboard" className={styles.link}>Dashboard</Link>
                <Link href="menu" className={styles.link}>Cardápio</Link>
                <Link href="createGeral"><SquarePlus className={styles.link} /></Link>
                <Link href="editProduct"><SquarePen className={styles.link} /></Link>
                <Link href="userAdmin"><UserRoundCheck className={styles.link} /></Link>
            </section>
        </header>
    )
} 