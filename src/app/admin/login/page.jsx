'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { Form, Input, Button, Alert } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setErro(null);
    setCarregando(true);

    try {
      const { data } = await axios.post('/api/login', values);
      
      sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
      sessionStorage.setItem('autenticado', 'true');
      
      router.replace('/admin/dashboard');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao conectar com o servidor');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className={styles.container} onScrollEnd={false} />
      <div className={styles.pageContent}>
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
          width={90}
          height={90}
          className={`${styles.ballImage} ${styles.position3}`}
        />

        <div className={styles.contentContainer}>
          <div className={styles.posterContainer}>
            <Image
              src="/img/initialPoster.png"
              alt="Poster"
              width={700}
              height={800}
              className={styles.posterImage}
            />
          </div>
          
          <div className={styles.formContainer}>
            <Image
              src="/img/logo2.png"
              alt="Logo Espresso Stories"
              width={300}
              height={135}
              className={styles.logo}
            />
            
            {erro && (
              <Alert
                message={erro}
                type="error"
                showIcon
                closable
                onClose={() => setErro(null)}
                style={{ marginBottom: '1rem' }}
              />
            )}
            
            <Form onFinish={onFinish} className={styles.form}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Por favor, insira seu email' },
                  { type: 'email', message: 'Email inválido' }
                ]}>
                <Input placeholder='Email' className={styles.input} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Por favor, insira sua senha' }]}>
                <Input.Password placeholder='Senha' className={styles.input} />
              </Form.Item>

              <Form.Item>
                <Button 
                  htmlType="submit" 
                  block 
                  loading={carregando} 
                  className={styles.button}
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}