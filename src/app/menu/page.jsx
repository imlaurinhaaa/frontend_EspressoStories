"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './page.module.css'
import Image from 'next/image'
import Header from '../../components/headerUser/Header'
import Footer from '../../components/footer/footer'
import FoodCard from '../../components/foodCard1/foodCard'
import { Search } from 'lucide-react'

export default function Menu() {

  const API_URL = 'http://localhost:4000/api';

  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/products`);
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
        }
      } catch (error) {
        console.error('Erro ao ler sessionStorage:', error);
      }
    }

    if (!loadedFromCache) {
      fetchProducts();
    }
  }, []);

  const filteredItems = products.filter((product) => {
    const matchesCategory = (() => {
      if (!activeCategory) return true;
      const categoryId = Number(product.category_id);
      return categoryId === activeCategory;
    })();

    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
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

      <div className={styles.searchSection}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Buscar item do menu..."
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.iconBox}>
            <Search className={styles.searchIcon} />
          </div>
        </div>
      </div>

      <div className={styles.categoriesSection}>
        <div
          className={`${styles.categoryBox} ${activeCategory === null ? styles.active : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          <p className={styles.categoryTitle}>Todos</p>
        </div>

        <div
          className={`${styles.categoryBox} ${activeCategory === 3 ? styles.active : ""}`}
          onClick={() => setActiveCategory(3)}
        >
          <p className={styles.categoryTitle}>Bebidas</p>
        </div>

        <div
          className={`${styles.categoryBox} ${activeCategory === 1 ? styles.active : ""}`}
          onClick={() => setActiveCategory(1)}
        >
          <p className={styles.categoryTitle}>Sobremesas</p>
        </div>

        <div
          className={`${styles.categoryBox} ${activeCategory === 2 ? styles.active : ""}`}
          onClick={() => setActiveCategory(2)}
        >
          <p className={styles.categoryTitle}>Salgados</p>
        </div>
      </div>
      
      <main className={styles.mainMenu}>
        <section className={styles.productsList}>
          {isLoading ? (
            <p>Carregando...</p>
          ) : error ? (
            <div className={styles.errorMessage}>
              <p>{error}</p>
              <button onClick={fetchProducts} className={styles.retryButton}>
                Tentar Novamente
              </button>
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
      <Footer />
    </div>
  );
}
