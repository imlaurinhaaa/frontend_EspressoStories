"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './page.module.css'
import Image from 'next/image'
import Header from '../../components/headerUser/Header'
import FoodCard from '../../components/foodCard1/foodCard';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

export default function Menu() {

  const API_URL = 'http://localhost:4000/api';

  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching products from:', `${API_URL}/products`);

      const response = await axios.get(`${API_URL}/products`);
      console.log('Products received:', response.data);

      let data = response.data;

      if (!Array.isArray(data)) {
        if (data?.products) data = data.products;
        else if (data?.data) data = data.data;
        else data = [];
      }

      sessionStorage.setItem('products', JSON.stringify(data));
      setProducts(data);

    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Não foi possível carregar os produtos. Verifique se o servidor está rodando.');
      setProducts([]);
    } finally {
      setLoading(false);
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

  const filteredItems = (products || []).filter((product) => {
    if (!activeCategory) return true;

    const mappedId = categoryMap[activeCategory];
    const productCategoryId = Number(product.category_id);

    if (Array.isArray(mappedId)) {
      return mappedId.includes(productCategoryId);
    }

    return productCategoryId === mappedId;
  });

  return (
    <div className={styles.menuPage}>
      <Header />
      <section className={styles.menuBanner}>
        <Image 
          src={"/img/menuBanner.png"} 
          alt="Menu Banner" 
          width={1300} 
          height={500} 
          className={styles.menuBannerImage} 
        />
      </section>

      <main className={styles.mainMenu}>
        <div className={styles.filterContainer}>

          <div 
            className={`${styles.filterCard} ${activeCategory === "Comidas Doce" ? styles.active : ''}`}
            style={{ backgroundImage: "url('/img/doce-banner.png')" }}
            onClick={() => handleFilterClick("Comidas Doce")}
          >
            <span className={styles.filterLabel}>SOBREMESAS</span>
          </div>

          <div 
            className={`${styles.filterCard} ${activeCategory === "bebidas" ? styles.active : ''}`}
            style={{ backgroundImage: "url('/img/bebida-banner.png')" }}
            onClick={() => handleFilterClick("bebidas")}
          >
            <span className={styles.filterLabel}>BEBIDAS</span>
          </div>

          <div 
            className={`${styles.filterCard} ${activeCategory === "Comidas Salgadas" ? styles.active : ''}`}
            style={{ backgroundImage: "url('/img/salgado-banner.png')" }}
            onClick={() => handleFilterClick("Comidas Salgadas")}
          >
            <span className={styles.filterLabel}>SALGADOS</span>
          </div>
        </div>

        <section className={styles.productsList}>
          {loading ? (
            <Loading message="Carregando produtos..." />
          ) : error ? (
            <ErrorMessage 
              message={error} 
              onRetry={fetchProducts}
            />
          ) : filteredItems.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Nenhum produto encontrado.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
