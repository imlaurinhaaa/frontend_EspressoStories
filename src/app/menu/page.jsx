"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './page.module.css'
import Image from 'next/image'
import Header from '../../components/header'
import FoodCard from '../../components/foodCard1/foodCard';

export default function Menu() {
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try{
      setIsLoading(true);
      setError(null);
      console.log('Fetching products from:', `${API_URL}/products`);

      const response = await axios.get(`${API_URL}/products`);
      console.log('Products received:', response.data);

      let data = response.data;
      if (!data || typeof data.length !== 'number') {
         if (data && data.products) data = data.products;
         else if (data && data.data) data = data.data;
      }
      if (!data || typeof data.length !== 'number') {
        data = [];
      }

      sessionStorage.setItem('products', JSON.stringify(data));
      setProducts(data);

    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Não foi possível carregar os produtos. Verifique se o servidor está rodando.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const produtosArmazenados = sessionStorage.getItem('products');
    let loadedFromCache = false;

    if (produtosArmazenados) {
      try {
        const produtos = JSON.parse(produtosArmazenados);
        if (produtos) {
          setProducts(produtos);
          loadedFromCache = true;
          console.log('Produtos carregados da sessionStorage:', produtos);
        }
      } catch (error) {
        console.error('Erro ao ler sessionStorage:', error);
      }
    }
    
    if (!loadedFromCache) {
      fetchProducts();
    }
  }, []);

  const categoryMap = {
    "Comidas Doce": 1,
    "Comidas Salgadas": 2,
    "bebidas": [3, 4],
  };

  const handleFilterClick = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const filteredItems = (products && typeof products.filter === 'function' ? products : []).filter((product) => {
    if (activeCategory === null) return true;
    const mappedId = categoryMap[activeCategory];
    
    const productCategoryId = product.category_id;

    if (typeof mappedId === 'object' && mappedId.length) {
      return mappedId.includes(Number(productCategoryId)) || mappedId.includes(String(productCategoryId));
    }
    return productCategoryId === mappedId || String(productCategoryId) === String(mappedId);
  });
  
  return (
    <>
      <Header />
      <section className={styles.menuBanner}>
        <Image src={"/img/menuBanner.png"} alt="Menu Banner" width={1300} height={500} className={styles.menuBannerImage} />
      </section>

      <main className={styles.mainMenu}>
        <div className={styles.filterContainer}>
          {/* Sobremesas */}
          <div 
            className={`${styles.filterCard} ${activeCategory === "Comidas Doce" ? styles.active : ''}`}
            style={{ backgroundImage: "url('/img/doceBanner.png')" }}
            onClick={() => handleFilterClick("Comidas Doce")}
          >
            <span className={styles.filterLabel}>SOBREMESAS</span>
          </div>

          {/* Bebidas */}
          <div 
            className={`${styles.filterCard} ${activeCategory === "bebidas" ? styles.active : ''}`}
            style={{ backgroundImage: "url('/img/bebidaBanner.png')" }}
            onClick={() => handleFilterClick("bebidas")}
          >
            <span className={styles.filterLabel}>BEBIDAS</span>
          </div>

          {/* Salgados */}
          <div 
            className={`${styles.filterCard} ${activeCategory === "Comidas Salgadas" ? styles.active : ''}`}
            style={{ backgroundImage: "url('/img/salgadoBanner.png')" }}
            onClick={() => handleFilterClick("Comidas Salgadas")}
          >
            <span className={styles.filterLabel}>SALGADOS</span>
          </div>
        </div>

        <section className={styles.productsList}>
          {isLoading ? (
            <p>Carregando...</p>
          ) : error ? (
            <div className={styles.errorMessage}>
              <p>{error}</p>
              <button onClick={fetchProducts} className={styles.retryButton}>Tentar Novamente</button>
            </div>
          ) : filteredItems.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))
          )}
        </section>
      </main>
    </>
  )
}
