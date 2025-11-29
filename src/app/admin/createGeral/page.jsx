"use client";

import styles from "./createProduct.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import filialStyles from "../createFilial/createProduct.module.css";

export default function CreateProduct() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedInspirationImage, setSelectedInspirationImage] = useState(null);
    const [inspirationImagePreview, setInspirationImagePreview] = useState(null);
    
    const fileInputRef = useRef(null);
    const inspirationFileInputRef = useRef(null);

    const pathname = usePathname();

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleInspirationImageClick = () => {
        inspirationFileInputRef.current?.click();
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

    const handleInspirationImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedInspirationImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setInspirationImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>CRIAR PRODUTO</h1>
            <div className={filialStyles.buttonSection}>
                <Link href="/admin/createGeral" className={`${filialStyles.navButton} ${pathname === '/admin/createGeral' ? filialStyles.activeButton : ''}`}>
                    GERAL
                </Link>
                <Link href="/admin/createFilial" className={`${filialStyles.navButton} ${pathname === '/admin/createFilial' ? filialStyles.activeButton : ''}`}>
                    FILIAL
                </Link>
            </div>
            <div className={styles.container}>
                <div className={styles.imagesContainer}>
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
                                className={styles.imageStyle}
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
                    <div className={styles.postBlock} onClick={handleInspirationImageClick}>
                        <input
                            type="file"
                            ref={inspirationFileInputRef}
                            onChange={handleInspirationImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />

                        {inspirationImagePreview ? (
                            <Image
                                src={inspirationImagePreview}
                                alt="Preview do livro de inspiração"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '20px' }}
                            />
                        ) : (
                            <>
                                <PlusCircleOutlined className={styles.addImageIcon} />
                                <p className={styles.addImageText}>
                                    Adicione o livro de inspiração!
                                </p>
                            </>
                        )}
                    </div>
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
                    <input 
                        type="text" 
                        placeholder="Livro de Inspiração" 
                        step="0.01"
                        className={styles.formInput}
                    />
                    <select className={styles.formInput}>
                        <option value="">Selecione uma categoria</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="doces">Doces</option>
                        <option value="salgados">Salgados</option>
                    </select>
                    <div className={styles.buttonContainer}>
                    <Link href="menu" className={styles.submitButton}>
                        <h1>CANCELAR</h1>
                    </Link>
                    <button type="submit" className={styles.submitButton}>
                        CRIAR PRODUTO
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}