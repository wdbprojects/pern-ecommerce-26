export const routes = {
  home: "/",
  about: "/about",
  /* DASHBOARD */
  dashboard: "/dashboard",
  admin: "/dashboard/admin",
  /* AUTH */
  login: "/auth/login",
  register: "/auth/register",
  /* ECOMMERCE */
  catalog: "/products/catalog",
  products: "/products",
  productDetails: (slug: string) => {
    return `/products/${slug}`;
  },
  cart: "/cart",
  orders: "/orders",
  orderItem: (id: string) => {
    return `/order/${id}`;
  },
};
