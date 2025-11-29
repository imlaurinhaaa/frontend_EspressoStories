"use client";

import styles from "./createProduct.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function CreateProduct() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [isBranchOpen, setIsBranchOpen] = useState(false);
    const fileInputRef = useRef(null);
    const selectRef = useRef(null);
    const branchSelectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (branchSelectRef.current && !branchSelectRef.current.contains(event.target)) {
                setIsBranchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsCategoryOpen(false);
    };

    const handleBranchSelect = (branch) => {
        setSelectedBranch(branch);
        setIsBranchOpen(false);
    };

    const categoryOptions = [
        { value: 'bebidas', label: 'Bebidas' },
        { value: 'doces', label: 'Doces' },
        { value: 'salgados', label: 'Salgados' }
    ];

    const branchOptions = [
        { value: 'belém', label: 'Belém' },
        { value: 'caxias do sul', label: 'Caxias do Sul' },
        { value: 'fortaleza', label: 'Fortaleza' },
        { value: 'rio de janeiro', label: 'Rio de Janeiro' },
        { value: 'são paulo', label: 'São Paulo' }
    ];

    return (
        <div className={styles.page}>
            <div className={styles.titleSection}>
                <h1 className={styles.title}>CRIAR PRODUTO</h1>
            </div>
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
                    <div className={styles.customSelect} ref={selectRef}>
                        <div
                            className={`${styles.selectHeader} ${isCategoryOpen ? styles.selectOpen : ''}`}
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                            <span className={selectedCategory ? styles.selectedText : styles.placeholderText}>
                                {selectedCategory ? categoryOptions.find(opt => opt.value === selectedCategory)?.label : 'Categoria'}
                            </span>
                            <span className={`${styles.selectArrow} ${isCategoryOpen ? styles.arrowUp : ''}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </span>
                        </div>
                        {isCategoryOpen && (
                            <div className={styles.selectOptions}>
                                {categoryOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`${styles.selectOption} ${selectedCategory === option.value ? styles.optionSelected : ''}`}
                                        onClick={() => handleCategorySelect(option.value)}
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.customSelect} ref={branchSelectRef}>
                        <div
                            className={`${styles.selectHeader} ${isBranchOpen ? styles.selectOpen : ''}`}
                            onClick={() => setIsBranchOpen(!isBranchOpen)}
                        >
                            <span className={selectedBranch ? styles.selectedText : styles.placeholderText}>
                                {selectedBranch ? branchOptions.find(opt => opt.value === selectedBranch)?.label : 'Filial Disponível'}
                            </span>
                            <span className={`${styles.selectArrow} ${isBranchOpen ? styles.arrowUp : ''}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </span>
                        </div>
                        {isBranchOpen && (
                            <div className={styles.selectOptions}>
                                {branchOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`${styles.selectOption} ${selectedBranch === option.value ? styles.optionSelected : ''}`}
                                        onClick={() => handleBranchSelect(option.value)}
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.buttonSection}>
                        <button type="submit" className={styles.cancelButton}>
                            CANCELAR
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            SALVAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}