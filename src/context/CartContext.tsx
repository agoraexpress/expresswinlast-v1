import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItemType } from "@/components/cart/CartItem";
import { MenuItemType } from "@/components/menu/MenuItem";

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (item: CartItemType) => {
    setCartItems((prevItems) => {
      // For items with customizations, always add as a new item
      if (item.customizations && item.customizations.length > 0) {
        return [...prevItems, item];
      }

      const existingItemIndex = prevItems.findIndex(
        (i) =>
          i.id === item.id &&
          (!i.customizations || i.customizations.length === 0),
      );

      if (existingItemIndex >= 0) {
        // Item exists without customizations, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        return [...prevItems, item];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
