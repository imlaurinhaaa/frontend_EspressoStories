"use client";

import React from "react";
import Image from "next/image";
import styles from './menu.module.css';
import Link from "next/link";
import { Search } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/headerAdmin/Header.jsx";
import ProductAdmin from "../../../components/productAdmin/ProductAdmin.jsx";

export default function Menu() {

    const [products, setProducts] = useState([]);
    const url = process.env.NEXT_PUBLIC_API_URL
    const uploads = process.env.NEXT_PUBLIC_UPLOADS_URL
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${url}/products`);
                setProducts(Array.isArray(response.data) ? response.data : response.data.products || []);
                console.log(response.data);
                console.log(uploads);


            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, [url, uploads, search]);


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
                    <div className={styles.categoryBox}>
                        <p className={styles.categoryTitle}>Bebidas</p>
                    </div>
                    <div className={styles.categoryBox}>
                        <p className={styles.categoryTitle}>Sobremesas</p>
                    </div>
                    <div className={styles.categoryBox}>
                        <p className={styles.categoryTitle}>Salgados</p>
                    </div>
                </div>
                <div className={styles.menu}>
                    {products.map((p) => (
                        <Link key={p.id} href={`/menu/${p.id}`} style={{ textDecoration: 'none' }}>
                            <ProductAdmin
                                photo={p.photo ? `${uploads}/${p.photo}` : null}
                                name={p.name}
                                description={p.description}
                                price={p.price}
                                inspiration={p.inspiration}
                                photo_inspiration={p.photo_inspiration ? `${uploads}/${p.photo_inspiration}` : null}
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}