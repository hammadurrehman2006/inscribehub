"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

function SearchForm({ query }: { query?: string }) {
  const [Query, setQuery] = useState(query || ""); // Initialize state with prop value if provided

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update the state with input value
  };

  const handleFormReset = () => {
    setQuery(""); // Clear the state (and the input field)
  };

  return (
    <form action="/" className="search-form">
      <input
        name="query"
        value={Query} // Use state value here
        onChange={handleInputChange}
        className="search-input"
        placeholder="Search Blogs"
      />
      <div className="flex gap-2">
        {Query && ( // Show reset button only if there's a value in the input field
          <button type="button" onClick={handleFormReset} className="search-btn text-white">
            <X className="size-5" />
          </button>
        )}
        <button type="submit" className="search-btn text-white font-extrabold">
          <Search />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;

