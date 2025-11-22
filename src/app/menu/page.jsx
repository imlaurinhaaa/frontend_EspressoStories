"use client"
import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import styles from './page.module.css'
import Image from 'next/image'
import CardFilter from '../../components/cardFilter';

export default function Menu() {
  

  const [activeCategory, setActiveCategory] = useState('null');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const handleFilterClick = (category) => { setActiveCategory(category); }
  const filteredItems = products.filter((product) => product.category === activeCategory || activeCategory === null);

  return (
    <>
      <Header />
      <section className={styles.menuBanner}>
        <Image src={"/img/menuBanner.png"} alt="Menu Banner" width={1300} height={500} className={styles.menuBannerImage} />
      </section>

      <main className={styles.mainMenu}>
        <div className={styles.filterContainer}>
          <CardFilter
            category={"sobremesas"}
            label={"SOBREMESAS"}
            imageUrl={"/img/sobremesas.jpg"}
            isActive={activeCategory === "sobremesas"}
            onClick={handleFilterClick}
          />

          <CardFilter
            category={"bebidas"}
            label={"BEBIDAS"}
            imageUrl={"/img/bebidas.jpg"}
            isActive={activeCategory === "bebidas"}
            onClick={handleFilterClick}
          />

          <CardFilter
            category={"salgados"}
            label={"SALGADOS"}
            imageUrl={"/img/salgados.jpg"}
            isActive={activeCategory === "salgados"}
            onClick={handleFilterClick}
          />
        </div>

        {/* Exemplo simples de listagem dos itens filtrados */}
        <section className={styles.productsList}>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className={styles.productCard}>
                <h4>{item.name}</h4>
                <p>{item.category}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  )
}
