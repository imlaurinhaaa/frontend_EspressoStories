'use client';

import Image from 'next/image';
import styles from './productCard.module.css';
import React from 'react';
import Link from 'next/link';

export default function ProductCard({ product, onClick }) {
    return (
        <div className={styles.productCard} onClick={onClick}>
            <Image
                src={product.photo}
                alt={product.name}
                width={150}
                height={150}
                className={styles.productImage}
            />
            <h3 className={styles.productTitle}>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </div>
    )
}