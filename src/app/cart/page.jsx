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

    const loadCart = async (userId) => {
        if (!userId) return;

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/users/cart/${userId}`);
            const data = await res.json();
            setCartData(data);
        } catch (err) {
            console.error("Erro ao carregar carrinho:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        const storedId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
        const id = storedId ? Number(storedId) : 1;
        setUserId(id);
        if (id) loadCart(id);
    }, []);

    if (loading || !cartData || !cartData.items) return <p>Carregando carrinho...</p>;

    const increaseQty = async (id) => {
        await fetch(`http://localhost:4000/api/cart/increase`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item_id: id })
        });
        loadCart(userId);
    };

    const decreaseQty = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/decrease`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item_id: id })
            });
    
            if (!response.ok) {
                throw new Error("Erro ao diminuir a quantidade do item.");
            }
    
            await loadCart(userId); 
        } catch (error) {
            console.error("Erro ao diminuir a quantidade:", error);
        }
    };

    const deleteAll = async () => {
        await fetch(`http://localhost:4000/api/cart/clear/${cartData.cart.id}`, {
            method: "DELETE"
        });
        loadCart(userId);
    };

    const deleteItem = async (id) => {
        try {
            await fetch(`http://localhost:4000/api/cart_items/${id}`, {
                method: "DELETE",
            });
            loadCart(userId);
        } catch (err) {
            console.error("Erro ao deletar item:", err);
        }
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
                    <div className={styles.div}></div>
                    <div className={styles.containerTitle}>
                    <h1 className={styles.title}>Seu Carrinho</h1>

                    {cartData.items.filter(item => item?.product_id || item?.featured_product_id).length > 0 && (
                        <button className={styles.deleteAllBtn} onClick={deleteAll}>
                            <Trash2 size={20} /> Remover tudo
                        </button>
                    )}
                    </div>

                    {cartData.items.filter(item => item?.product_id || item?.featured_product_id).length === 0 ? (
                        <p className={styles.alerta}>O carrinho está vazio.</p>
                    ) : (
                        <div className={styles.cartItems}>
                            {cartData.items.map(item => {
                                const productName = item?.product_name || item?.featured_product_name || "Produto Desconhecido";
                                const productPhoto = item?.product_photo
                                    ? `http://localhost:4000/uploads/${item.product_photo}${item.product_photo.includes('.') ? '' : '.jpg'}`
                                    : item?.featured_product_photo
                                        ? `http://localhost:4000/uploads/${item.featured_product_photo}${item.featured_product_photo.includes('.') ? '' : '.jpg'}`
                                        : "/img/logo.png";
                                const productPrice = item?.product_price || item?.featured_product_price || 0;

                                return (
                                    <div key={item.id} className={styles.cartItem}>
                                        <Image
                                            src={productPhoto}
                                            alt={productName}
                                            width={160}
                                            height={120}
                                            className={styles.productPhoto}
                                            unoptimized
                                        />

                                        <div className={styles.itemInfo}>
                                            <div className={styles.itemHeader}>
                                            <h3 className={styles.subTitle}>{productName}</h3>
                                            <button
                                                className={styles.deleteItemBtn}
                                                onClick={() => deleteItem(item.id)}
                                            >
                                                <Trash2 size={20} /> 
                                            </button>
                                            </div>

                                            <div className={styles.qtyControls}>
                                                <button onClick={() => decreaseQty(item.id)}>
                                                    <Minus size={18} />
                                                </button>

                                                <span className={styles.quantity}>{item.quantity}</span>

                                                <button onClick={() => increaseQty(item.id)}>
                                                    <Plus size={18} />
                                                </button>
                                            </div>

                                            <p className={styles.text}>Preço: R$ {Number(productPrice).toFixed(2)}</p>
                                            <p className={styles.itemTotal}>
                                                Total do item: <strong>R$ {Number(item.total_item_price || 0).toFixed(2)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

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
