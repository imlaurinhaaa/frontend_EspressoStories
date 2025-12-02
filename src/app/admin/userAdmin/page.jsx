"use client";

import React from "react";
import Image from "next/image";
import styles from './userAdmin.module.css';
import Link from "next/link";
import { Search } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/headerAdmin/HeaderAdmin.jsx";

export default function UserAdmin() {


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
                    <h1 className={styles.title}>Bem vinda</h1>
                </div>
                <Image
                    src="/img/userAdmin.png"
                    width={500}
                    height={500}
                    alt="User Admin" />
            </main>
        </div>
    )
}