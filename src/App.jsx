import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import axios from "axios";
import Form from "./pages/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectAllCategories } from "./features/categoriesSlice";

const App = () => {
  /* States */

  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategories);
  const categoriesStatus = useSelector(state => state.categories.status)

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("http://localhost:3000/products");
      setItems(data);
    }

    if(categoriesStatus === 'pending') {
      dispatch(fetchCategories());
    }

    console.log(categories);

    getProducts();
  }, [categoriesStatus, dispatch]);

  /* UI */

  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <Menu
                items={items}
                setItems={setItems}
                categories={categories}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                items={items.filter((item) => item.isInCart)}
                setItems={setItems}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={<Dashboard items={items} setItems={setItems} />}
          >
            <Route path="orders" element={<Orders />}></Route>
          </Route>
          <Route
            path="/dashboard/itemForm/:index?"
            element={<Form items={items} setItems={setItems} categories={categories} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
