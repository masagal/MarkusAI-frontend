import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { GetToken } from "@clerk/types";

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
  getInventory: async (getToken: GetToken) => {
    const token = await getToken();
    const url = `${apiHost}${inventoryEndpoint}`;
    const headers = new Headers();
    if (token == null) {
      throw new Error("Inventory query received null token. Exiting");
      return Promise.reject();
    }
    headers.append("Authorization", `Bearer ${token}`);

    return fetch(url, { headers }).then((response) => response.json());
  },
};

const useInventory = () => {
  const auth = useAuth();
  const queryFunction =
    import.meta.env.MODE == "development"
      ? inventoryQueriesDevelopment.getInventory
      : inventoryQueries.getInventory;

  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => queryFunction(auth.getToken),
  });
};

export default useInventory;
