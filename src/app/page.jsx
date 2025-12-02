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
      const { data } = await axios.post("http://localhost:4000/api/login/users", {
        name: values.name,
        email: values.email,
        password_hash: values.password_hash
      });

      console.log("Dados do login recebidos:", data);
      const userData = data.usuario || data.user || data;

      if (userData) {
        sessionStorage.setItem('usuario', JSON.stringify(userData));
      } else {
        console.error("Nenhum dado de usuário/user encontrado na resposta do login");
      }

      router.replace('/home');

    } catch (err) {
      console.log("ERRO LOGIN FRONT:", err.response?.data);

      setErro(err.response?.data?.message || "Erro ao conectar com o servidor");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.logoContainer}>
        <Image src="/img/logo.png" alt="Logo" width={50} height={50} className={styles.logo} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.posterContainer}>
          <Image src="/img/initialPoster.png" alt="Poster" width={700} height={800} className={styles.posterImage} />
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.welcomeTitle}>WELCOME BACK TO</h2>
          <Image src="/img/logoName.png" alt="Logo Espresso Stories" width={200} height={50} className={styles.logo02} />

          {erro && <Alert message={erro} type="error" style={{ marginBottom: 16 }} />}

          <Form onFinish={onFinish} className={styles.form}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Nome obrigatório' }]}
            >
              <Input placeholder="Nome Completo" className={styles.input} />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email obrigatório' },
                { type: 'email', message: 'Email inválido' }
              ]}
            >
              <Input placeholder="Email" className={styles.input} />
            </Form.Item>

            <Form.Item
              name="password_hash"
              rules={[{ required: true, message: 'Senha obrigatória' }]}
            >
              <Input.Password placeholder="Senha" className={styles.input} />
            </Form.Item>

            <div className={styles.options}>
              <div className={styles.inLine}>
                <div className={styles.line}></div>
                <p style={{ color: '#7B7B7B' }}>or sign in with</p>
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

              <p>{"Don't have an account? "}<a href="/signup" style={{ color: '#7B7B7B', textDecoration: 'underline' }}>Enter!</a></p>
            </div>


            <Form.Item>
              <Button
                htmlType="submit"
                block
                loading={carregando}
                className={styles.button}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
