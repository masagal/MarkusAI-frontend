import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

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
  getProducts: async (getToken) => {
    const token = await getToken();
    const url = `${apiHost}${productEndpoint}`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    console.log("getting " + url);
    return fetch(url, { headers }).then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Failed to fetch products");
    });
  },
};

const useProducts = () => {
  const auth = useAuth();

  const queryFunction =
    import.meta.env.MODE == "development"
      ? productQueriesDevelopment.getProducts
      : productQueries.getProducts;

  return useQuery({
    queryKey: ["products"],
    queryFn: () => queryFunction(auth.getToken),
  });
};

export default useProducts;
