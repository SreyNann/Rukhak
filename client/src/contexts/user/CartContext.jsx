// CartContext.js
import { createContext, useReducer, useContext, useEffect } from "react";

// Initial state for the cart
const initialState = {
  cartItems: [],
  totalPrice: 0,
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
      };

    default:
      return state;
  }
};

// Create context and export it
export const CartContext = createContext();

// CartProvider component to wrap your app with
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const totalPrice = state.cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    dispatch({ type: "UPDATE_TOTAL_PRICE", payload: { totalPrice } });
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart state and dispatch function
const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export { CartProvider, useCart };
