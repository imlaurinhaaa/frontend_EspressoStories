"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer/footer';
import { message } from 'antd';

export default function CheckoutPage() {
    const [userId, setUserId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [orderData, setOrderData] = useState({
        items: [],
        address: null,
        total_price: 0,
        order: null
    });

    const [paymentMethod, setPaymentMethod] = useState("pix");

    const [newAddress, setNewAddress] = useState({
        cep: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        complement: ""
    });

    const router = useRouter();

    useEffect(() => {
        const storedId = typeof window !== 'undefined'
            ? localStorage.getItem("userId")
            : null;

        const id = storedId ? Number(storedId) : 1;
        setUserId(id);

        if (id) {
            loadOrder(id);
            loadAddresses(id);
        }
    }, []);

    const loadOrder = async (userId) => {
        try {
            const res = await fetch(`http://localhost:4000/api/user/order/${userId}`);
            const data = await res.json();

            setOrderData({
                items: data.items || [],
                address: data.address || null,
                total_price: data.total_price || 0,
                order: data.order || null
            });

            if (data.address) {
                setSelectedAddress(data.address);
            }
        } catch (e) {
            console.error("Erro ao carregar pedido", e);
        }
    };

    const loadAddresses = async (id) => {
        const res = await fetch(`http://localhost:4000/api/user_addresses?user_id=${id}`);
        const data = await res.json();

        setAddresses(data.addresses || []);

        if (!data.addresses || data.addresses.length === 0) {
            setSelectedAddress(null);
        }
    };

    const createAddress = async () => {
        const body = { ...newAddress, user_id: userId };

        const response = await fetch(`http://localhost:4000/api/user_addresses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        message.success("Endereço adicionado com sucesso!");
        await loadAddresses(userId);
    };

    const finalizeOrder = async () => {
        if (!selectedAddress) {
            message.error("Selecione ou adicione um endereço.");
            return;
        }

        const body = {
            order_id: orderData.order?.id,
            address_id: selectedAddress.id,
            payment_method: paymentMethod
        };

        const response = await fetch(`http://localhost:4000/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        if (!response.ok) {
            message.error(result.message || "Erro ao finalizar pedido!");
            return;
        }

        router.push(`/orders/${orderData.order.id}`);
    };

    const subtotal = Number(orderData.total_price || 0);
    const frete = 15;
    const total = subtotal + frete;

    return (
        <div className={styles.checkoutPage}>

            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Itens do Pedido</h2>

                {orderData?.items?.length > 0 ? (
                    orderData.items.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemImage}></div>

                            <div className={styles.itemInfo}>
                                <p className={styles.itemName}>{item.product_name}</p>
                                <p className={styles.itemQtd}>Qtd: {item.quantity}</p>
                            </div>

                            <p className={styles.itemPrice}>
                                R$ {item.total_item_price.toFixed(2)}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum item no carrinho.</p>
                )}

                <hr />

                <p>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
                <p>Frete: <strong>R$ {frete.toFixed(2)}</strong></p>
                <p className={styles.totalRow}>Total: <strong>R$ {total.toFixed(2)}</strong></p>
            </div>

            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Informações para entrega</h2>

                {addresses.length > 0 && (
                    <>
                        {addresses.map(addr => (
                            <label key={addr.id} className={styles.addressCard}>
                                <input
                                    type="radio"
                                    name="address"
                                    checked={selectedAddress?.id === addr.id}
                                    onChange={() => setSelectedAddress(addr)}
                                />
                                <div>
                                    <p>{addr.street}, {addr.number}</p>
                                    <p>{addr.neighborhood} - {addr.city}/{addr.state}</p>
                                    <p>CEP: {addr.cep}</p>
                                </div>
                            </label>
                        ))}
                    </>
                )}

                <div className={styles.addressForm}>
                    <h3 className={styles.subTitle}>Cadastrar novo endereço</h3>

                    <div className={styles.formGrid}>
                        {Object.keys(newAddress).map(key => (
                            <input
                                key={key}
                                placeholder={key}
                                value={newAddress[key]}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, [key]: e.target.value })
                                }
                                className={styles.input}
                            />
                        ))}
                    </div>

                    <button className={styles.btnPrimary} onClick={createAddress}>
                        Salvar Endereço
                    </button>
                </div>
            </div>

            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Forma de Pagamento</h2>

                <div className={styles.paymentRow}>
                    {["credito", "debito", "pix", "dinheiro"].map(method => (
                        <button
                            key={method}
                            className={`${styles.paymentBtn} ${paymentMethod === method ? styles.active : ""}`}
                            onClick={() => setPaymentMethod(method)}
                        >
                            {method.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <button className={styles.finishBtn} onClick={finalizeOrder}>
                Finalizar Pedido
            </button>
        </div>
    );
}
