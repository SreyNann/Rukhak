import { Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/user/CartContext";

function CartLayout() {
  return (
    <>
      <CartProvider>
        <Outlet />;
      </CartProvider>
    </>
  );
}

export default CartLayout;
