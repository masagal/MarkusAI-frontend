import { useQuery } from "@tanstack/react-query";

const apiHost = import.meta.env.VITE_API_HOST;
const productEndpoint = "/product";

const productQueriesDevelopment = {
  getProducts: async () => {
    return [
      { id: "1", name: "Post-it-lappar" },
      { id: "2", name: "Nyckelband SALT" },
      { id: "3", name: "Helmjölk" },
    ];
  },
};

const productQueries = {
  getProducts: async () => {
    const url = `${apiHost}${productEndpoint}`;
    console.log("getting " + url);
    return fetch(url).then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Failed to fetch products");
    });
  },
};

const useProducts = () => {
  const queryFunction =
    import.meta.env.MODE == "development"
      ? productQueriesDevelopment.getProducts
      : productQueries.getProducts;

  return useQuery({
    queryKey: ["products"],
    queryFn: queryFunction,
  });
};

export default useProducts;
