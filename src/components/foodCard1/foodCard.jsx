import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./foodCard.module.css";

export default function FoodCard({ item, onClick }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${item.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div key={item.id} className={styles.productCard}>
        <Image
          src={
            item.photo
              ? `http://localhost:4000/uploads/${item.photo}.jpg`
              : "/img/logo.png"
          }
          alt={item.name || "Item sem nome"}
          width={150}
          height={150}
          className={styles.productPhoto}
          unoptimized
        />
        <h4 className={styles.name}>{item.name}</h4>
        <p className={styles.price}>Preço: R$ {item.price}</p>

        <button className={styles.viewButton}>Ver Mais</button>
      </div>
    </div>
  );
}
