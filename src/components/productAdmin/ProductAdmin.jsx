"use client";

import React from "react";
import Image from "next/image";
import styles from './ProductAdmin.module.css';

export default function ProductAdmin({ photo, name, description, price, inspiration, photo_inspiration }) {
    return (
        <div className={styles.content}>
            <div className={styles.imageProduct}>
                {photo && (
                    <Image
                        src={photo}
                        alt={name || "Product"}
                        width={100}
                        height={100}
                    />
                )}
            </div>
            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{name}</h2>
                <p className={styles.productDescription}>{description}</p>
                <p className={styles.productPrice}>R$ {price}</p>
                <p className={styles.productInspiration}>{inspiration}</p>
            </div>
            <div className={styles.imageInspiration}>
                {photo_inspiration && (
                    <Image
                        src={photo_inspiration}
                        alt={inspiration || "Inspiration"}
                        width={100}
                        height={100}
                    />
                )}
            </div>
        </div>
    )
}