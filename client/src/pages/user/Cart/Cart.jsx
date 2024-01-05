import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import CartItems from "@/pages/user/Cart/CartItems";
import Box from "@mui/material/Box";

function Cart() {
  return (
    <Box>
      <SecondaryTopNavigationBar returnPrev label="Cart" />
      <CartItems />
  
    </Box>
  );
}

export default Cart;
