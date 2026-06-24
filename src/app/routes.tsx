import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProductListing } from "./pages/ProductListing";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { Account } from "./pages/Account";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Policy } from "./pages/Policy";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      // All category slugs: pickles, pachadies, podies, fryums, combos, no-garlic, all
      { path: "collections/:category", Component: ProductListing },
      { path: "products/:slug", Component: ProductDetail },
      { path: "checkout", Component: Checkout },
      { path: "account", Component: Account },
      { path: "account/:tab", Component: Account },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "policies/:type", Component: Policy },
      { path: "search", Component: ProductListing },
      { path: "*", Component: NotFound },
    ],
  },
]);
