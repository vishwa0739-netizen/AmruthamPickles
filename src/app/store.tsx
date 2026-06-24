import { createContext, useContext, useReducer, useState, type ReactNode } from "react";
import type { Product } from "./data";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedWeight: string;
  selectedSpice: string;
  unitPrice: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; weight: string; spice: string } }
  | { type: "UPDATE_QTY"; payload: { productId: string; weight: string; spice: string; quantity: number } }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = `${action.payload.product.id}-${action.payload.selectedWeight}-${action.payload.selectedSpice}`;
      const existing = state.items.find(
        (i) => `${i.product.id}-${i.selectedWeight}-${i.selectedSpice}` === key
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            `${i.product.id}-${i.selectedWeight}-${i.selectedSpice}` === key
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, isOpen: true, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM": {
      const key = `${action.payload.productId}-${action.payload.weight}-${action.payload.spice}`;
      return {
        ...state,
        items: state.items.filter(
          (i) => `${i.product.id}-${i.selectedWeight}-${i.selectedSpice}` !== key
        ),
      };
    }
    case "UPDATE_QTY": {
      const key = `${action.payload.productId}-${action.payload.weight}-${action.payload.spice}`;
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => `${i.product.id}-${i.selectedWeight}-${i.selectedSpice}` !== key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          `${i.product.id}-${i.selectedWeight}-${i.selectedSpice}` === key
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type WishlistContextType = {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartTotal: number;
  cartCount: number;
  addToCart: (product: Product, weight: string, spice: string, qty?: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);
const WishlistContext = createContext<WishlistContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [wishlist, setWishlist] = useState<string[]>([]);

  const cartTotal = state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  function addToCart(product: Product, weight: string, spice: string, qty = 1) {
    const weightObj = product.weights.find((w) => w.label === weight) ?? product.weights[0];
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        quantity: qty,
        selectedWeight: weightObj.label,
        selectedSpice: spice,
        unitPrice: weightObj.price,
      },
    });
  }

  function toggleWishlist(id: string) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function isWishlisted(id: string) {
    return wishlist.includes(id);
  }

  return (
    <CartContext.Provider value={{ state, dispatch, cartTotal, cartCount, addToCart }}>
      <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within StoreProvider");
  return ctx;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within StoreProvider");
  return ctx;
}
