'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Header from '../../components/headerUser/Header';
import Footer from '../../components/footer/footer';
import FoodCard from "../../components/categoryCard/categoryCard";
import Link from "next/link";
import { useState, useEffect } from 'react';
import SearchInput from "../../components/searchInput/searchInput";
import ProductCard from "../../components/productCard/productCard";
import { Spin } from 'antd';
import axios from "axios";
import React from 'react';
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';

export default function Doces() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}`,
            );
            const data = response.data;
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao carregar produtos: ", error);
            setError(error.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <section className={styles.menuBanner}>
                    <Image src={"/img/menuBanner.png"} alt="Menu Banner" width={1300} height={500} className={styles.menuBannerImage} />
                </section>

                <div className={styles.foodCardsArea}>
                    <Link href="/doces">
                        <FoodCard
                            img='/img/doce-banner.png'
                            alt='Banner de sobremesas'
                            name='SOBREMESAS'
                        />
                    </Link>
                    <Link href="/bebidas">
                        <FoodCard
                            img='/img/bebida-banner.png'
                            alt='Banner de bebida'
                            name='BEBIDAS'
                        />
                    </Link>
                    <Link href="/salgados">
                        <FoodCard
                            img='/img/salgado-banner.png'
                            alt='Banner de salgado'
                            name='SALGADOS'
                        />
                    </Link>
                </div>
                <h1 className={styles.title}>SOBREMESAS</h1>
                <SearchInput
                    placeholder={"Pesquisar produtos..."}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <Spin size="large" />
                        <p>Carregando produtos...</p>
                    </div>
                ) : error ? (
                    <div className={styles.errorContainer}>
                        <div className={styles.errorMessage}>
                            <p>Erro: {error}</p>
                        </div>
                        <button
                            onClick={fetchProducts}
                            className={styles.retryButton}
                        >
                            Tentar Novamente
                        </button>
                    </div>
                ) : (
                    <div className={styles.productsGrid}>
                        {currentProducts.map((product, index) => {
                            const productFormatado = {
                                id: product.id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                photo: product.photo,
                            };

                            return (
                                <ProductCard
                                    key={`product-${product.id || index}`}
                                    product={productFormatado}
                                />
                            );
                        })}
                        {currentProducts.length === 0 && !loading && !error && (
                            <div className={styles.emptyState}>
                                <p>Nenhum produto encontrado</p>
                                <button
                                    onClick={fetchProducts}
                                    className={styles.retryButton}
                                >
                                    <SyncOutlined spin />
                                    Recarregar Produtos
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}