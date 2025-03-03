import style from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => (
  <div className={style.card} onClick={() => onClick(image)}>
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={style.galleryImg}
    />
  </div>
);

export default ImageCard;
