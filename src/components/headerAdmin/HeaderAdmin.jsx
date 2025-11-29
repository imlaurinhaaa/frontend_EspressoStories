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
            <Image src={"/img/logocompleta.png"} alt="Logo Espresso Stories" width={200} height={100} className={styles.logo} />
            <section className={styles.navLinks}>
                <Link href="dashboard" className={styles.link}>Dashboard</Link>
                <Link href="menu" className={styles.link}>Cardápio</Link>
                <Link href="create"><SquarePlus className={styles.link} /></Link>
                <SquarePen className={styles.link} />
                <UserRoundCheck className={styles.link} />
            </section>
        </header>
    )
} 