import React, { createContext } from "react";
import agri_products from "../components/assets/all_agri_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const contextValue = { agri_products };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
