"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './userAdmin.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/headerAdmin/HeaderAdmin.jsx";

export default function UserAdmin() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchadmins = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/admins`);
                setAdmins(Array.isArray(response.data) ? response.data : response.data.admins || []);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching admins:", error);
                setAdmins([]);
            }
        };

        fetchadmins();
    }, []);

    const getAdminPhoto = () => {
        if (admins.length === 0) return "/img/logo.png";

        const filename = admins[0].photo;

        if (!filename) return "/img/logo.png";

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
                            {admins.length > 0 ? `Bem-vinda, ${admins[0].name}!` : "Carregando..."}
                        </h1>
                    </div>
                    <Image
                        src={getAdminPhoto()}
                        width={300}
                        height={300}
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
