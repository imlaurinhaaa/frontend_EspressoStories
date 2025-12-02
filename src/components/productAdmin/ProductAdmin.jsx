"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './ProductAdmin.module.css';

export default function ProductAdmin({ item }) {
    return (
        <div className={styles.content}>
            <div className={styles.imageProduct}>
                <Image
                    src={
                        item.photo
                            ? `http://localhost:4000/uploads/${item.photo}.jpg`
                            : "/img/logo.png"
                    }
                    alt={item.name || "Item sem nome"}
                    width={150}
                    height={150}
                    className={styles.productPhoto}
                    unoptimized
                />
            </div>
            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{item.name}</h2>
                <p className={styles.productDescription}>{item.description}</p>
                <p className={styles.productPrice}>R$ {item.price}</p>
            </div>
                {item.photo_inspiration && (
                    <Image
                        src={`http://localhost:4000/uploads/${item.photo_inspiration}.jpg`}
                        alt={item.name || "Item sem nome"}
                        width={150}
                        height={150}
                        className={styles.productPhoto}
                        unoptimized
                    />
                )}
                <div className={styles.buttonsContainer}>
                    <Link href="updateProducts" className={styles.updateButton}>Editar</Link>
                    <button className={styles.deleteButton}><h3>Apagar</h3></button>
                </div>
        </div>
    );
}