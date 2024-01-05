// import { useContext } from "react";
import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AddIcon from "@mui/icons-material/Add";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CartBottomBar from "@/pages/user/Cart/CartBottomBar";
// import { useCart, CartContext} from "@/contexts/user/CartContext"

function Checkout() {
  // const { state } = useContext(CartContext);

  // const renderProductDetails = () => {
  //   return state.cartItems.map((product) => (
  //     <Box key={product.id} gap={1} sx={{ display: "flex", marginTop: "0.5rem" }}>
  //       <Typography>{product.quantity}</Typography>
  //       <Typography>x</Typography>
  //       <Typography>{product.name}</Typography>
  //     </Box>
  //   ));
  // };

  return (
    <>
      <SecondaryTopNavigationBar returnPrev label="Checkout" />
      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "0.5rem" }} elevation={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box gap={1} sx={{ display: "flex" }}>
                <Box>
                  <PlaceOutlinedIcon />
                </Box>
                <Box variant="h5"> Delivery Address</Box>
              </Box>
              <Button sx={{ color: "text.primary" }}>
                <ModeEditOutlineOutlinedIcon />
              </Button>
            </Box>
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", padding: "0 8px" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://css-tianguis.com/wp-content/uploads/2020/03/google-maps-links-1024x546.png"
                  alt="map"
                  sx={{ width: 56, height: 56, borderRadius: 1 }}
                />
                <CardContent
                  sx={{ padding: "0 !important", marginLeft: "1rem" }}
                >
                  <Typography gutterBottom variant="body1">
                    Jennie Kim
                  </Typography>
                  <Typography>(012) 345-678</Typography>
                </CardContent>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "0.5rem" }}>
            <Box gap={1} sx={{ display: "flex" }}>
              <Box>
                <AccountBalanceWalletOutlinedIcon />
              </Box>
              <Box>Payment Method</Box>
            </Box>
            <Button sx={{ color: "text.primary" }}>
              <AddIcon /> Add a Payment Method
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "0.5rem" }}>
            <Box gap={1} sx={{ display: "flex" }}>
              <Box>
                <SellOutlinedIcon />
              </Box>
              <Box sx={{ color: "text.primary" }}>Total Price</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "0.5rem",
                justifyContent: "space-between",
              }}
            >
              <Box gap={1} sx={{ display: "flex" }}>
                <Typography>1</Typography>
                <Typography>x</Typography>
                <Typography>product name</Typography>
              </Box>
              <Box>$ 6.99</Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box>
        <CartBottomBar totalPrice={6.99} buttonText="Place Order" />
      </Box>
    </>
  );
}

export default Checkout;
