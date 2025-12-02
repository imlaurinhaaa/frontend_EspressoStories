'use client';

import Image from "next/image";
import styles from "./login.module.css";
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const onFinish = async (values) => {
        setErro(null);
        setCarregando(true);

        try {
            const { data } = await axios.post("http://localhost:4000/api/login", {
                email: values.email,
                password_hash: values.password_hash
            });

            console.log("Dados do login recebidos:", data);
            const adminData = data.usuario || data.admin || data;
            
            if (adminData) {
                sessionStorage.setItem('usuario', JSON.stringify(adminData));
            } else {
                console.error("Nenhum dado de usuário/admin encontrado na resposta do login");
            }

            router.replace('/admin/dashboard');

        } catch (err) {
            console.log("ERRO LOGIN FRONT:", err.response?.data);

            setErro(err.response?.data?.message || "Erro ao conectar com o servidor");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <>
            <div className={styles.container} />

            <div className={styles.pageContent}>

                <Image
                    src="/img/ball.png"
                    width={250}
                    height={250}
                    alt="ball"
                    className={`${styles.ballImage} ${styles.position}`}
                />

                <div className={styles.contentContainer}>
                    <div className={styles.posterContainer}>
                        <Image
                            src="/img/initialPoster.png"
                            width={700}
                            height={800}
                            alt="Poster"
                            className={styles.posterImage}
                        />
                    </div>

                    <div className={styles.formContainer}>
                        <h2 className={styles.welcomeTitle}>WELCOME BACK ADMIN</h2>

                        <Image
                            src="/img/logo2.png"
                            width={200}
                            height={75}
                            alt="Logo"
                            className={styles.logo}
                        />

                        <Form onFinish={onFinish} className={styles.form}>

                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Email inválido' }]}
                            >
                                <Input placeholder="Email" className={styles.input} />
                            </Form.Item>

                            <Form.Item
                                name="password_hash"
                                rules={[{ required: true, message: 'Senha inválida' }]}
                            >
                                <Input.Password placeholder="Senha" className={styles.input} />
                            </Form.Item>

                            {erro && (
                                <p style={{ color: 'red', marginBottom: 10 }}>
                                    {erro}
                                </p>
                            )}

                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    block
                                    loading={carregando}
                                    className={styles.button}
                                >
                                    Login
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
