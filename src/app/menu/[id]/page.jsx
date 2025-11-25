"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Header from "../../../components/header";
import styles from "./foodId.module.css";

export default function FoodDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }
  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.productBanner}>
        <div className={styles.semiCircle}>
          <Image
            src={
              product.photo
                ? `http://localhost:3000/uploads/${product.photo}.jpg`
                : "/img/logo.png"
            }
            alt={product.name || "Item sem nome"}
            width={650}
            height={600}
            className={styles.productPhoto}
            unoptimized
          />
        </div>
      </section>
    </div>
  );
}
