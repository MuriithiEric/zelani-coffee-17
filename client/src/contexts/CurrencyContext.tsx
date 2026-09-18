import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "GBP" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInBase: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem("zelani-currency");
    return (saved as Currency) || "GBP";
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("zelani-currency", newCurrency);
  };

  // Convert prices:
  // Standard pricing in USD:
  //   125g -> $5.50
  //   250g -> $10.00
  //   500g -> $19.50
  //   1kg  -> $35.00
  const formatPrice = (priceInBase: number) => {
    const symbol = currency === "GBP" ? "£" : "$";
    const finalPrice = currency === "GBP" ? priceInBase * 0.78 : priceInBase;
    return `${symbol}${finalPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
