import styles from "../Loading/LoadingDashboard.module.css";

const LoadingDashboard = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.imagen}
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
        alt="gif"
      ></img>
    </div>
  );
};

export default LoadingDashboard;
