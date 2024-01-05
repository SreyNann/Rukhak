import { useContext,  useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CartBottomBar from "@/pages/user/Cart/CartBottomBar";
import { useCart, CartContext } from "@/contexts/user/CartContext";
import { useNavigate } from "react-router-dom";


function CartItems() {
  const { cartItems, dispatch } = useCart();
  const {state} = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigateToCheckout = useNavigate()
  console.log(cartItems);

  const onCheckout = () => {
    navigateToCheckout("/checkout")
  }

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    handleTotalPrice();
  };

  const handleIncrement = (id) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
    handleTotalPrice();
  };

  const handleDecrement = (id) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
    handleTotalPrice();
  };

  const handleTotalPrice = () => {
    if (state && state.cartItems) {
      const newTotalPrice = state.cartItems.reduce(
        (total, product) => total + product.price * product.quantity, 0
      ).toFixed(2);
      setTotalPrice(newTotalPrice)
      console.log(newTotalPrice)
      return newTotalPrice
    }
  }

  useEffect(() => {
    console.log(totalPrice)
  }, [totalPrice])

  return (
    <>
      <Grid container spacing={3} padding={2}>
        {cartItems.map((product) => (
          <Grid item xs={12} key={product.id}>
            <Card sx={{ padding: "0.5rem" }} elevation={2}>
              <Button
                onClick={() => handleRemove(product.id)}
                sx={{ color: "black" }}
              >
                <CloseIcon /> Remove
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 1,
                    }}
                  />
                  <CardContent
                    sx={{ padding: "0 !important", marginLeft: "1rem" }}
                  >
                    
                    <Typography gutterBottom variant="body1">
                      {product.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {product.description}
                    </Typography> */}
                    <Typography
                      color="text.secondary"
                      sx={{ fontWeight: "Medium" }}
                    >
                      $ {product.price}
                    </Typography>
                  </CardContent>
                </Box>

                {/* button */}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton
                    variant="outlined"
                    sx={{
                      backgroundColor: "grey.400",
                      ":hover": { backgroundColor: "grey.400" },
                      borderRadius: "0.25rem 0.25rem 0 0",
                      width: 24,
                      height: 24,
                    }}
                    onClick={() => handleIncrement(product.id)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Box
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.400",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {product.quantity}
                  </Box>
                  <IconButton
                    variant="outlined"
                    sx={{
                      backgroundColor: "grey.400",
                      ":hover": { backgroundColor: "grey.400" },
                      borderRadius: "0 0 0.25rem 0.25rem",
                      width: 24,
                      height: 24,
                    }}
                    onClick={() => handleDecrement(product.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        <CartBottomBar totalPrice={totalPrice} buttonText="Checkout" onCheckout={onCheckout} />
      </Box>
    </>
  );
}

export default CartItems;
