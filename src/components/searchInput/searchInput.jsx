'use client';

import Image from "next/image";
import styles from "./searchInput.module.css";
import React from "react";

export default function SearchInput({ placeholder}) {
    return (
        <div className={styles.rowArea}>
            <div className={styles.searchInput}>
                <input
                    type="search"
                    placeholder={placeholder}
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
    )
}