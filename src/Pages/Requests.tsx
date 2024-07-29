import React from "react";
import { useRequests, useApproveRequests } from "../ApiQueries/useRequests";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Components/toastUtils";
import "react-toastify/dist/ReactToastify.css";
import RequestsForm from "../Components/RequestsForm";
import { useState } from "react";
import IsAdmin from "../Components/IsAdmin";

export const Requests: React.FC = () => {
  const { data: requests, error, isLoading, refetch } = useRequests();
  const approveRequests = useApproveRequests();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const toggleApproval = async (id: number, isApproved: boolean) =>
    approveRequests(id, isApproved)
      .then(() => {
        toastSuccess("Request approval status updated successfully!");
        refetch(); // Refresh the data after update
      })
      .catch((e: Error) => {
        console.error("Failed to update approval status:", e);
        toastError("Failed to update approval status.");
      });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error loading requests:", error);
    return <div>Error loading requests</div>;
  }

  console.log("Fetched requests:", requests); // Log the fetched data

  return (
    <>
      <div className="container mx-auto p-4">
        <ToastContainer />
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Toggle Show Archived
        </button>
        <h1 className="text-3xl font-bold mb-4">User Requests</h1>
        {requests?.length === 0 ? (
          <p>No requests at the moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Request ID</th>
                  <th className="px-4 py-2 border-b">User</th>
                  <th className="px-4 py-2 border-b">Products</th>
                  <IsAdmin>
                    <th className="px-4 py-2 border-b">Actions</th>
                  </IsAdmin>
                </tr>
              </thead>
              <tbody>
                {requests
                  ?.filter((request) => showArchived || !request.approved)
                  .map((request) => (
                    <tr key={request.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b text-center">{request.id}</td>
                      <td className="px-4 py-2 border-b text-center">
                        {request.user?.name || "Unknown"}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        <ul>
                          {request.products.map((product) => (
                            <li key={product.id}>
                              {product.product?.name || "Unknown"} (Quantity: {product.quantity})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <IsAdmin>
                        <td className="px-4 py-2 border-b text-center">
                          {!request.approved && (
                            <button
                              onClick={() => toggleApproval(request.id, request.isApproved)}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-900"
                            >
                              {request.isApproved ? <FaTimes /> : <FaCheck />}
                            </button>
                          )}
                        </td>
                      </IsAdmin>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <RequestsForm refetch={refetch} />
    </>
  );
};

export default Requests;
