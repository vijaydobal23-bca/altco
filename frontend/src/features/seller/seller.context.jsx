import { createContext, useState, useContext } from "react";

export const SellerContext = createContext(null);

export function SellerContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <SellerContext.Provider value={{ products, setProducts, loading, setLoading }}>
      {children}
    </SellerContext.Provider>
  );
}

export function useSellerContext() {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error("useSellerContext must be used within SellerContextProvider");
  }
  return context;
}

export default SellerContextProvider;
