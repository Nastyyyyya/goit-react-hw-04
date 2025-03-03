import style from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit, API_URL, ACCESS_KEY }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    onSubmit(query, API_URL, ACCESS_KEY);
  };

  return (
    <header className={style.header}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.inputWrapper}>
          <button type="submit" className={style.searchButton}>
            <IoSearch />
          </button>
          <input
            type="text"
            autoComplete="off"
            autofocus
            placeholder="Search images and photos"
            id="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={style.input}
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
