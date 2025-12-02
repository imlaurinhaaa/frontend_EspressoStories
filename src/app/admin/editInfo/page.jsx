'use client'

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './editInfo.module.css';
import Image from "next/image";
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin';
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useStore } from '../../../context/StoreContext';

export default function EditInfo() {
    const fileInputRef = useRef(null);
    const selectRef = useRef(null); // Define selectRef como uma referência
    const branchSelectRef = useRef(null); // Define branchSelectRef como uma referência
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { storeInfo, setStoreInfo } = useStore();

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
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedInfo = {
            name: event.target.lojaName.value,
            hours: event.target.openingHours.value,
            contact: event.target.contact.value,
            description: event.target.description.value,
            image: imagePreview || storeInfo.image,
        };
        setStoreInfo(updatedInfo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        setIsConfirmed(true);
        setTimeout(() => {
            setIsConfirmed(false);
            router.push('/admin/about');
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <HeaderAdmin />
            <div className={styles.backBanner}>
                <Image
                    src="/img/fachadaEspresso02.png"
                    alt="Imagem da fachada"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top', filter: 'blur(2px) brightness(50%)' }}
                />
            </div>

            <Image
                src="/img/ball.png"
                alt="Ball"
                width={250}
                height={250}
                className={`${styles.ballImage} ${styles.position}`}
            />

            <Image
                src="/img/ball.png"
                alt="Ball"
                width={90}
                height={90}
                className={`${styles.ballImage} ${styles.position2}`}
            />

            <Image
                src="/img/ball.png"
                alt="Ball"
                width={400}
                height={400}
                className={`${styles.ballImage} ${styles.position3}`}
            />

            <div className={styles.rowArea}>
                <section className={styles.editArea}>
                    <section className={styles.sectionEdit}>
                        <h2>Editar Informações do Café</h2>
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '90%' }}
                        >
                            <label htmlFor="openingHours">Nome da loja:</label>
                            <input type="text" id="lojaName" name="lojaName" placeholder="Espresso Stories" className={styles.input} />

                            <label htmlFor="openingHours">Horário de Funcionamento:</label>
                            <input type="text" id="openingHours" name="openingHours" placeholder="Ex: Seg-Sex: 8h-18h" className={styles.input} />

                            <label htmlFor="contact">Contato:</label>
                            <input type="tel" id="contact" name="contact" placeholder="(11) 1234-5678" maxLength="15" className={styles.input} />

                            <label htmlFor="location">Descrição da loja:</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Descrição da loja..."
                                rows="5"
                                style={{ resize: "vertical" }}
                                className={styles.input}
                            />

                            <button type="submit" className={styles.button}>Salvar Alterações</button>
                        </form>
                    </section>
                    <section className={styles.sectionEdit}>
                        <h2>Editar Foto do Café</h2>
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
                                        Edite a imagem do produto
                                    </p>
                                </>
                            )}
                        </div>
                    </section>
                </section>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <p>Tem certeza de que deseja salvar as alterações?</p>
                        <div className={styles.modalActions}>
                            <button onClick={closeModal} className={styles.buttonCancel}>Cancelar</button>
                            <button onClick={handleConfirm} className={styles.button}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmed && (
                <div className={styles.confirmation}>
                    <CheckCircleOutlined className={styles.checkIcon} />
                    <p>Alterações salvas com sucesso!</p>
                </div>
            )}
        </div>
    );
}