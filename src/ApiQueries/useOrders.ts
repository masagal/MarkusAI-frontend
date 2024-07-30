import { useAuth } from "@clerk/clerk-react";
import { GetToken } from "@clerk/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiHost = import.meta.env.VITE_API_HOST;
const ordersEndpoint = "/orders";

const getOrders = async (getToken: GetToken) => {
  const token = await getToken();
  const url = `${apiHost}${ordersEndpoint}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const useOrders = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(getToken),
  });
};

const changeOrderStatus = async (
  token: string | null,
  orderId: number,
  orderStatus: string
) => {
  const url = `${apiHost}${ordersEndpoint}`;
  const data = {
    orderId: orderId,
    orderStatus: orderStatus,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await axios.patch(url, data, { headers: headers });
};

export { useOrders, changeOrderStatus };
