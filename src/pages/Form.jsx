import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Form({ items, setItems, categories }) {
  /* States */

  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(0);
  const [color, setColor] = useState("");
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setColor(location.state === "create" ? "green" : "amber");
    
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
    <div className="flex flex-col flex-d justify-center my-20" >
      <div className="text-center text-3xl font-bold">
        <span
          className={`text-${color}-400 transition duration-500 ease hover:text-${color}-500`}
          style={{cursor: "pointer"}}
        >HomeBurger</span>
      </div>
      <form
        className="flex flex-col flex-d justify-between self-center mt-10"
        style={{ height: "50vh", width: "60vh" }}
        onSubmit={handlerOnSubmit}
      >
        <div
          className="flex flex-col flex-d justify-between my-10 h-48"
        >
          <input
            type="text"
            class="grow"
            value={name}
            placeholder="Name"
            onChange={handlerName}
            className="input input-bordered"
          />
          <input
            type="number"
            step="0.5"
            class="grow"
            value={price}
            placeholder="Price"
            onChange={handlerPrice}
            className="input input-bordered"
          />
          <select
            onChange={handlerCategory}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Choose a category</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id} selected={+cat.id === category}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`border border-${color}-400 bg-${color}-400 text-white text-xl font-bold rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-${color}-500 focus:outline-none focus:shadow-outline`}
        >
          {location.state === "create" ? "Create" : "Update"}
        </button>
      </form>
    </div>
  );
}
