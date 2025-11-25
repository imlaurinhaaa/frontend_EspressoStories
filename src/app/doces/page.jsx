'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Header from '../../components/header'
import Footer from '../../components/footer/footer';
import FoodCard from "../../components/categoryCard/categoryCard";
import Link from "next/link";
import React from "react";
import SearchInput from "../../components/searchInput/searchInput";

export default function Doces() {
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
                    placeholder={"Pesquisar sobremesas..."}
                />
            </div>
            <Footer />
        </>
    )
}