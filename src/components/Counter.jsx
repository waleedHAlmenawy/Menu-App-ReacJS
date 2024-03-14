import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategory, selectAllCategories } from "../features/categoriesSlice";

export function Counter() {
  const category = useSelector(selectAllCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <div>
      <button onClick={() => dispatch(getCategory([1, 2, 3]))}>
        getCategory
      </button>

      <span>
        {category}
      </span>
    </div>
  );
}
