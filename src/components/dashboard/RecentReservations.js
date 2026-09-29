import styles from "./RecentReservations.module.css";

const reservations = [
  {
    id: 1,
    guest: "Richa Gupta",
    room: "204",
    checkIn: "24 Sep 2026",
    checkOut: "27 Sep 2026",
    status: "Confirmed",
    amount: "₹8,500",
  },
  {
    id: 2,
    guest: "Rahul Sharma",
    room: "105",
    checkIn: "25 Sep 2026",
    checkOut: "28 Sep 2026",
    status: "Pending",
    amount: "₹6,200",
  },
  {
    id: 3,
    guest: "Ankit Verma",
    room: "312",
    checkIn: "26 Sep 2026",
    checkOut: "29 Sep 2026",
    status: "Confirmed",
    amount: "₹9,800",
  },
  {
    id: 4,
    guest: "Priya Singh",
    room: "118",
    checkIn: "27 Sep 2026",
    checkOut: "30 Sep 2026",
    status: "Cancelled",
    amount: "₹5,400",
  },
];

export default function RecentReservations() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>BOOKING ACTIVITY</p>
          <h3 className={styles.title}>Recent Reservations</h3>
        </div>

        <button className={styles.viewAll}>View All</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>
                  <div className={styles.guestName}>
                    <div className={styles.guestAvatar}>
                      {reservation.guest.charAt(0)}
                    </div>

                    <span>{reservation.guest}</span>
                  </div>
                </td>

                <td>Room {reservation.room}</td>

                <td>{reservation.checkIn}</td>

                <td>{reservation.checkOut}</td>

                <td>
                  <span
                    className={`${styles.status} ${
                      styles[reservation.status.toLowerCase()]
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>

                <td className={styles.amount}>
                  {reservation.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}