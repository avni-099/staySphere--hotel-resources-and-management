import styles from "./RoomCard.module.css";

export default function RoomCard({
  roomNumber,
  roomType,
  floor,
  status,
  price,
  onClick,
}) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.top}>
        <span className={styles.roomNumber}>Room {roomNumber}</span>

        <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
          {status}
        </span>
      </div>

      <h3>{roomType}</h3>

      <p>Floor {floor}</p>

      <div className={styles.bottom}>
        <strong>₹{price}</strong>
        <span>per night</span>
      </div>
    </div>
  );
}