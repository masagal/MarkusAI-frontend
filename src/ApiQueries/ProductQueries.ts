import { useQuery } from "@tanstack/react-query";

const productQueriesDevelopment = [
  { id: "1", name: "Post-it-lappar" },
  { id: "2", name: "Nyckelband SALT" },
  { id: "3", name: "Helmjölk" },
];

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productQueriesDevelopment,
  });
};

export default useProducts;
