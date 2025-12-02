"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { message } from "antd";
import styles from "./page.module.css";
import Header from "../../components/header";
import Footer from "../../components/footer/footer";

export default function CheckoutPage() {
    const params = useSearchParams();
    const router = useRouter();

    const paramUserId = params?.get("userId");
    const initialUserId = paramUserId
        ? Number(paramUserId)
        : typeof window !== "undefined"
            ? Number(localStorage.getItem("userId")) || 1
            : 1;

    const [userId] = useState(initialUserId);
    const [cartData, setCartData] = useState({ cart: null, items: [], total_price: 0 });
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("PIX");

    const [newAddress, setNewAddress] = useState({
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        cep: ""
    });

    const [isCreatingAddress, setIsCreatingAddress] = useState(false);

    const loadCart = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/users/cart/${userId}`);
            const data = await res.json();
            setCartData(data);
        } catch (error) {
            console.error("Erro ao carregar carrinho:", error);
            message.error("Erro ao carregar o carrinho.");
        }
    };

    const loadAddresses = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/user_addresses?user_id=${userId}`);
            const data = await res.json();

            setAddresses(data.addresses || []);

            if (data.addresses?.length > 0) {
                setSelectedAddress(data.addresses[0]);
                setIsCreatingAddress(false);
            } else {
                setIsCreatingAddress(true);
            }
        } catch (err) {
            console.error("Erro ao carregar endereços:", err);
            setAddresses([]);
            setIsCreatingAddress(true);
        }
    };

    useEffect(() => {
        if (userId) {
            Promise.all([loadCart(), loadAddresses()]).finally(() => setLoading(false));
        }
    }, [userId]);

    const subtotal = Number(cartData.total_price || 0);
    const frete = 15;
    const total = subtotal + frete;

    const saveAddress = async () => {
        for (const field in newAddress) {
            if (!newAddress[field]) {
                return message.error("Preencha todos os campos do endereço.");
            }
        }

        try {
            const res = await fetch("http://localhost:4000/api/user_addresses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...newAddress, user_id: userId })
            });

            const data = await res.json();

            if (!res.ok) {
                return message.error("Erro ao salvar endereço.");
            }

            message.success("Endereço salvo com sucesso!");
            setNewAddress({
                street: "",
                number: "",
                neighborhood: "",
                city: "",
                state: "",
                cep: ""
            });

            loadAddresses();
        } catch (err) {
            console.error(err);
            message.error("Erro ao salvar endereço.");
        }
    };

    const finalizeOrder = async () => {
        if (!selectedAddress) return message.error("Selecione ou cadastre um endereço.");

        try {
            const orderBody = {
                user_id: userId,
                branch_id: cartData.cart?.branch_id || 1,
                user_address_id: selectedAddress.id,
                payment_method: paymentMethod
            };

            const orderRes = await fetch(`http://localhost:4000/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderBody),
            });

            const orderResult = await orderRes.json();

            if (!orderRes.ok) {
                return message.error("Erro ao criar o pedido.");
            }

            const orderId = orderResult?.newOrder?.id || orderResult?.id;

            for (const item of cartData.items) {
                await fetch(`http://localhost:4000/api/order_items`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        order_id: orderId,
                        product_id: item.product_id || null,
                        featured_product_id: item.featured_product_id || null,
                        quantity: item.quantity
                    })
                });
            }

            await fetch(`http://localhost:4000/api/cart/clear/${cartData.cart.id}`, {
                method: "DELETE"
            });

            message.success("Pedido criado com sucesso!");
            router.push(`/orderCompleted/[id]`);

        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            message.error("Erro ao finalizar pedido.");
        }
    };

    if (loading) return <p>Carregando...</p>

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <Image src="/img/ball.png" alt="Ball" width={400} height={400} className={`${styles.ballImage} ${styles.position}`} />
                <Image src="/img/ball.png" alt="Ball" width={100} height={100} className={`${styles.ballImage} ${styles.position2}`} />
                <Image src="/img/ball.png" alt="Ball" width={100} height={100} className={`${styles.ballImage} ${styles.position3}`} />
                <Image src="/img/ball.png" alt="Ball" width={250} height={250} className={`${styles.ballImage} ${styles.position4}`} />
                <div className={styles.cardContainer}>
                    <h2 className={styles.title}>Itens do Pedido</h2>

                    {cartData.items.map(item => {
                        const productName = item.product_name || item.featured_product_name;
                        const productPhoto = item.product_photo
                            ? `http://localhost:4000/uploads/${item.product_photo}.jpg`
                            : item.featured_product_photo
                                ? `http://localhost:4000/uploads/${item.featured_product_photo}.jpg`
                                : "/img/logo.png";

                        return (
                            <div key={item.id} className={styles.itemRow}>
                                <Image
                                    src={productPhoto}
                                    alt={productName}
                                    width={100}
                                    height={80}
                                    className={styles.itemImage}
                                    unoptimized
                                />

                                <div className={styles.itemInfo}>
                                    <p className={styles.itemName}>{productName}</p>
                                    <p className={styles.itemQtd}>Qtd: {item.quantity}</p>
                                </div>

                                <p className={styles.itemPrice}>
                                    R$ {Number(item.total_item_price).toFixed(2)}
                                </p>
                            </div>
                        );
                    })}

                    <p>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
                    <p>Frete: <strong>R$ {frete.toFixed(2)}</strong></p>

                    <p className={styles.totalRow}>
                        Total: <strong>R$ {total.toFixed(2)}</strong>
                    </p>
                </div>
                <div className={styles.cardContainer}>
                    <h2 classNam
                        e={styles.title}>Endereço de Entrega</h2>

                    {addresses.length > 0 ? (
                        addresses.map(addr => (
                            <label key={addr.id} className={styles.addressCard}>
                                <input
                                    type="radio"
                                    checked={selectedAddress?.id === addr.id}
                                    onChange={() => setSelectedAddress(addr)}
                                />
                                <div>
                                    <p>{addr.street}, {addr.number}</p>
                                    <p>{addr.neighborhood} - {addr.city}/{addr.state}</p>
                                    <p>CEP: {addr.cep}</p>
                                </div>
                            </label>
                        ))
                    ) : (
                        <p>Nenhum endereço cadastrado.</p>
                    )}

                    <button
                        className={styles.addAddressBtn}
                        onClick={() => setIsCreatingAddress(!isCreatingAddress)}
                    >
                        {isCreatingAddress ? "Cancelar" : "Cadastrar novo endereço"}
                    </button>

                    {isCreatingAddress && (
                        <div className={styles.addressForm}>
                            {Object.keys(newAddress).map(key => (
                                <input
                                    key={key}
                                    placeholder={key.toUpperCase()}
                                    value={newAddress[key]}
                                    onChange={e => setNewAddress({ ...newAddress, [key]: e.target.value })}
                                />
                            ))}

                            <button className={styles.saveBtn} onClick={saveAddress}>
                                Salvar Endereço
                            </button>
                        </div>
                    )}

                    <h2 className={styles.title}>Forma de Pagamento</h2>

                    <div className={styles.paymentRow}>
                        {[
                            { label: "PIX", value: "PIX" },
                            { label: "Cartão", value: "cartao" },
                            { label: "Dinheiro", value: "dinheiro" }
                        ].map(method => (
                            <button
                                key={method.value}
                                className={`${styles.paymentBtn} ${paymentMethod === method.value ? styles.active : ""}`}
                                onClick={() => setPaymentMethod(method.value)}
                            >
                                {method.label}
                            </button>
                        ))}
                    </div>
                    <button className={styles.finishBtn} onClick={finalizeOrder}>
                        Finalizar Pedido
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );

}