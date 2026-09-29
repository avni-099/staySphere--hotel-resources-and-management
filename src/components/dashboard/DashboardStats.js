import styles from "./DashboardStats.module.css";

import React from 'react'

function DashboardStats({ title, value, description }) {
  return (
   <div className={styles.card}>
      <p className={styles.title}>{title}</p>

       <h3 className={styles.value}>{value}</h3>

     <span className={styles.description}>{description}</span>
     </div>
  )
}

export default DashboardStats

