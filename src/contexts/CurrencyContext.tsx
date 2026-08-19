import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "GBP" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInBase: number, isKes?: boolean) => string;
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
  // If isKes is true (the KES prices from ProductsSection):
  //   We map them to reasonable GBP/USD values:
  //   1kg (2700 KES) -> GBP 16.99, USD 21.99
  //   500g (1400 KES) -> GBP 8.99, USD 11.49
  //   250g (750 KES) -> GBP 4.99, USD 6.49
  //   125g (400 KES) -> GBP 2.49, USD 3.29
  // If isKes is false (already in USD or GBP, e.g. best selling prices 59.99, 12.99, 9.99):
  //   GBP rate is 0.8 * USD price (or keep 1:1 if they are custom static prices, or convert properly: 1 GBP = 1.3 USD).
  const formatPrice = (priceInBase: number, isKes: boolean = false) => {
    const symbol = currency === "GBP" ? "£" : "$";
    
    if (isKes) {
      if (priceInBase >= 2700) {
        return currency === "GBP" ? "£16.99" : "$21.99";
      } else if (priceInBase >= 1400) {
        return currency === "GBP" ? "£8.99" : "$11.49";
      } else if (priceInBase >= 750) {
        return currency === "GBP" ? "£4.99" : "$6.49";
      } else {
        return currency === "GBP" ? "£2.49" : "$3.29";
      }
    }

    // Otherwise, assume priceInBase is in USD, and we convert to GBP if selected
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
