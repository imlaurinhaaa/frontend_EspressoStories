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
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

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
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (index === 1) {
                setImagePreview1(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    photo: file // keep the File for multipart upload
                }));
                setSelectedImage1(file);
            }
            if (index === 2) {
                setImagePreview2(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    photo_inspiration: file // optional inspiration image
                }));
                setSelectedImage2(file);
            }
        };
        reader.readAsDataURL(file);
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

    const enviarDados = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            console.log('📤 Iniciando POST request...');
            console.log('📋 Dados enviados:', formData);

            // Validações
            if (!formData.name || !formData.name.trim()) {
                throw new Error('Nome do produto é obrigatório');
            }
            if (!formData.description || !formData.description.trim()) {
                throw new Error('Descrição do produto é obrigatória');
            }
            if (!formData.price || parseFloat(formData.price) <= 0) {
                throw new Error('Preço do produto deve ser maior que zero');
            }
            if (!selectedCategory) {
                throw new Error('Categoria é obrigatória');
            }
            if (!formData.photo) {
                throw new Error('Foto do produto é obrigatória - clique para selecionar uma imagem');
            }
            if (!imagePreview1) {
                throw new Error('Imagem do produto não foi carregada corretamente');
            }

            const categoryMap = {
                'bebidas': 1,
                'doces': 2,
                'salgados': 3
            };
            const category_id = categoryMap[selectedCategory] || null;

            const payload = new FormData();
            payload.append('category_id', category_id);
            payload.append('name', formData.name);
            payload.append('description', formData.description);
            payload.append('price', parseFloat(formData.price));
            if (formData.inspiration) payload.append('inspiration', formData.inspiration);
            if (formData.photo) payload.append('photo', formData.photo);
            if (formData.photo_inspiration) payload.append('photo_inspiration', formData.photo_inspiration);

            console.log('📦 Payload (FormData) pronto para envio');

            const response = await fetch(
                'http://localhost:4000/api/products',
                {
                    method: 'POST',
                    body: payload,
                }
            );

            console.log('✅ POST bem-sucedido!');
            console.log('📊 Status:', response.status);
            console.log('📡 Headers:', response.headers);

            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('❌ Resposta não é JSON:', text);
                throw new Error('Servidor retornou resposta inválida (não é JSON)');
            }
            
            console.log('📦 Dados:', data);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${data.message || data.error || 'Erro desconhecido'}`);
            }

            setResponse(data);
            setSuccess(true);

        } catch (error) {
            console.error('❌ Erro:', error);
            setError(error.message || 'Falha ao enviar dados');
        } finally {
            setLoading(false);
        }
    };

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        photo: '',
        inspiration: '',
        photo_inspiration: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        console.log(`🖊️ Campo: "${name}" com valor: ${value}`);

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                <p className={styles.subtitle}>Preencha os dados abaixo para criar um novo produto em todas as lojas.</p>
            </div>
            {error && (
                <div style={{
                    backgroundColor: '#fee',
                    color: '#c00',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    border: '1px solid #fcc'
                }}>
                    ❌ {error}
                </div>
            )}
            {success && (
                <div style={{
                    backgroundColor: '#efe',
                    color: '#0a0',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    border: '1px solid #cfc'
                }}>
                    ✅ Produto criado com sucesso!
                </div>
            )}
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
                            required
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
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nome do Produto"
                            className={styles.formInput}
                            required
                        />
                        <textarea
                            placeholder="Descrição do Produto"
                            value={formData.description}
                            name="description"
                            onChange={handleInputChange}
                            className={styles.formInput}
                            rows={11}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Preço do Produto (R$)"
                            step="0.01"
                            className={styles.formInput}
                            value={formData.price}
                            name="price"
                            onChange={handleInputChange}
                            required
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
                            name="inspiration"
                            value={formData.inspiration}
                            onChange={handleInputChange}
                        />
                        <div className={styles.buttonSection}>
                            <button type="submit" className={styles.cancelButton}>
                                CANCELAR
                            </button>
                            <button
                                type="submit" 
                                className={styles.submitButton}
                                onClick={enviarDados}>
                                SALVAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}