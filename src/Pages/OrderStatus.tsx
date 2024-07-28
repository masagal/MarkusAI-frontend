import { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Paper, Container } from '@mui/material';

export const OrderStatus = () => {
  const [orders] = useState([
    {
      id: 1,
      user: { name: "Admin User 1" },
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
    {
      id: 2,
      user: { name: "Admin User 2" },
      status: "APPROVED",
      approvedDate: new Date().toISOString(),
      request: {
        products: [
          {
            product: { name: "Red Whiteboard Marker" },
            quantity: 10,
          },
        ],
      },
    },
    {
      id: 3,
      user: { name: "Admin User 3" },
      status: "APPROVED",
      approvedDate: new Date().toISOString(),
      request: {
        products: [
          {
            product: { name: "Green Whiteboard Marker" },
            quantity: 3,
          },
        ],
      },
    },
    {
      id: 4,
      user: { name: "Admin User 4" },
      status: "APPROVED",
      approvedDate: new Date().toISOString(),
      request: {
        products: [
          {
            product: { name: "Black Whiteboard Marker" },
            quantity: 7,
          },
        ],
      },
    },
  ]);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Order Status
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} style={{ marginBottom: '1rem' }}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '100%',
                  backgroundColor: '#f9f9f9',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <ListItemText
                  primary={`Order for ${order.request.products.map(product => `${product.product.name} (Quantity: ${product.quantity})`).join(', ')}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textSecondary">
                        Status: {order.status} <br />
                        Approved by: {order.user.name} <br />
                        Approved on: {new Date(order.approvedDate).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default OrderStatus;
