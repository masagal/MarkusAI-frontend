import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "@mui/material";
import IsAdmin from "../Components/IsAdmin";
import { Request } from "../utils/types";

interface TableViewProps {
  requests: Request[];
  toggleApproval: (id: number, isApproved: boolean) => void;
  showArchived: boolean;
}

const TableView: React.FC<TableViewProps> = ({
  requests,
  toggleApproval,
  showArchived,
}) => {
  return (
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
            .filter((request: Request) => showArchived || !request.approved)
            .map((request: Request) => (
              <tr key={request.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">{request.id}</td>
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
                        onClick={() => toggleApproval(request.id, true)}
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
