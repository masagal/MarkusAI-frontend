import React from 'react';
import axios from 'axios';
import useRequests from '../ApiQueries/useRequests'; 
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { toastError, toastSuccess } from '../Components/toastUtils';
import 'react-toastify/dist/ReactToastify.css';

const apiHost = 'http://localhost:8080'; // Hardcoding cuzzzzzz

export const Requests: React.FC = () => {
  const { data: requests, error, isLoading, refetch } = useRequests();

  const toggleApproval = async (id: number, isApproved: boolean) => {
    try {
      await axios.patch(`${apiHost}/requests/approve/${id}`, { isApproved: !isApproved });
      toastSuccess('Request approval status updated successfully!');
      refetch(); // Refresh the data after update
    } catch (error) {
      console.error('Failed to update approval status:', error);
      toastError('Failed to update approval status.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading requests</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Really silly User Requests can be ignored, made by plebs</h1>
      {requests?.map((request) => (
        <div key={request.id} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200">
          <span className="flex-1 text-center">{`Request ID: ${request.id}`}</span>
          <span className="flex-1 text-center">{`User: ${request.user.name}`}</span>
          <span className="flex-1 text-center">
            Products:
            <ul>
              {request.products.map((product) => (
                <li key={product.id}>{`${product.product.name} (Quantity: ${product.quantity})`}</li>
              ))}
            </ul>
          </span>
          <div className="flex space-x-2">
            <button onClick={() => toggleApproval(request.id, request.isApproved)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-900">
              {request.isApproved ? <FaTimes /> : <FaCheck />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
