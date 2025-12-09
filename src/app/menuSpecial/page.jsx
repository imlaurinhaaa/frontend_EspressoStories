"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "../../components/headerUser/Header";
import Footer from '../../components/footer/footer'
import FoodCard from "../../components/foodCard2/foodCard";
import { Search } from "lucide-react";

export default function MenuSpecial() {
  const API_URL = "http://localhost:4000/api";

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/feature_products`);
      let data = response.data;

      if (!Array.isArray(data)) {
        if (data?.products) data = data.products;
        else if (data?.data) data = data.data;
        else data = [];
      }

      setProducts(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Não foi possível carregar os produtos.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CATEGORIAS AJUSTADAS
  const categoryMap = {
    Bebidas: [3, 4],
    Sobremesas: 1,
    Salgados: 2,
  };

  const filteredItems = products
    .filter((product) => {
      if (!activeCategory) return true;

      const mappedId = categoryMap[activeCategory];
      const productCategoryId = Number(product.category_id);

      if (Array.isArray(mappedId)) return mappedId.includes(productCategoryId);

      return productCategoryId === mappedId;
    })
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={styles.menuPage}>
      <Header />

      <section className={styles.menuBanner}>
        <Image
          src={"/img/menuSpecial.png"}
          alt="Menu Banner"
          width={1300}
          height={500}
          className={styles.menuBannerImage}
        />
      </section>

      {/* 🔍 BUSCA */}
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

      <main className={styles.mainMenu}>
        {/* 📌 FILTROS */}
        <div className={styles.categoriesSection}>
          <div
            className={`${styles.categoryBox} ${
              activeCategory === null ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(null)}
          >
            <p className={styles.categoryTitle}>Todos</p>
          </div>

          <div
            className={`${styles.categoryBox} ${
              activeCategory === "Bebidas" ? styles.active : ""
            }`}
            onClick={() => setActiveCategory("Bebidas")}
          >
            <p className={styles.categoryTitle}>Bebidas</p>
          </div>

          <div
            className={`${styles.categoryBox} ${
              activeCategory === "Sobremesas" ? styles.active : ""
            }`}
            onClick={() => setActiveCategory("Sobremesas")}
          >
            <p className={styles.categoryTitle}>Sobremesas</p>
          </div>

          <div
            className={`${styles.categoryBox} ${
              activeCategory === "Salgados" ? styles.active : ""
            }`}
            onClick={() => setActiveCategory("Salgados")}
          >
            <p className={styles.categoryTitle}>Salgados</p>
          </div>
        </div>

        {/* 🛒 LISTA */}
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
            filteredItems.map((item) => <FoodCard key={item.id} item={item} />)
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
