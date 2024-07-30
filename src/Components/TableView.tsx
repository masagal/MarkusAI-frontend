import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button, Typography } from "@mui/material";
import IsAdmin from "../Components/IsAdmin";
import { Request } from "../utils/types";

interface TableViewProps {
  requests: Request[];
  toggleApproval: (id: number, isApproved: boolean) => void;
  showArchived: boolean;
}

const TableView: React.FC<TableViewProps> = ({ requests, toggleApproval, showArchived }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">
              <Typography variant="h6">Request ID</Typography>
            </th>
            <th className="px-4 py-2 border-b">
              <Typography variant="h6">User</Typography>
            </th>
            <th className="px-4 py-2 border-b">
              <Typography variant="h6">Products</Typography>
            </th>
            <IsAdmin>
              <th className="px-4 py-2 border-b">
                <Typography variant="h6">Actions</Typography>
              </th>
            </IsAdmin>
          </tr>
        </thead>
        <tbody>
          {requests
            .filter((request: Request) => showArchived || !request.approved)
            .map((request: Request) => (
              <tr key={request.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">
                  <Typography variant="body1">{request.id}</Typography>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <Typography variant="body1">{request.user?.name || "Unknown"}</Typography>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <Typography variant="body1">
                    <ul className="list-none p-0 m-0">
                      {request.products.map((product) => (
                        <li key={product.id}>
                          {product.product?.name || "Unknown"} (Quantity: {product.quantity})
                        </li>
                      ))}
                    </ul>
                  </Typography>
                </td>
                <IsAdmin>
                  <td className="px-4 py-2 border-b text-center">
                    {!request.approved && (
                      <Button
                        onClick={() => toggleApproval(request.id, request.approved)}
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
  );
};

export default TableView;