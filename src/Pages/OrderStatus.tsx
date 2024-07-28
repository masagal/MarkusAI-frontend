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
      <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Order Status
      </Typography>
      <Paper elevation={4} style={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#ecf0f1' }}>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} style={{ marginBottom: '1rem' }}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '100%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <ListItemText
                  primary={`Order for ${order.request.products.map(product => `${product.product.name} (Quantity: ${product.quantity})`).join(', ')}`}
                  primaryTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
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