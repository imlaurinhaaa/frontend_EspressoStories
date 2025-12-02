'use client';

import React from "react";
import styles from './about.module.css';
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin';
import Image from "next/image";
import { useStore } from '../../../context/StoreContext';

export default function About() {
    const { storeInfo } = useStore();

    return (
        <div className={styles.container}>
            <HeaderAdmin />
            <div className={styles.containerContent}>
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
                    width={90}
                    height={90}
                    className={`${styles.ballImage} ${styles.position2}`}
                />

                <Image
                    src="/img/ball.png"
                    alt="Ball"
                    width={90}
                    height={90}
                    className={`${styles.ballImage} ${styles.position3}`}
                />

                <Image
                    src="/img/ball.png"
                    alt="Ball"
                    width={400}
                    height={400}
                    className={`${styles.ballImage} ${styles.position4}`}
                />
                <div className={styles.rowArea}>
                    <section className={styles.imageSection}>
                        {storeInfo.image && (
                            <Image
                                src={storeInfo.image}
                                alt="Imagem da loja"
                                width={300}
                                height={300}
                                className={styles.storeImage}
                            />
                        )}
                    </section>
                    <section className={styles.aboutSection}>
                        <Image
                            src='/img/logoName.png'
                            alt="Logo Espresso Stories"
                            width={400}
                            height={120}
                        />
                        <p className={styles.paragrafo}><strong>Horário de Funcionamento:</strong> {storeInfo.hours || "Seg a Sex: 8h - 17h"}</p>
                        <p className={styles.paragrafo}><strong>Contato:</strong> {storeInfo.contact || "(11) 12345-6789"}</p>
                        <p className={styles.paragrafo}><strong>Descrição:</strong> {storeInfo.description || "Espresso Stories é uma cafeteria literária acolhedora, onde o aroma de café recém-passado se mistura ao encanto das boas histórias. Entre estantes repletas de livros e um ambiente intimista, os visitantes podem saborear bebidas artesanais enquanto descobrem novos autores, participam de encontros culturais ou simplesmente desfrutam de um momento de leitura tranquila. É o lugar ideal para quem busca inspiração, aconchego e boas conversas embaladas por literatura e café."}</p>
                    </section>
                </div>

            </div>
        </div>
    );
}