"use client";

import styles from "./createProduct.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HeaderAdmin from "../../../components/headerAdmin/HeaderAdmin";

export default function CreateProduct() {
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [imagePreview1, setImagePreview1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [isBranchOpen, setIsBranchOpen] = useState(false);
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const selectRef = useRef(null);
    const branchSelectRef = useRef(null);
    const pathname = usePathname();

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

    const handleImageClick = (index) => {
        if (index === 1) fileInputRef1.current?.click();
        if (index === 2) fileInputRef2.current?.click();
    };

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (index === 1) setImagePreview1(e.target.result);
                if (index === 2) setImagePreview2(e.target.result);
            };
            reader.readAsDataURL(file);
            if (index === 1) setSelectedImage1(file);
            if (index === 2) setSelectedImage2(file);
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
        { value: 'belém', label: 'Belém - PA' },
        { value: 'caxias do sul', label: 'Caxias do Sul - RS' },
        { value: 'fortaleza', label: 'Fortaleza - CE' },
        { value: 'rio de janeiro', label: 'Rio de Janeiro - RJ' },
        { value: 'são paulo', label: 'São Paulo - SP' }
    ];

    return (
        <div className={styles.page}>
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
            <Image
                className={`${styles.ballImage} ${styles.position3}`}
                src="/img/ball.png"
                alt="Ball"
                width={250}
                height={250}
            />
            <Image
                className={`${styles.ballImage} ${styles.position4}`}
                src="/img/ball.png"
                alt="Ball"
                width={350}
                height={350}
            />
            <Image
                className={`${styles.ballImage} ${styles.position5}`}
                src="/img/ball.png"
                alt="Ball"
                width={100}
                height={100}
            />
            <HeaderAdmin />
            <div className={styles.titleSection}>
                <h1 className={styles.title}>CRIAR PRODUTO</h1>
            </div>
            <div className={styles.buttonSection}>
                <Link href="/admin/createGeral" className={`${styles.navButton} ${pathname === '/admin/createGeral' ? styles.activeButton : ''}`}>
                    GERAL
                </Link>
                <Link href="/admin/createFilial" className={`${styles.navButton} ${pathname === '/admin/createFilial' ? styles.activeButton : ''}`}>
                    FILIAL
                </Link>
            </div>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.postBlock} onClick={() => handleImageClick(1)}>
                        <input
                            type="file"
                            ref={fileInputRef1}
                            onChange={(e) => handleImageChange(e, 1)}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        {imagePreview1 ? (
                            <Image
                                src={imagePreview1}
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
                            rows={11}
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
                    </form>
                </div>
                <div className={styles.section}>
                    <div className={`${styles.postBlock} ${styles.postBlockSmall}`} onClick={() => handleImageClick(2)}>
                        <input
                            type="file"
                            ref={fileInputRef2}
                            onChange={(e) => handleImageChange(e, 2)}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        {imagePreview2 ? (
                            <Image
                                src={imagePreview2}
                                alt="Preview do produto"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '20px' }}
                            />
                        ) : (
                            <>
                                <PlusCircleOutlined className={styles.addImageIcon} />
                                <p className={styles.addImageText}>
                                    Livro de Inspiração
                                </p>
                            </>
                        )}
                    </div>
                    <div className={styles.postForm}>
                        <input
                            type="text"
                            placeholder="Livro de Inspiração"
                            className={styles.formInput}
                        />
                        <div className={styles.buttonSection}>
                            <button type="submit" className={styles.cancelButton}>
                                CANCELAR
                            </button>
                            <button type="submit" className={styles.submitButton}>
                                SALVAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}