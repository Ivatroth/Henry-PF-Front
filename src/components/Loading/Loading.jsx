import styles from "../Loading/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.imagen}
        src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/media/a603779536f0491b4be24ba2d03903e1.gif"
        alt="gif"
      ></img>
      <h1>CARGANDO CONTENIDO...</h1>
    </div>
  );
};

export default Loading;
