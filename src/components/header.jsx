import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src={"/img/logocompleta.png"}
        alt="Logo Espresso Stories"
        width={200}
        height={100}
        className={styles.logo}
      />
      <section className={styles.navLinks}>
        <Link href="/home" className={styles.link}>
          Home
        </Link>
        <Link href="/menu" className={styles.link}>
          Menu
        </Link>
        <Link href="/shop" className={styles.link}>
          <Image
            src={"/img/carrinho-de-compras.png"}
            alt="Carrinho"
            width={30}
            height={30}
          />
        </Link>
        <Link href="/user" className={styles.link}>
          <Image
            src={"/img/user-icon.png"}
            alt="Carrinho"
            width={30}
            height={30}
          />
        </Link>
      </section>
    </header>
  );
}
