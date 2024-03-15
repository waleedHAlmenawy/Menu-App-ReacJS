import React, { useEffect, useState } from "react";

import Filter from "../components/Filter";
import Search from "../components/Search";
import PaginationButton from "../components/PaginationButton";
import Item from "../components/Item";
import SkeletonRow from "../components/SkeletonRow";
import { selectAllCategories } from "../features/categoriesSlice";
import { useSelector } from "react-redux";

const pageSize = 4;

let start = 0;
let end = 0;
let newItems = [];
let skeleton = [1, 1, 1, 1];

export default function Menu({ items, setItems }) {
  /* States */

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const categories = useSelector(selectAllCategories);


  useEffect(() => {
    handlerFilter(selectedCategoryId);

    console.log("heelll");
  }, []);

  useEffect(() => {
    if (!newItems.length) {
      newItems = [...items];

      handlerPagination(newItems.length / pageSize);

      handlerSelectPage(selectedPage);

    } else {
      handlerSelectPage(selectedPage);
    }
  }, [items, categories]);

  useEffect(() => {
    let searchedItems = [];

    if (searchInput) {
      searchedItems = newItems.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      searchedItems = [...newItems];
    }

    handlerPagination(searchedItems.length / pageSize);

    handlerSelectPage(1);

    start = (selectedPage - 1) * pageSize;
    end = start + pageSize;

    setCurrentRecords(searchedItems.slice(start, end));

  }, [searchInput]);

  /* Handlers */

  function handlerAddToCart(item) {
    let updatedItems = [...items];
    let i = items.findIndex((newItem) => newItem.name === item.name);
    let j = newItems.findIndex((newItem) => newItem.name === item.name);

    updatedItems[i] = { ...updatedItems[i] };

    updatedItems[i].isInCart = !updatedItems[i].isInCart;
    newItems[j].isInCart = !newItems[j].isInCart;
    updatedItems[i].count = 1;

    setItems(updatedItems);
  }

  function handlerFilter(categoryId) {
    if (categoryId) {
      newItems = items.filter((item) => +item.category === categoryId);
    } else {
      newItems = [...items];
    }

    handlerPagination(newItems.length / pageSize);

    handlerSelectPage(1);

    setSearchInput("");

    setSelectedCategoryId(categoryId);
  }

  function handlerSearch(e) {
    setSearchInput(e.target.value);
    setSelectedPage(1);
  }

  function handlerSelectPage(page) {
    start = (page - 1) * pageSize;
    end = start + pageSize;

    setSelectedPage(page);
    setCurrentRecords(newItems.slice(start, end));
  }

  function handlerPagination(pagesLength) {
    numberOfPages.length = 0;

    for (let i = 0; i < pagesLength; i++) {
      numberOfPages.push(i + 1);
    }

    setNumberOfPages(numberOfPages);
  }

  /* UI */

  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-1 flex-col">
        <Search searchInput={searchInput} handlerSearch={handlerSearch}></Search>
        <Filter
          category={{ id: "0", name: "All" }}
          handlerFilter={handlerFilter}
          selectedCategoryId={selectedCategoryId}
          key={0}
        ></Filter>
        {categories.map((category) => (
          <Filter
            category={category}
            handlerFilter={handlerFilter}
            selectedCategoryId={selectedCategoryId}
            key={category.id}
          ></Filter>
        ))}
      </div>

      <div className="col-span-3 border">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items[0] ? currentRecords.map((item) => {
              return <Item item={item} handlerAddToCart={handlerAddToCart} key={item.id} />;
            }) : skeleton.map((i) => <SkeletonRow height={50} />)}
          </tbody>
        </table>

        <div className="join flex justify-center mt-2">
          {numberOfPages.map((page) => (
            <PaginationButton
              page={page}
              handlerSelectPage={handlerSelectPage}
              selectedPage={selectedPage}
              key={page}
            ></PaginationButton>
          ))}
        </div>
      </div>
    </div>
  );
}
