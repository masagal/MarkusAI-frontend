import { Card, CardContent, CardMedia } from "@mui/material";
import { Product } from "../utils/types";

export const InventoryCard = ({ product }: { product: Product }) => {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="src/assets/placeholder.png"
      ></CardMedia>
      <CardContent>
        <p>Product name: {product.name}</p>
        <p>Quantity: {product.quantity}</p>
      </CardContent>
    </Card>
  );
};
