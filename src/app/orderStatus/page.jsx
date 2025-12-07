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

    useEffect(() => {
        const storedStep = localStorage.getItem("order_step");
        const nextStep = storedStep ? (parseInt(storedStep) + 1) % stepsList.length : 0;
        setCurrentStep(nextStep);
        localStorage.setItem("order_step", nextStep);
    }, []);

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

                {currentStep === 3 && (
                    <button className={styles.receivedBtn}>Pedido Entregue!</button>
                )}

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
                    <textarea placeholder="Escreva aqui ..." />
                </div>
            </div>
        </div>
    );
}