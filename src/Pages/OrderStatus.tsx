import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Paper, Container } from '@mui/material';

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
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Order Status
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} style={{ marginBottom: '1rem' }}>
              <Box
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '100%',
                  backgroundColor: '#f9f9f9',
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
