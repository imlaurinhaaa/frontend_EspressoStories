"use client";

import styles from "./[id].module.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import HeaderAdmin from "../../../../components/headerAdmin/HeaderAdmin";
import axios from "axios";

export default function EditProduct() {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [isBranchOpen, setIsBranchOpen] = useState(false);
    const fileInputRef = useRef(null);
    const selectRef = useRef(null);
    const branchSelectRef = useRef(null);
    const nameRef = useRef(null);
    const descRef = useRef(null);
    const priceRef = useRef(null);
    const pathname = usePathname();

    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (!id) return;
        let mounted = true;
        (async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/products/${id}`);
                if (!res.ok) {
                    console.error('Erro ao buscar produto, status:', res.status);
                    return;
                }
                const data = await res.json();
                const prod = data.product ?? data;
                if (mounted) setProduct(prod);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        })();
        return () => { mounted = false; };
    }, [id]);

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
        { value: 'belém', label: 'Belém - PA' },
        { value: 'caxias do sul', label: 'Caxias do Sul - RS' },
        { value: 'fortaleza', label: 'Fortaleza - CE' },
        { value: 'rio de janeiro', label: 'Rio de Janeiro - RJ' },
        { value: 'são paulo', label: 'São Paulo - SP' }
    ];

    const atualizarComPut = async (produtoEditando) => {
        try {
            console.log('Produto a ser atualizado:', produtoEditando);
            const payload = {
                id: produtoEditando.id,
                name: produtoEditando.name,
                description: produtoEditando.description,
                price: produtoEditando.price !== undefined && produtoEditando.price !== null ? String(produtoEditando.price) : '',
                category_name: produtoEditando.category_name,
                branch: produtoEditando.branch
            };
            console.debug('Enviando payload PUT:', payload, 'price type:', typeof payload.price);

            const response = await axios.put(
                `http://localhost:4000/api/products/${id}`,
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Atualização bem-sucedida:', response.data);

            const updated = response.data.product ?? response.data;
            setProduct(updated);
            alert('Produto atualizado com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            if (error.response) {
                console.error('Resposta do servidor:', error.response.status, error.response.data);
                alert('Erro ao atualizar o produto: ' + (error.response.data?.message || JSON.stringify(error.response.data)));
            } else if (error.request) {
                console.error('Nenhuma resposta do servidor, request enviado:', error.request);
                alert('Erro: sem resposta do servidor. Verifique se o backend está rodando e CORS.');
            } else {
                alert('Erro ao atualizar o produto: ' + error.message);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const produtoEditando = {
            id: id,
            name: nameRef.current?.value ?? product?.name,
            description: descRef.current?.value ?? product?.description,
            price: priceRef.current?.value ? parseFloat(priceRef.current.value) : product?.price,
            category_name: selectedCategory || product?.category_name,
            branch: selectedBranch || product?.branch
        };

        await atualizarComPut(produtoEditando);
    };

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
                width={300}
                height={300}
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
                <h1 className={styles.title}>EDITAR PRODUTO</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.postBlock} onClick={handleImageClick} style={{ position: 'relative' }}>
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
                            <p className={styles.imageText} style={{
                                position: 'absolute',
                                top: '8px',
                                left: '8px',
                                margin: 0,
                                color: '#fff',
                                background: 'rgba(0,0,0,0.45)',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                zIndex: 3,
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}>Foto atual</p>
                            <Image
                                src={
                                    product?.photo
                                        ? `http://localhost:4000/uploads/${product.photo}.jpg`
                                        : "/img/logo.png"
                                }
                                alt={product?.name || "Produto sem nome"}
                                width={150}
                                height={150}
                                className={styles.productPhoto}
                                unoptimized
                            />
                        </>
                    )}
                </div>
                <form className={styles.postForm} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={'Nome do Produto'}
                        defaultValue={product?.name ?? ''}
                        className={styles.formInput}
                        ref={nameRef}
                    />
                    <textarea
                        placeholder={'Descrição do Produto'}
                        defaultValue={product?.description ?? ''}
                        className={styles.formInput}
                        rows={4}
                        ref={descRef}
                    />
                    <input
                        type="number"
                        placeholder={'Preço do Produto (R$)'}
                        defaultValue={product?.price ?? ''}
                        step="0.01"
                        className={styles.formInput}
                        ref={priceRef}
                    />
                    <div className={styles.customSelect} ref={selectRef}>
                        <div
                            className={`${styles.selectHeader} ${isCategoryOpen ? styles.selectOpen : ''}`}
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                            <span className={selectedCategory ? styles.selectedText : styles.placeholderText}>
                                {selectedCategory ? categoryOptions.find(opt => opt.value === selectedCategory)?.label : (product?.category_name ?? 'Categoria')}
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
                        <button type="button" className={styles.cancelButton} onClick={() => window.history.back()}>
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