import React, { useState, ChangeEvent } from "react";
import { useRequests, useApproveRequests } from "../ApiQueries/useRequests";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Components/toastUtils";
import "react-toastify/dist/ReactToastify.css";
import RequestsForm from "../Components/RequestsForm";
import IsAdmin from "../Components/IsAdmin";
import SearchBar from "../Components/SearchBar";
import { Request } from "../utils/types";
import { Typography, Button } from "@mui/material";

export const Requests: React.FC = () => {
  const { data: requests, error, isLoading, refetch } = useRequests();
  const approveRequests = useApproveRequests();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const filteredRequests = requests?.filter((request: Request) => {
    const userName = request.user?.name.toLowerCase() || "";
    const products = request.products.map(
      (product) => product.product?.name.toLowerCase() || ""
    );
    return (
      userName.includes(searchTerm.toLowerCase()) ||
      products.some((product) => product.includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <>
      <div className="container mx-auto p-4">
        <ToastContainer />
        <Button
          onClick={() => setShowArchived(!showArchived)}
          className="mb-4 px-4 py-2"
          variant="contained"
          color="primary"
        >
          Toggle Show Archived
        </Button>
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Typography variant="h3" className="mb-4">
          User Requests
        </Typography>
        {filteredRequests?.length === 0 ? (
          <Typography variant="body1">No requests at the moment.</Typography>
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
                {filteredRequests
                  ?.filter(
                    (request: Request) => showArchived || !request.approved
                  )
                  .map((request: Request) => (
                    <tr key={request.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b text-center">
                        {request.id}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {request.user?.name || "Unknown"}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        <ul>
                          {request.products.map((product) => (
                            <li key={product.id}>
                              {product.product?.name || "Unknown"} (Quantity:{" "}
                              {product.quantity})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <IsAdmin>
                        <td className="px-4 py-2 border-b text-center">
                          {!request.approved && (
                            <Button
                              onClick={() =>
                                toggleApproval(request.id, request.approved)
                              }
                              variant="contained"
                              color="primary"
                              className="px-3 py-1"
                            >
                              {request.approved ? <FaTimes /> : <FaCheck />}
                            </Button>
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
      <RequestsForm />
    </>
  );
};
