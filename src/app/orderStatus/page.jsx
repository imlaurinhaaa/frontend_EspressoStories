"use client";

import { useState, useEffect } from "react";
import { Steps, Rate } from "antd";
import { CheckOutlined, CarOutlined, ShoppingOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./page.module.css";

export default function OrderStatus() {
    const stepsList = [
        { title: "Pedido em Preparo", icon: <ShoppingOutlined /> },
        { title: "Pedido Pronto", icon: <CheckOutlined /> },
        { title: "Pedido a Caminho", icon: <CarOutlined /> },
        { title: "Pedido Entregue", icon: <CheckOutlined /> }
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false); 

    useEffect(() => {
        const storedStep = localStorage.getItem("order_step");
        
        const nextStep = storedStep ? (parseInt(storedStep) + 1) % stepsList.length : 0;
        
        setCurrentStep(nextStep);
        localStorage.setItem("order_step", nextStep);
    }, []);

    const handleSubmitFeedback = () => {
        if (rating === 0) {
            alert("Por favor, selecione uma nota antes de enviar.");
            return;
        }
        
        console.log(`Avaliação enviada: ${rating} estrelas`);
        console.log(`Comentário: ${comment}`);

        alert(`Avaliação enviada com sucesso!\nNota: ${rating}/5\nComentário: "${comment}"`);
        
        setHasSubmitted(true);
    };

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.banner}>
                <Image
                    src="/img/imageRota.png"
                    alt="Banner mapa"
                    fill
                    priority
                    quality={100}
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div className={styles.card}>
                <h3 className={styles.title}>Detalhes do seu pedido</h3>

                <Steps
                    current={currentStep}
                    className={styles.steps}
                    items={stepsList.map((step, index) => ({
                        title: step.title,
                        icon: step.icon,
                        status:
                            index < currentStep
                                ? "finish"
                                : index === currentStep
                                    ? "process"
                                    : "wait"
                    }))}
                />

                {currentStep === 3 && !hasSubmitted && (
                    <>
                        <div className={styles.ratingArea}>
                            <p>Avalie nosso produto:</p>

                            <Rate
                                allowClear={false}
                                value={rating}
                                onChange={setRating}
                                style={{ fontSize: "38px", color: "#ffc700" }}
                            />
                        </div>

                        <div className={styles.commentBox}>
                            <label>Deixe seu comentário:</label>
                            <textarea 
                                placeholder="Escreva aqui ..." 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            className={styles.submitFeedbackBtn} 
                            onClick={handleSubmitFeedback}
                            disabled={rating === 0}
                        >
                            {rating === 0 ? "Por favor, avalie" : "Enviar Avaliação"}
                        </button>
                    </>
                )}
                
                {currentStep === 3 && hasSubmitted && (
                    <div className={styles.confirmationArea}>
                        <CheckOutlined style={{ fontSize: '48px', color: '#38c24c', marginBottom: '15px' }} />
                        <h4 className={styles.confirmationMessage}>Obrigado por sua avaliação!</h4>
                        <p>Seu feedback é muito importante para nós.</p>
                    </div>
                )}
                
                {currentStep !== 3 && (
                     <p className={styles.statusMessage}>Acompanhe o status do seu pedido acima.</p>
                )}
            </div>
        </div>
    );
}