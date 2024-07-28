import { useState } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

export const OrderStatus = () => {
  const [orders] = useState([
    {
      id: 1,
      user: { name: "Admin User" },
      status: "APPROVED",
      approvedDate: new Date().toISOString(),
      request: {
        products: [
          {
            product: { name: "Blue Whiteboard Marker" },
            quantity: 5,
          },
        ],
      },
    },
  ]);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Order Status
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`Order for ${order.request.products.map(product => `${product.product.name} (Quantity: ${product.quantity})`).join(', ')}`}
              secondary={`Status: ${order.status} - Approved by: ${order.user.name} on ${new Date(order.approvedDate).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OrderStatus;
