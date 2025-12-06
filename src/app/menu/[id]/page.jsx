"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Header from "../../../components/headerUser/Header";
import styles from "./foodId.module.css";
import { Flex, InputNumber, message } from "antd";

export default function FoodDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Pega o usuário do sessionStorage
    const userSession = sessionStorage.getItem("usuario");
    if (userSession) {
      const user = JSON.parse(userSession);
      setUserId(user.id);
    } else {
      message.warning("Você precisa estar logado para adicionar ao carrinho!");
      router.push("/login"); // Redireciona para login se não estiver logado
    }
  }, [router]);

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

  const handleAddToCart = async () => {
    if (!product) return;

    if (!userId) {
      message.error("Você precisa estar logado para adicionar ao carrinho!");
      router.push("/login");
      return;
    }

    setAdding(true);
    try {
      // Primeiro, verifica/cria o carrinho do usuário
      const cartResponse = await axios.get(
        `http://localhost:4000/api/users/cart/${userId}`
      );

      const cart_id = cartResponse.data.cart.id;
      setCartId(cart_id);

      const response = await axios.post("http://localhost:4000/api/cart_items", {
        cart_id,
        product_id: product.id,
        featured_product_id: product.id,
        quantity,
      });

      message.success("Produto adicionado ao carrinho!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      message.error("Erro ao adicionar ao carrinho");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  const sharedProps = {
    min: 1,
    max: 10,
    value: quantity,
    onChange: (val) => setQuantity(val),
    style: { width: 150 },
  };
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* Bolas decorativas */}
        <div className={`${styles.ball} ${styles.ball1}`} />
        <div className={`${styles.ball} ${styles.ball2}`} />
        <div className={`${styles.ball} ${styles.ball3}`} />

        {/* Conteúdo principal */}
        <section className={styles.content}>
          {/* Texto */}
          <div className={styles.info}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.price}>Preço: R$ {product.price}</p>

            <div className={styles.descriptionBox}>
              <div className={styles.text}>
                <p>{product.description}</p>
                {product.inspiration && (
                  <p className={styles.inspiration}>
                    {product.inspiration}
                  </p>
                )}
              </div>

              {product.photo_inspiration && (
                <aside className={styles.book}>
                  <Image
                    src={`http://localhost:4000/uploads/${product.photo_inspiration}.jpg`}
                    alt={
                      product.name
                        ? `${product.name} inspiração`
                        : "Inspiração"
                    }
                    width={300}
                    height={300}
                    className={styles.inspirationPhoto}
                    unoptimized
                  />
                </aside>
              )}
                          <div className={styles.actions}>
              <Flex vertical gap="middle">
                <InputNumber {...sharedProps} />
              </Flex>

              <button
                className={styles.addButton}
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? "Adicionando..." : "Adicionar"}
                <ShoppingCart className={styles.link} />
              </button>


            </div>
            <button
              className={styles.backButton}
              onClick={() => router.push("/menu")}
            >
              Voltar ao Menu
            </button>
            </div>
            </div>

          <div className={styles.imageContainer}>
            <Image
              src={
                product.photo
                  ? `http://localhost:4000/uploads/${product.photo}.jpg`
                  : "/img/logo.png"
              }
              alt={product.name || "Item sem nome"}
              width={620}
              height={620}
              className={styles.productPhoto}
              unoptimized
            />
          </div>
        </section>
      </main>
    </div>
  );
}
