"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './user.module.css';
import axios from "axios";
import Header from "../../components/header";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const raw = sessionStorage.getItem('usuario');
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    // Use setTimeout to avoid synchronous setState warning
                    setTimeout(() => {
                        setUser(parsed);
                    }, 0);
                } catch (err) {
                    console.error("Erro ao ler usuário do sessionStorage:", err);
                }
            }
        }
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            if (user && user.id) {
                try {
                    console.log("Buscando endereço para user_id:", user.id);
                    const response = await axios.get(`http://localhost:4000/api/user_addresses?user_id=${user.id}`);
                    console.log("Resposta endereço:", response.data);

                    let addressData = null;

                    // Verifica se veio no formato { addresses: [...] } como no checkout
                    if (response.data.addresses && Array.isArray(response.data.addresses)) {
                        // Tenta pegar o padrão ou o primeiro
                        addressData = response.data.addresses.find(addr => addr.is_default) || response.data.addresses[0];
                    }
                    // Verifica se veio como array direto
                    else if (Array.isArray(response.data)) {
                        addressData = response.data.find(addr => addr.is_default) || response.data[0];
                    }
                    // Verifica se veio como objeto único
                    else {
                        addressData = response.data;
                    }

                    setAddress(addressData);
                } catch (error) {
                    console.error("Erro ao buscar endereço:", error);
                }
            }
        };

        fetchAddress();
    }, [user]);

    const getUserPhoto = () => {
        if (!user || !user.photo) return "/img/logo.png";

        const filename = user.photo;

        return `http://localhost:4000/uploads/${filename}.jpg`;
    };

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file || !user) return;

        const formData = new FormData();
        formData.append('photo', file);

        try {
            const response = await axios.put(`http://localhost:4000/api/users/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const updatedUser = { ...user, photo: response.data.photo || response.data.filename || file.name };

            setUser(updatedUser);
            sessionStorage.setItem('usuario', JSON.stringify(updatedUser));
            alert("Foto atualizada com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar foto:", error);
            alert("Erro ao atualizar foto. Tente novamente.");
        }
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <Image
                    className={`${styles.ballImage} ${styles.position1}`}
                    src="/img/ball.png"
                    alt="Ball"
                    width={400}
                    height={400}
                />
                <Image
                    className={`${styles.ballImage} ${styles.position2}`}
                    src="/img/ball.png"
                    alt="Ball"
                    width={80}
                    height={80}
                />

                <div className={styles.contentContainer}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            {user ? `Bem-vindo (a), ${user.name}!` : "Carregando..."}
                        </h1>
                    </div>

                    <div className={styles.photoContainer} onClick={handleImageClick} style={{ cursor: 'pointer', position: 'relative' }}>
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
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    <div className={styles.addressSection}>
                        <h2 className={styles.addressTitle}>Informações de Endereço</h2>
                        <table className={styles.addressTable}>
                            <tbody>
                                <tr>
                                    <th>CEP</th>
                                    <td>{address?.cep || "Não informado"}</td>
                                </tr>
                                <tr>
                                    <th>Rua</th>
                                    <td>{address?.street || "Não informado"}</td>
                                </tr>
                                <tr>
                                    <th>Número</th>
                                    <td>{address?.number || "Não informado"}</td>
                                </tr>
                                <tr>
                                    <th>Complemento</th>
                                    <td>{address?.complement || "Não informado"}</td>
                                </tr>
                                <tr>
                                    <th>Bairro</th>
                                    <td>{address?.neighborhood || "Não informado"}</td>
                                </tr>
                                <tr>
                                    <th>Cidade</th>
                                    <td>{address?.city || "Não informado"}</td>
                                </tr>
                                <tr>
                                    <th>Estado</th>
                                    <td>{address?.state || "Não informado"}</td>
                                </tr>
                                <tr>
                                    <th>Ponto de Referência</th>
                                    <td>{address?.reference_point || "Não informado"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Link className={styles.button} href="/admin/login">Sair</Link>
                </div>
            </main>
        </div>
    );
}
