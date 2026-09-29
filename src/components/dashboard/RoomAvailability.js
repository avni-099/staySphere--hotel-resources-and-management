import styles from "./RoomAvailability.module.css";

export default function RoomAvailability() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>ROOM STATUS</p>
          <h3 className={styles.title}>Room Availability</h3>
        </div>

        <span className={styles.total}>76 Rooms</span>
      </div>

      <div className={styles.list}>
        <div className={styles.item}>
          <span className={`${styles.dot} ${styles.available}`}></span>

          <div className={styles.info}>
            <strong>Available</strong>
            <span>Ready for guests</span>
          </div>

          <b className={styles.count}>24</b>
        </div>

        <div className={styles.item}>
          <span className={`${styles.dot} ${styles.occupied}`}></span>

          <div className={styles.info}>
            <strong>Occupied</strong>
            <span>Currently occupied</span>
          </div>

          <b className={styles.count}>36</b>
        </div>

        <div className={styles.item}>
          <span className={`${styles.dot} ${styles.reserved}`}></span>

          <div className={styles.info}>
            <strong>Reserved</strong>
            <span>Upcoming bookings</span>
          </div>

          <b className={styles.count}>12</b>
        </div>

        <div className={styles.item}>
          <span className={`${styles.dot} ${styles.maintenance}`}></span>

          <div className={styles.info}>
            <strong>Maintenance</strong>
            <span>Unavailable</span>
          </div>

          <b className={styles.count}>4</b>
        </div>
      </div>
    </div>
  );
}