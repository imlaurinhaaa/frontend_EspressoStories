import React from "react";
import Image from "next/image";
import styles from "../styles/menu.module.css";

export default function Menu() {
    return (
        <header className={styles.header}>
            <Image src={"/img/logocompleta.png"} alt="Logo Espresso Stories" width={200} height={100} className={styles.logo} />
            <section className={styles.navLinks}>
                <a href="home" className={styles.link}>Home</a>
                <a href="menu" className={styles.link}>Menu</a>
                <a href="shop" className={styles.link}><Image src={"/img/carrinho-de-compras.png"} alt="Carrinho" width={30} height={30} /></a>
                <a href="user" className={styles.link}><Image src={"/img/user-icon.png"} alt="Carrinho" width={30} height={30} /></a>
            </section>
        </header>
    )
}