import React from "react";
import Image from "next/image";
import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.section}>
                    <Image 
                        src='/img/logoName2.png'
                        alt="Espresso Stories Logo"
                        width={180}
                        height={50}
                    />
                    <p>
                        Espresso Stories - Onde cada café conta uma história. 
                        Tradição e qualidade em cada xícara.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>Contato</h3>
                    <div className={styles.sectionRow}>
                        <Image 
                            src='/img/telefone-icon.png'
                            alt='icon de telefone'
                            width={18}
                            height={18}
                        />
                        <p>contato@espressostories.com.br</p>
                    </div>
                    <div className={styles.sectionRow}>
                        <Image 
                            src='/img/e-mail-icon.png'
                            alt='icon de email'
                            width={18}
                            height={18}
                        />
                        <p>(11) 98765-4321</p>
                    </div>
                    <div className={styles.sectionRow}>
                        <Image 
                            src='/img/localizacao-icon.png'
                            alt='icon de localização'
                            width={18}
                            height={18}
                        />
                        <p>São Paulo, SP</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Horário de Funcionamento</h3>
                    <p>
                        Segunda a Sexta: 7h - 20h<br/>
                        Sábado: 8h - 22h<br/>
                        Domingo: 8h - 18h
                    </p>
                </div>
            </div>

            <div className={styles.divider}>
                <p>
                    &copy; 2024 Espresso Stories. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}