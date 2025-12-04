"use client";

import React from "react";
import Image from "next/image";
import styles from './menu.module.css';
import Link from "next/link";
import { Search } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/headerAdmin/HeaderAdmin.jsx";
import ProductAdmin from "../../../components/productAdmin/ProductAdmin.jsx";
import Loading from "../../../components/loading/Loading.jsx";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage.jsx";

export default function Menu() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await axios.get(`http://localhost:4000/api/products`);
                setProducts(Array.isArray(response.data) ? response.data : response.data.products || []);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search]);

    const handleRetry = () => {
        setError(false);
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products`);
                setProducts(Array.isArray(response.data) ? response.data : response.data.products || []);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
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
                    <Link href="create" className={styles.button}>
                        <h1 className={styles.buttonText}>CRIAR PRODUTO</h1>
                    </Link>
                </div>
                <div className={styles.categoriesSection}>
                    <div
                        className={`${styles.categoryBox} ${selectedCategory === "Todos" ? styles.active : ""}`}
                        onClick={() => setSelectedCategory("Todos")}
                        style={{ cursor: 'pointer' }}
                    >
                        <p className={styles.categoryTitle}>Todos</p>
                    </div>
                    <div
                        className={`${styles.categoryBox} ${selectedCategory === "Bebidas" ? styles.active : ""}`}
                        onClick={() => setSelectedCategory("Bebidas")}
                        style={{ cursor: 'pointer' }}
                    >
                        <p className={styles.categoryTitle}>Bebidas</p>
                    </div>
                    <div
                        className={`${styles.categoryBox} ${selectedCategory === "Sobremesas" ? styles.active : ""}`}
                        onClick={() => setSelectedCategory("Sobremesas")}
                        style={{ cursor: 'pointer' }}
                    >
                        <p className={styles.categoryTitle}>Sobremesas</p>
                    </div>
                    <div
                        className={`${styles.categoryBox} ${selectedCategory === "Salgados" ? styles.active : ""}`}
                        onClick={() => setSelectedCategory("Salgados")}
                        style={{ cursor: 'pointer' }}
                    >
                        <p className={styles.categoryTitle}>Salgados</p>
                    </div>
                </div>

                {loading ? (
                    <Loading message="Carregando produtos..." />
                ) : error ? (
                    <ErrorMessage
                        message="Erro ao carregar produtos! Verifique sua conexão e tente novamente."
                        onRetry={handleRetry}
                    />
                ) : products.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyText}>Nenhum produto cadastrado no momento.</p>
                    </div>
                ) : (
                    <div className={styles.menu}>
                        {products
                            .filter((item) => {
                                if (selectedCategory === "Todos") return true;
                                return item.category_name === selectedCategory ||
                                    (selectedCategory === "Salgados" && item.category_name === "Comidas Salgadas") ||
                                    (selectedCategory === "Sobremesas" && item.category_name === "Comidas Doces") ||
                                    (selectedCategory === "Bebidas" && item.category_name === "Bebidas Quentes") ||
                                    (selectedCategory === "Bebidas" && item.category_name === "Bebidas Geladas");
                            })
                            .map((item) => (
                                <ProductAdmin key={item.id} item={item} />
                            ))
                        }
                    </div>
                )}
            </main>
        </div>
    )
}