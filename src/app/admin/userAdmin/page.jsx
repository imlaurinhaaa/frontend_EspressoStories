"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './userAdmin.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/headerAdmin/HeaderAdmin.jsx";

export default function UserAdmin() {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const raw = sessionStorage.getItem('usuario');
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    // Use setTimeout to avoid synchronous setState warning
                    setTimeout(() => {
                        setAdmin(parsed);
                    }, 0);
                } catch (err) {
                    console.error("Erro ao ler usuário do sessionStorage:", err);
                }
            }
        }
    }, []);

    const getAdminPhoto = () => {
        if (!admin || !admin.photo) return "/img/logo.png";

        const filename = admin.photo;

        if (filename.includes(".")) {
            return `http://localhost:4000/uploads/${filename}`;
        }

        return `http://localhost:4000/uploads/${filename}.jpg`;
    };

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

                <div className={styles.contentContainer}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            {admin ? `Bem-vinda, ${admin.name}!` : "Carregando..."}
                        </h1>
                    </div>
                    <Image
                        src={getAdminPhoto()}
                        width={200}
                        height={200}
                        alt="User Admin"
                        className={styles.adminPhoto}
                        unoptimized
                    />
                    <Link className={styles.button} href="/admin/login">Sair</Link>
                </div>
            </main>
        </div>
    );
}
