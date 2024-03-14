import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Form({ items, setItems, categories }) {
  /* States */

  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(0);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state === "update") {
      setName(items[+params.index].name);
      setPrice(items[+params.index].price);
      setCategory(items[+params.index].category);
    }
  }, []);

  /* Handlers */

  function handlerName(e) {
    setName(e.target.value);
  }

  function handlerPrice(e) {
    setPrice(+e.target.value);
  }

  function handlerCategory(e) {
    setCategory(+e.target.value);
  }

  function handlerNavigation() {
    navigate("/dashboard", { replace: true });
  }

  async function handlerOnSubmit(e) {
    e.preventDefault();

    let newItems = [...items];

    let newItem = {
      name,
      price,
      category,
      count: 0,
      isInCart: false,
    };

    if (location.state === "create") {
      newItem.id = `${+items.slice(-1)[0].id + 1}`;
      newItems.push(newItem);

      try {
        console.log(newItem);
        await axios.post("http://localhost:3000/products", newItem);
        console.log(newItem);

        setItems(newItems);
      } catch (error) {
        console.log(error);
      }
    } else {
      newItem.id = items[+params.index].id;
      newItems[+params.index] = newItem;

      try {
        await axios.patch(
          "http://localhost:3000/products/" + items[+params.index].id,
          newItem
        );

        setItems(newItems);
      } catch (error) {
        console.log(error);
      }
    }

    handlerNavigation();
  }

  /* UI */

  return (
    <form
      className="flex flex-col flex-d justify-center my-20 h-72"
      onSubmit={handlerOnSubmit}
    >
      <input
        type="text"
        class="grow"
        value={name}
        placeholder="Name"
        onChange={handlerName}
        className="input input-bordered flex items-center gap-2 col-span-4 mx-60"
      />
      <input
        type="number"
        step="0.5"
        class="grow"
        value={price}
        placeholder="Price"
        onChange={handlerPrice}
        className="input input-bordered flex items-center gap-2 col-span-4 mx-60"
      />
      <label
        for="countries_disabled"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        onChange={handlerCategory}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>Choose a category</option>
        {categories.map((cat) => (
          <option value={cat.id} key={cat.id} selected={+cat.id === category}>
            {cat.name}
          </option>
        ))}
      </select>
      <button class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
        {location.state === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
