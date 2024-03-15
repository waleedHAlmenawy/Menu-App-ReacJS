import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Pen from "../svg/Pen";
import Bin from "../svg/Bin";

export default function Dashboard({ items, setItems }) {
  const navigate = useNavigate();

  async function handlerDeleteItem(item) {
    var newItems = [...items];
    var oldItems = [...items];

    newItems = newItems.filter((newItem) => newItem.id !== item.id);
    setItems(newItems);

    try {
      await axios.delete("http://localhost:3000/products/" + item.id);
    } catch (error) {
      setItems(oldItems);
    }
  }

  function handlerNavigation(mode) {
    navigate("itemForm", { state: mode });
  }

  return (
    <div className="grid grid-cols-1 m-5">
      <button
        className="btn bg-slate-300 col-span-1 mb-5 hover:bg-green-400 transition-all"
        onClick={() => navigate("itemForm", { state: "create" })}
      >
        Create New Item
      </button>
      <div className="col-span-1 border">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn" onClick={() => navigate("itemForm/" + index, { state: "update" })}>
                      <Pen></Pen>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handlerDeleteItem(item)}
                    >
                      <Bin></Bin>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
