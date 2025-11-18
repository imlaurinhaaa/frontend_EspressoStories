'use client';

import Image from "next/image";
import styles from "./page.module.css";
import FoodCard from "./../../components/foodCard/foodCard"

export default function Home() {
    return (
        <div className={styles.container}>
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
                    <h2 className={styles.mainTitle}>NOSSOS DIFERENCIAIS</h2>
                    <p className={styles.mainDescription}>
                       ooii
                    </p>
                </div>
            </div>
        </div>
    )
}