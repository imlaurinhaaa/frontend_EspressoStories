import styles from "./foodCard.module.css";
import Image from "next/image";

export default function FoodCard({ img, alt, name }) {
    return (
        <div className={styles.card}>
            <Image 
                src={img}
                alt={alt}
                width={150}
                height={150}
                className={styles.image}
            />
            <h3 className={styles.name}>{name}</h3>
        </div>
    )
}