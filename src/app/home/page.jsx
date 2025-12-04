'use client';

import Image from "next/image";
import styles from "./page.module.css";
import CategoryCard from "../../components/categoryCard/categoryCard"
import React from "react";
import Header from '../../components/header'
import Footer from '../../components/footer/footer'
import Link from "next/link";
import SearchInput from "../../components/searchInput/searchInput";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.balls}>
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
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.searchArea}>
                    <Image
                        src="/img/espressoName.png"
                        alt="Espresso Stories"
                        width={400}
                        height={100}
                        className={styles.espressoName}
                    />

                    <SearchInput 
                        placeholder={"Pesquisar produtos..."}
                    />

                </div>

                <div className={styles.categoryCardsArea}>
                    <Link href="/doces">
                        <CategoryCard
                            img='/img/filial-saoPaulo.png'
                            alt='Filial de São Paulo'
                            name='SÃO PAULO'
                        />
                    </Link>
                    <Link href="/bebidas">
                        <CategoryCard
                            img='/img/filial-rio.png'
                            alt='Filial do Rio de Janeiro'
                            name='RIO DE JANEIRO'
                        />
                    </Link>
                    <Link href="/salgados">
                        <CategoryCard
                            img='/img/filial-belem.png'
                            alt='Filial de Belém'
                            name='BELÉM'
                        />
                    </Link>
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

                <div className={styles.refresherBanner}>
                    <Image
                        src='/img/refresher-banner.png'
                        alt='Banner de novidade'
                        width={579}
                        height={463}
                    />
                    <div className={styles.textRefresher}>
                        <h3 className={styles.titleRefresher}>REFRESHER DE BLUEBERRY</h3>
                        <Image
                            src='/img/drinkmeTitle.png'
                            alt='Imagem da bebida Drink Me'
                            width={120}
                            height={30}
                            className={styles.drinkmeTitle}
                        />
                        <p className={styles.textDrinkMe}>Este elixir mágico e refrescante é um convite líquido para o País das Maravilhas, combinando o doce e o cítrico em perfeita harmonia. Sua cor azul-arroxeada vibrante e a leve efervescência garantem um frescor imediato. É preparado com Infusão de Blueberry e Chá Branco, Suco de Limão Siciliano e um toque de mistério floral do Xarope de Flor de Sabugueiro, finalizado com Água Gaseificada. Uma poção deliciosa que desperta a curiosidade a cada gole.</p>
                    </div>
                </div>
            </div>
            <Footer className={styles.footer} />
        </div>
    )
}