import React from "react";
import Navbar from "@/components/layout/Navbar";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout or open WhatsApp
    console.log("Proceeding to checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="cart" />

      <main className="container mx-auto px-4 pt-[90px] pb-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <CartList
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            </div>

            {/* Cart Summary */}
            <div>
              <CartSummary items={cartItems} onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 FlavorLoyalty. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-sm hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-primary">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
