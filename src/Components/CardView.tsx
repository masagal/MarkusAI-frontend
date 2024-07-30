import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import IsAdmin from "../Components/IsAdmin";
import { Request } from "../utils/types";

interface CardViewProps {
  requests: Request[];
  toggleApproval: (id: number, isApproved: boolean) => void;
  showArchived: boolean;
}

const CardView: React.FC<CardViewProps> = ({
  requests,
  toggleApproval,
  showArchived,
}) => {
  return (
    <Grid container spacing={2}>
      {requests
        .filter((request: Request) => showArchived || !request.approved)
        .map((request: Request) => (
          <Grid item xs={12} sm={6} md={4} key={request.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-2">
                  Request ID: {request.id}
                </Typography>
                <Typography variant="body1" className="mb-2">
                  User: {request.user?.name || "Unknown"}
                </Typography>
                <Typography variant="body1" className="mb-2">
                  Products:
                  <ul className="list-none p-0 m-0">
                    {request.products.map((product) => (
                      <li key={product.id}>
                        {product.product?.name || "Unknown"} (Quantity:{" "}
                        {product.quantity})
                      </li>
                    ))}
                  </ul>
                </Typography>
                <IsAdmin>
                  {!request.approved && (
                    <Box display="flex" justifyContent="center" mt={2}>
                      <IconButton
                        onClick={() => toggleApproval(request.id, true)}
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          borderRadius: "14px",
                          padding: "8px 16px",
                          minWidth: "64px",
                        }}
                      >
                        {request.approved ? <FaTimes /> : <FaCheck />}
                      </IconButton>
                    </Box>
                  )}
                </IsAdmin>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default CardView;