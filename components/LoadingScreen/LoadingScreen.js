import React from "react";
import styles from "styles/LoadingScreen.module.css";

// import "./Loading.css";
const LoadingScreen = () => {
  return (
    <div className={styles.loading_wrapper}>
  <div className={styles.loading_text}>LOADING</div>
  <div className={styles.loading_content}></div>
</div>
  );
};

export default LoadingScreen;
