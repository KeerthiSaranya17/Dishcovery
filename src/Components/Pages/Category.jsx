import React, { useEffect, useState } from "react";
import { getCategories } from "../Services/RecipeIdeaApis"; // ✅ import helper

const CategoryFilter = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(); // ✅ use helper instead of axios here
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="border p-2 rounded-md ml-4 text-black bg-white"
    >
      <option value="" disabled hidden>
        -- Select Category --
      </option>
      {categories.map((cat, idx) => (
        <option key={idx} value={cat.strCategory}>
          {cat.strCategory}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
