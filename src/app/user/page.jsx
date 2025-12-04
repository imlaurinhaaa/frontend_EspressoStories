"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './user.module.css';
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer/footer";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [cartData, setCartData] = useState(null); // <<< ADICIONADO
    const fileInputRef = useRef(null);

    // Carrega usuário do sessionStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const raw = sessionStorage.getItem('usuario');
            if (raw) {
                try {
                    setUser(JSON.parse(raw));
                } catch (err) {
                    console.error("Erro ao ler usuário do sessionStorage:", err);
                }
            }
        }
    }, []);

    // Carrega endereço
    useEffect(() => {
        const fetchAddress = async () => {
            if (user && user.id) {
                try {
                    const response = await axios.get(
                        `http://localhost:4000/api/user_addresses/${user.id}`
                    );

                    const addressData = response.data.user_addresses || null;

                    setAddress(addressData);

                } catch (error) {
                    console.error("Erro ao buscar endereço:", error);
                }
            }
        };

        fetchAddress();
    }, [user]);

    // <<< ADICIONADO — CARREGAR PEDIDOS (CARRINHO SALVO)
    useEffect(() => {
        const loadCart = async () => {
            if (!user || !user.id) return;

            try {
                const res = await fetch(`http://localhost:4000/api/users/cart/${user.id}`);
                const data = await res.json();
                setCartData(data);
            } catch (err) {
                console.error("Erro ao carregar pedidos:", err);
            }
        };

        loadCart();
    }, [user]);

    const getUserPhoto = () => {
        if (!user || !user.photo) return "/img/logo.png";
        return `http://localhost:4000/uploads/${user.photo}`;
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file || !user) return;

        const formData = new FormData();
        formData.append("photo", file);

        try {
            const response = await axios.put(
                `http://localhost:4000/api/users/${user.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const updatedPhoto = response.data.updatedUser.photo;
            const updatedUser = { ...user, photo: updatedPhoto };

            setUser(updatedUser);
            sessionStorage.setItem("usuario", JSON.stringify(updatedUser));

            alert("Foto atualizada com sucesso!");
        } catch (err) {
            console.error("Erro ao atualizar foto:", err);
            alert("Erro ao atualizar foto. Tente novamente.");
        }
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <Image className={`${styles.ballImage} ${styles.position1}`} src="/img/ball.png" alt="Ball" width={400} height={400} />
                <Image className={`${styles.ballImage} ${styles.position2}`} src="/img/ball.png" alt="Ball" width={80} height={80} />

                <div className={styles.contentContainer}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            {user ? `Bem-vindo (a), ${user.name}!` : "Carregando..."}
                        </h1>
                    </div>

                    <div
                        className={styles.photoContainer}
                        onClick={handleImageClick}
                        style={{ cursor: "pointer", position: "relative" }}
                    >
                        <Image
                            src={getUserPhoto()}
                            width={200}
                            height={200}
                            alt="User Profile"
                            className={styles.adminPhoto}
                            unoptimized
                        />

                        <div className={styles.editOverlay}>
                            <span>Alterar Foto</span>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.addressSection}>
                            <h2 className={styles.addressTitle}>Informações de Endereço</h2>

                            {address ? (
                                <table className={styles.addressTable}>
                                    <tbody>
                                        <tr><th>CEP</th><td>{address.cep}</td></tr>
                                        <tr><th>Rua</th><td>{address.street}</td></tr>
                                        <tr><th>Número</th><td>{address.number}</td></tr>
                                        <tr><th>Complemento</th><td>{address.complement}</td></tr>
                                        <tr><th>Bairro</th><td>{address.neighborhood}</td></tr>
                                        <tr><th>Cidade</th><td>{address.city}</td></tr>
                                        <tr><th>Estado</th><td>{address.state}</td></tr>
                                        <tr><th>Ponto de Referência</th><td>{address.reference_point}</td></tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p style={{ fontSize: "1.2rem", color: "#888" }}>Nenhum endereço cadastrado.</p>
                            )}
                        </div>

                        <div className={styles.orderHistorySection}>
                            {cartData && cartData.items ? (
                                cartData.items.length === 0 ? (
                                    <div className={styles.cartItems}>
                                        <div className={styles.cartItem}>
                                            <p style={{ fontSize: "1.2rem", color: "#888", margin: 0 }}>Nenhum pedido realizado até o momento.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.cartItems}>
                                        {cartData.items.map(item => {
                                            const productName = item.product_name || item.featured_product_name || "Produto Desconhecido";

                                            const productPhoto = item.product_photo
                                                ? `http://localhost:4000/uploads/${item.product_photo}${item.product_photo.includes('.') ? '' : '.jpg'}`
                                                : item.featured_product_photo
                                                    ? `http://localhost:4000/uploads/${item.featured_product_photo}${item.featured_product_photo.includes('.') ? '' : '.jpg'}`
                                                    : "/img/logo.png";

                                            const productPrice = item.product_price || item.featured_product_price || 0;

                                            return (
                                                <div key={item.id} className={styles.cartItem}>
                                                    <Image
                                                        src={productPhoto}
                                                        alt={productName}
                                                        width={160}
                                                        height={120}
                                                        className={styles.productPhoto}
                                                        unoptimized
                                                    />

                                                    <div className={styles.itemInfo}>
                                                        <h3 className={styles.subTitle}>{productName}</h3>

                                                        <p className={styles.text}>Preço: R$ {Number(productPrice).toFixed(2)}</p>

                                                        <p className={styles.itemTotal}>
                                                            Total do item: <strong>R$ {Number(item.total_item_price || 0).toFixed(2)}</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            ) : null}
                        </div>
                    </div>

                    <Link className={styles.button} href="/">Sair</Link>
                </div>
            </main>
        <Footer />
        </div>
    );
}
