'use client';

import Image from "next/image";
import styles from "./page.module.css";
import FoodCard from "./../../components/foodCard/foodCard"
import React from "react";
import Header from '../../components/header'
import Footer from '../../components/footer/footer'

export default function Home() {
    return (
        <div className={styles.container}>
            {/* <Header /> */}
            <Image
                src="/img/posterHome.png"
                alt="Poster Home"
                width={1920}
                height={900}
                className={styles.posterHome}
            />
            
            <Image
                src="/img/ball.png"
                alt="Ball"
                width={250}
                height={250}
                className={`${styles.ballImage} ${styles.position}`}
            />
            
            <Image
                src="/img/ball.png"
                alt="Ball"
                width={170}
                height={170}
                className={`${styles.ballImage} ${styles.position2}`}
            />

            <div className={styles.contentContainer}>
                <div className={styles.searchArea}>
                    <Image
                        src="/img/espressoName.png"
                        alt="Espresso Stories"
                        width={400}
                        height={100}
                        className={styles.espressoName}
                    />

                    <div className={styles.rowArea}>
                        <div className={styles.searchInput}>
                            <input
                                type="search"
                                placeholder="Pesquise por um produto..."
                                className={styles.input}
                            />
                            <div className={styles.searchIcon}>
                                <Image
                                    src="/img/searchIcon.png"
                                    alt="Search Icon"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                        <button className={styles.filiaisButton}>FILIAIS</button>
                    </div>
                </div>

                <div className={styles.foodCardsArea}>
                    <FoodCard 
                        img='/img/doceBanner.png'
                        alt='Banner de doce'
                        name='DOCES'
                    />
                    <FoodCard 
                        img='/img/bebidaBanner.png'
                        alt='Banner de bebida'
                        name='BEBIDAS'
                    />
                    <FoodCard 
                        img='/img/salgadoBanner.png'
                        alt='Banner de salgado'
                        name='SALGADOS'
                    />
                </div>

                <div className={styles.mainContent}>
                    <h2 className={styles.mainTitle}>POR QUE NOS ESCOLHER?</h2>
                    <div className={styles.boxes}>
                        <div className={styles.box}>
                            <Image 
                                src='/img/entrega-rapida-icon.png'
                                alt='ícone de entrega'
                                width={70}
                                height={70}
                            />
                            <p>Entregas Rápidas</p>
                        </div>
                        <div className={styles.box}>
                            <Image 
                                src='/img/pedido-icon.png'
                                alt='ícone de pedido'
                                width={70}
                                height={70}
                            />
                            <p>Pedidos preparados com carinho</p>
                        </div>
                        <div className={styles.box}>
                            <Image 
                                src='/img/experiencia-icon.png'
                                alt='ícone de experiência'
                                width={70}
                                height={70}
                            />
                            <p>Esperiência literária mágica</p>
                        </div>
                    </div>
                    <p className={styles.text}>Na Espresso Stories, acreditamos que uma boa história, assim como um bom café, deve ser saboreada lentamente. Somos mais do que uma cafeteria: somos um refúgio para amantes de livros e de boa comida. A sua próxima pausa não será apenas um momento, mas um capítulo inesquecível.</p>
                </div>
            </div>
            <Footer className={styles.footer}/>
        </div>
    )
}