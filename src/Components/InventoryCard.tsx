import { Card, CardContent, CardActions, Button } from "@mui/material";
import { Product } from "../utils/types";

export const InventoryCard = ({ product }: { product: Product }) => {
  const request = () => {
    console.log("Send me to request page pls");
  };

  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <p>Product name: {product.name}</p>
        <p>Quantity: {product.quantity}</p>
      </CardContent>
      <CardActions>
        <Button onClick={request}>Request</Button>
      </CardActions>
    </Card>
  );
};
