import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../utils/types";

export const InventoryCard = ({ product }: { product: Product }) => {
  return (
    <Card className="inventoryCard" sx={{ width: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.imageUrl ?? "src/assets/placeholder.png"}
      ></CardMedia>
      <CardContent>
        <Typography variant="h6">
          <p>{product.name}</p>
        </Typography>
        <Typography>
          <p>Quantity: {product.quantity}</p>
          <p>Location: {product.location}</p>
        </Typography>
      </CardContent>
    </Card>
  );
};
