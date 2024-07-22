import { useQuery } from "@tanstack/react-query";

const apiHost = import.meta.env.VITE_API_HOST;
const inventoryEndpoint = "/inventory";

const inventoryQueriesDevelopment = {
  getInventory: () => {
    return [
      { name: "Blåa whiteboardpennor", quantity: 4 },
      { name: "Orangea whiteboardpennor", quantity: 3 },
      { name: "Lila whiteboardpennor", quantity: 9 },
      { name: "Gröna whiteboardpennor", quantity: 67 },
      { name: "Gräslök", quantity: 2 },
    ];
  },
};

const inventoryQueries = {
  getInventory: async () => {
    const url = `${apiHost}${inventoryEndpoint}`;

    return fetch(url).then((response) => response.json());
  },
};

const useInventoryData = () => {
  const queryFunction =
    import.meta.env.MODE == "development"
      ? inventoryQueriesDevelopment.getInventory
      : inventoryQueries.getInventory;

  return useQuery({
    queryKey: ["inventory"],
    queryFn: queryFunction,
  });
};

export default useInventoryData;
