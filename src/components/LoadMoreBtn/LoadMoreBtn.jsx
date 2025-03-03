import style from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => (
  <button onClick={onClick} className={style.loadMore}>
    Load more
  </button>
);

export default LoadMoreBtn;
