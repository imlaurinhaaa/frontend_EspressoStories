"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../../components/header'
import styles from './page.module.css'
import Image from 'next/image'
import CardFilter from '../../components/cardFilter';

export default function Menu() {
  

  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try{
      setIsLoading(true);
      console.log('Fetching products...');

      const response = await axios.get('http://localhost:3000/api/products');
      console.log('Products received:', response.data);

      sessionStorage.setItem('products', JSON.stringify(response.data));
      console.log('Products stored in sessionStorage.');

      setProducts(response.data);

    } catch (error) {
      console.error('Error fetching products:', error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const produtosArmazenados = sessionStorage.getItem('products');
    if (produtosArmazenados) {
      const produtos = JSON.parse(produtosArmazenados);
      setProducts(produtos);
      console.log('Produtos carregados da sessionStorage:', produtos);
    }
  }, []);
  

  return (
    <>
      <Header />
      <section className={styles.menuBanner}>
        <Image src={"/img/menuBanner.png"} alt="Menu Banner" width={1300} height={500} className={styles.menuBannerImage} />
      </section>
    </>
  )
}
