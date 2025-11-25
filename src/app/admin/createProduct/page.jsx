"use client";

import styles from "./createProduct.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import Image from "next/image";

export default function CreateProduct() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>CRIAR PRODUTO</h1>
            <div className={styles.container}>
                <div className={styles.postBlock} onClick={handleImageClick}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />

                    {imagePreview ? (
                        <Image
                            src={imagePreview}
                            alt="Preview do produto"
                            fill
                            style={{ objectFit: 'cover', borderRadius: '20px' }}
                        />
                    ) : (
                        <>
                            <PlusCircleOutlined className={styles.addImageIcon} />
                            <p className={styles.addImageText}>
                                Adicione a imagem do novo produto!
                            </p>
                        </>
                    )}
                </div>
                <form className={styles.postForm}>
                    <input 
                        type="text" 
                        placeholder="Nome do Produto" 
                        className={styles.formInput}
                    />
                    <textarea 
                        placeholder="Descrição do Produto" 
                        className={styles.formInput}
                        rows={4}
                    />
                    <input 
                        type="number" 
                        placeholder="Preço do Produto (R$)" 
                        step="0.01"
                        className={styles.formInput}
                    />
                    <select className={styles.formInput}>
                        <option value="">Selecione uma categoria</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="doces">Doces</option>
                        <option value="salgados">Salgados</option>
                    </select>
                    <button type="submit" className={styles.submitButton}>
                        Criar Produto
                    </button>
                </form>
            </div>
        </div>
    );
}