"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './ProductAdmin.module.css';
import { useState } from "react";
import axios from 'axios';

export default function ProductAdmin({ item, onDelete }) {
    const [deletingId, setDeletingId] = useState(null);

    const deletarProduto = async (productId, productName) => {
        const confirmacao = window.confirm(`Tem certeza que deseja deletar "${productName}"? Esta ação não pode ser desfeita!`);
        if (!confirmacao) return;

        try {
            setDeletingId(productId);
            console.log(`Deletando produto ID: ${productId}`);

            const response = await axios.delete(`http://localhost:4000/api/products/${productId}`);

            console.log('Produto deletado com sucesso:', response.status);

            if (typeof onDelete === 'function') {
                onDelete(productId);
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error('❌ Erro ao deletar produto', error);
            alert('Falha ao deletar produto. Veja o console para mais detalhes.');
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.imageProduct}>
                <Image
                    src={
                        item.photo
                            ? `http://localhost:4000/uploads/${item.photo}.jpg`
                            : "/img/logo.png"
                    }
                    alt={item.name || "Item sem nome"}
                    width={150}
                    height={150}
                    className={styles.productPhoto}
                    unoptimized
                />
            </div>
            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{item.name}</h2>
                <p className={styles.productDescription}>{item.description}</p>
                <p className={styles.productPrice}>R$ {item.price}</p>
            </div>
                {item.photo_inspiration && (
                    <Image
                        src={`http://localhost:4000/uploads/${item.photo_inspiration}.jpg`}
                        alt={item.name || "Item sem nome"}
                        width={150}
                        height={150}
                        className={styles.productPhoto}
                        unoptimized
                    />
                )}
                <div className={styles.buttonsContainer}>
                    <Link 
                    href={`/admin/editProduct/${item.id}`}
                    className={styles.updateButton}>Editar</Link>
                    <button 
                        className={styles.deleteButton}
                        onClick={() => deletarProduto(item.id, item.name)}
                        disabled={deletingId === item.id}
                        ><h3>Apagar</h3></button>
                </div>
        </div>
    );
}