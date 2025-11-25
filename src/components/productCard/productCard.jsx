import Image from 'next/image';
import styles from './productCard.module.css';
import React from 'react';

export default function ProductCard({ img, alt, name }) {
    return (
        <div className={styles.card}>
            <Image src={img} alt={alt} width={300} height={200} className={styles.image} />
            <h2 className={styles.name}>{name}</h2>
        </div>
    )
}