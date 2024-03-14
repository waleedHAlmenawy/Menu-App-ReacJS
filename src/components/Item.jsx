import React from "react";

import AddCart from "../svg/AddCart";

export default function Item({ item, handlerAddToCart }) {
  return (
    <tr className="hover:bg-orange-100 transition-all">
      <td className="cursor-pointer">{item.name}</td>
      <td>{item.price}</td>
      <td>
        <button onClick={() => handlerAddToCart(item)} className="btn">
          <AddCart isInCart={item.isInCart} key={item.id} />
        </button>
      </td>
    </tr>
  );
}
