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
      router.replace('/home');
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
        className={styles.ballImage}
      />

      <Image
        src="/img/ball.png"
        alt="Ball"
        width={90}
        height={90}
        className={styles.ballImage2}
      />

      <Image
        src="/img/ball.png"
        alt="Ball"
        width={90}
        height={90}
        className={styles.ballImage3}
      />

      <Image
        src="/img/ball.png"
        alt="Ball"
        width={250}
        height={250}
        className={styles.ballImage4}
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
            src="/img/logo02.png"
            alt="Logo Espresso Stories"
            width={200}
            height={75}
            className={styles.logo}
          />
          <Form onFinish={onFinish} className={styles.form}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Email inválido' }]}>
              <Input placeholder='Email' className={styles.input} />
            </Form.Item>
            
            <Form.Item
              name="nome"
              rules={[{ required: true, message: 'Nome inválido' }]}>
              <Input placeholder='Nome Completo' className={styles.input} />
            </Form.Item>

            <Form.Item
              name="cep"
              rules={[
                { required: true, message: 'CEP' },
                { pattern: /^\d{5}-?\d{3}$/, message: 'CEP inválido!' }
              ]}>
              <Input placeholder="CEP" maxLength={9} className={styles.input} />
            </Form.Item>

            <Form.Item
              name="senha"
              rules={[{ required: true, message: 'Senha inválida' }]}>
              <Input.Password placeholder='Senha' className={styles.input} />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" block loading={carregando} className={styles.button}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      </div>
    </>
  );
}
