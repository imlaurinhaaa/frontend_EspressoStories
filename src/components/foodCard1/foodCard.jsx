import React from "react";
import Image from "next/image";
import styles from "./foodCard.module.css";

export default function FoodCard({ item }) {
  return (
    <div key={item.id} className={styles.productCard}>
      <Image
        src={
          item.photo
            ? `http://localhost:3000/uploads/${item.photo}.jpg`
            : "/img/logo.png"
        }
        alt={item.name || "Item sem nome"}
        width={150}
        height={150}
        className={styles.productPhoto}
        unoptimized
      />
      <h4>{item.name}</h4>
      <p>Preço: R$ {item.price}</p>
    </div>
  );
}