import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../utils/types";
import { Place } from "@mui/icons-material";
import GrainIcon from "@mui/icons-material/Grain";

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
        <Typography variant="body1" className="font-medium">
          <div className="flex justify-items-stretch mt-20">
            <div className="flex text-center justify-items-center align-items-between flex-col basis-1/2">
              <div>
                <GrainIcon />
              </div>
              in stock
              <br />
              {product.quantity}
            </div>
            <div className="flex justify-items-center text-center align-items-between flex-col basis-1/2">
              <div>
                <Place />
              </div>
              {product.location}
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};
