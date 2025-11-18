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

      <div className={styles.logoContainer}>
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className={styles.logo}
        />
      </div>
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
          <h2 className={styles.welcomeTitle}>WELCOME BACK TO</h2>
          <Image
            src="/img/espressoName.png"
            alt="Logo Espresso Stories"
            width={200}
            height={50}
            className={styles.logo02}
          />
          <Form onFinish={onFinish} className={styles.form}>
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

            <div className={styles.options}>
              <div className={styles.inLine}>
                <div className={styles.line}></div>
                <p style={{ color: '#7B7B7B'}}>or sign in with</p>
                <div className={styles.line}></div>
              </div>
              <div className={styles.icons}>
                <Image 
                  src="/img/googleIcon.png"
                  alt="Google Icon"
                  width={20}
                  height={20}
                  className={styles.icon}
                />
                <Image 
                  src="/img/facebookIcon.png"
                  alt="Facebook Icon"
                  width={20}
                  height={20}
                  className={styles.icon}
                />
                <Image 
                  src="/img/appleIcon.png"
                  alt="Apple Icon"
                  width={20}
                  height={20}
                  className={styles.icon}
                />
              </div>

              <p>{"Don't have an account? "}<a href="#" style={{ color: '#7B7B7B', textDecoration: 'underline' }}>Enter!</a></p>
            </div>

            <Form.Item>
              <Button htmlType="submit" block loading={carregando} className={styles.button}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      </div>
    </>
  );
}
