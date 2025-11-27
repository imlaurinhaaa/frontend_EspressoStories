'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import styles from "./page.module.css";
import Header from "../../components/header";
import Footer from "../../components/footer/footer";

export default function Carrinho() {
    const [cartData, setCartData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
        setUserId(storedId ? Number(storedId) : 3);
    }, []);

    const loadCart = async () => {
        if (!userId) return;

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:4000/api/cart/${userId}`);
            const data = await res.json();
            setCartData(data);
        } catch (err) {
            console.error("Erro ao carregar carrinho:", err);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (userId) loadCart();
    }, [userId]);

    if (loading || !cartData) return <p>Carregando carrinho...</p>;

    const increaseQty = async (id) => {
        await fetch(`http://localhost:4000/api/cart/increase`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item_id: id })
        });
        loadCart();
    };

    const decreaseQty = async (id) => {
        await fetch(`http://localhost:4000/api/cart/decrease`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item_id: id })
        });
        loadCart();
    };

    const deleteAll = async () => {
        await fetch(`http://localhost:4000/api/cart/clear/${cartData.cart.id}`, {
            method: "DELETE"
        });
        loadCart();
    };

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <Image src="/img/ball.png" alt="Ball" width={400} height={400} className={`${styles.ballImage} ${styles.position}`} />
                <Image src="/img/ball.png" alt="Ball" width={100} height={100} className={`${styles.ballImage} ${styles.position2}`} />
                <Image src="/img/ball.png" alt="Ball" width={100} height={100} className={`${styles.ballImage} ${styles.position3}`} />
                <Image src="/img/ball.png" alt="Ball" width={250} height={250} className={`${styles.ballImage} ${styles.position4}`} />
                <div className={styles.cartContainer}>
                    <h1 className={styles.title}>Seu Carrinho</h1>

                    {cartData.items.length > 0 && (
                        <button className={styles.deleteAllBtn} onClick={deleteAll}>
                            <Trash2 size={20} /> Remover tudo
                        </button>
                    )}

                    {cartData.items.length === 0 ? (
                        <p className={styles.alerta}>O carrinho está vazio.</p>
                    ) : (
                        <div className={styles.cartItems}>
                            {cartData.items.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <Image
                                        src={
                                            item.product_photo
                                                ? `http://localhost:4000/uploads/${item.product_photo}${item.product_photo.includes('.') ? '' : '.jpg'}`
                                                : "/img/logo.png"
                                        }
                                        alt={item.product_name}
                                        width={160}
                                        height={120}
                                        className={styles.productPhoto}
                                        unoptimized
                                    />

                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.subTitle}>{item.product_name}</h3>

                                        <div className={styles.qtyControls}>
                                            <button onClick={() => decreaseQty(item.id)}>
                                                <Minus size={18} />
                                            </button>

                                            <span className={styles.quantity}>{item.quantity}</span>

                                            <button onClick={() => increaseQty(item.id)}>
                                                <Plus size={18} />
                                            </button>
                                        </div>

                                        <p className={styles.text}>Preço: R$ {Number(item.product_price).toFixed(2)}</p>
                                        <p className={styles.itemTotal}>
                                            Total do item: <strong>R$ {Number(item.total_item_price).toFixed(2)}</strong>
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className={styles.divider}>
                                <h2 className={styles.cartTotal}>
                                    Total geral: R$ {Number(cartData.total_price).toFixed(2)}
                                </h2>

                                <button
                                    onClick={() => router.push('/checkout')}
                                    className={styles.checkoutBtn}
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
