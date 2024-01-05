import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/features/api/getProductsSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useDeleteReviewMutation } from "@/features/review/reviewSlice";

// MUI components
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

// MUI icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Internal components
import CardCarousel from "@/components/user/CardCarousel";
import ProductCarousel from "./ProductCarousel";
import SectionHeader from "@/components/user/SectionHeader";
import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";
import TopSection from "./TopSection";
import BuySection from "./BuySection";
import StoreInfoSection from "./StoreInfoSection";
import DescriptionSection from "./DescriptionSection";
import ReviewsSection from "./ReviewsSection";
import CurrentUserReview from "./CurrentUserReview";
import ErrorModal from "@/components/user/ErrorModal";

const mb2 = { marginBottom: "1rem" };
const p2 = { padding: "1rem" };

const SectionBox = styled(Box)(mb2);

const ProductDetailsPage = () => {
  const userId = useSelector(selectCurrentUserId);
  const { productId } = useParams();
  const { isError: isErrorDeleteReview, error: errorDeleteReview } =
    useDeleteReviewMutation()[1];
  const { data: product, isLoading } = useGetProductByIdQuery(productId);
  const reviews = product?.reviews.slice(0, 5);
  const { data: similarProducts } = useGetAllProductsQuery({
    categories: product?.categories[0],
  });

  console.log(product);

  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {isErrorDeleteReview && (
        <ErrorModal
          error={errorDeleteReview}
          errorTitle="Cannot delete review!"
        />
      )}
      <Box component="main" sx={{ marginBottom: "2.5rem" }}>
        {/* Top Bar */}
        <SecondaryTopNavigationBar
          returnPrevLink={-1}
          rightIcon={<ShoppingCartIcon sx={{ color: "text.primary" }} />}
          rightIconLink="/your-cart"
        />
        {isLoading && (
          <Box sx={p2}>
            <ProductDetailsSkeleton />
          </Box>
        )}
        {product && (
          <Box sx={{ backgroundColor: "background.default" }}>
            {/* Product Carousel */}
            <ProductCarousel
              images={[product.signedImgCover, ...product.signedMedia]}
              averageRating={product.averageRating}
            />

            {/* Details wrapper */}
            <Box sx={p2}>
              {/* Top section */}
              <SectionBox>
                <TopSection
                  unitPrice={product.unitPrice}
                  title={product.title}
                />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Buy section */}
              <SectionBox>
                <BuySection quantity={quantity} setQuantity={setQuantity} />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Info section */}
              <SectionBox>
                <StoreInfoSection seller={product.sellerId} />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Description section */}
              <SectionBox>
                <DescriptionSection description={product.description} />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Reviews section */}
              <SectionBox>
                <ReviewsSection reviews={reviews} productId={productId} />
              </SectionBox>

              {/* Current user review or create review button */}
              <SectionBox id="user-review">
                <CurrentUserReview
                  reviews={reviews}
                  productId={productId}
                  userId={userId}
                />
              </SectionBox>

              {/* Similar Product section */}
              <SectionBox>
                <SectionHeader title="similar products" />
                {similarProducts && (
                  <CardCarousel products={similarProducts?.data} />
                )}
              </SectionBox>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProductDetailsPage;
