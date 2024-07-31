import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { useOrders } from "../ApiQueries/useOrders";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Components/toastUtils";
import { useAuth } from "@clerk/clerk-react";
import { changeOrderStatus } from "../ApiQueries/useOrders";
import { Order } from "../utils/types";
import { useState, ChangeEvent } from "react";
import SearchBar from "../Components/SearchBar";
import { SkeletonLoading } from "../Components/SkeletonLoading";

export const OrderStatus = () => {
  const { data: orders, error, isLoading, refetch } = useOrders();
  const { getToken } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return (
      <>
        <Typography variant="h3" className="mb-8 text-slate-600">
          Order Status
        </Typography>
        <SkeletonLoading />
      </>
    );
  }

  if (error) {
    console.error("Error loading requests:", error);
    return <div>Error loading orders</div>;
  }

  console.log("Fetched orders:", orders);

  const filteredOrders = orders.filter((order: Order) => {
    const approvedDateString = new Date(
      order.approvedDate
    ).toLocaleDateString();
    return (
      order.approvingAdminUser.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      approvedDateString.includes(searchTerm) ||
      order.request.products.some((product) =>
        product.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const handleOrderStatusChange = async (
    orderId: number,
    orderStatus: string
  ) => {
    const token = await getToken();

    changeOrderStatus(token, orderId, orderStatus)
      .then(() => {
        toastSuccess("Order status updated successfully!");
        refetch(); // Refresh the data after update
      })
      .catch((e: Error) => {
        console.error("Failed to update order status:", e);
        toastError("Failed to update order status.");
      });
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Typography
        variant="h3"
        gutterBottom
        style={{ fontWeight: "bold", color: "#2c3e50" }}
      >
        Order Status
      </Typography>
      <SearchBar
        label="Search Orders"
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {filteredOrders.length == 0 && (
        <Typography variant="body1">No orders found</Typography>
      )}
      {filteredOrders.length != 0 && (
        <Paper
          elevation={4}
          style={{
            padding: "2rem",
            borderRadius: "12px",
            backgroundColor: "#ecf0f1",
          }}
        >
          <List>
            {filteredOrders.map((order: Order) => (
              <ListItem key={order.id} style={{ marginBottom: "1rem" }}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "1rem",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <ListItemText
                    primary={`Order for ${order.request.products
                      .map(
                        (product) =>
                          `${product.product.name} (Quantity: ${product.quantity})`
                      )
                      .join(", ")}`}
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "textPrimary",
                    }}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          Status: {order.status} <br />
                          Approved by: {order.approvingAdminUser.name} <br />
                          Approved on:{" "}
                          {new Date(order.approvedDate).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                  {order.status == "PENDING" && (
                    <>
                      <Button
                        onClick={() =>
                          handleOrderStatusChange(order.id, "ARRIVED")
                        }
                      >
                        Confirm Arrival
                      </Button>
                      <Button
                        onClick={() =>
                          handleOrderStatusChange(order.id, "CANCELLED")
                        }
                        color="error"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default OrderStatus;
