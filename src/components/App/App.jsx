import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import style from "./App.module.css";

import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "Db9yAiAVsvMSTVKWx8Mb2xcfEvDOWciklwXftB0DjwE";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    fetch(
      `${API_URL}?query=${query}&page=${page}&per_page=12&client_id=${ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length === 0) {
          setError("No images found for this search term.");
        } else {
          setImages((prev) =>
            page === 1 ? data.results : [...prev, ...data.results]
          );
        }
      })
      .catch(() => setError("Failed to fetch images"))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage(page + 1)} />
      )}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default App;
