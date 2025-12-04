"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Header from "../../../components/headerUser/Header";
import styles from "./foodId.module.css";
import { Flex, InputNumber } from "antd";

export default function FoodDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${id}`
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

  const onChange = (value) => {
    console.log("changed", value);
  };

  const sharedProps = {
    min: 1,
    max: 10,
    defaultValue: 3,
    onChange,
    style: { width: 150 },
  };

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.productBanner}>
        <div className={styles.semiCircle}>
          <Image
            src={
              product.photo
                ? `http://localhost:4000/uploads/${product.photo}.jpg`
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

      <section className={styles.productDetails}>
        <div className={styles.productHeader}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.price}>Preço: R$ {product.price}</p>
        </div>

        <div className={styles.info}>
          <div className={styles.sobre}>
            <h3 className={styles.subTitle}>Sobre</h3>
            <div className={styles.descriptionBox}>
                <div className={styles.text}>
              <p>{product.description}</p>
              {product.inspiration && <p className={styles.inspiration}>{product.inspiration}</p>}
                </div>
              {product.photo_inspiration && (
                <aside className={styles.book}>
                  <Image
                    src={`http://localhost:4000/uploads/${product.photo_inspiration}.jpg`}
                    alt={
                      product.name ? `${product.name} inspiração` : "Inspiração"
                    }
                    width={300}
                    height={300}
                    className={styles.inspirationPhoto}
                    unoptimized
                  />
                </aside>
              )}
            </div>
          </div>

          <aside className={styles.quantitySection}>
            <h3 className={styles.subTitle}>Quantidade</h3>
            <Flex vertical gap="middle">
              <InputNumber {...sharedProps} />
            </Flex>
          </aside>
        </div>

        <button
          className={styles.backButton}
          onClick={() => router.push("/menu")}
        >
          Voltar ao Menu
        </button>
      </section>
    </div>
  );
}
