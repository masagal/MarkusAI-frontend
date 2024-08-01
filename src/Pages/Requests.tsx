import React, { useState, ChangeEvent } from "react";
import { useRequests, useApproveRequests } from "../ApiQueries/useRequests";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Components/toastUtils";
import "react-toastify/dist/ReactToastify.css";
import RequestsForm from "../Components/RequestsForm";
import SearchBar from "../Components/SearchBar";
import { Request } from "../utils/types";
import { Typography, Button, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TableView from "../Components/TableView";
import CardView from "../Components/CardView";
import { SkeletonLoading } from "../Components/SkeletonLoading";

export const Requests: React.FC = () => {
  const { data: requests, error, isLoading, refetch } = useRequests();
  const approveRequests = useApproveRequests();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleApproval = async (id: number, isApproved: boolean) =>
    approveRequests(id, isApproved)
      .then(() => {
        toastSuccess("Request approval status updated successfully!");
        refetch(); // Refresh the data after update
        setShowArchived(showArchived);
      })
      .catch((e: Error) => {
        console.error("Failed to update approval status:", e);
        toastError("Failed to update approval status.");
      });

  if (isLoading) {
    return (
      <>
        <Typography variant="h3" className="mb-8 text-slate-600">
          User Requests
        </Typography>
        <SkeletonLoading />
      </>
    );
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
      <div className="container mx-auto" style={{ overflowY: "auto" }}>
        <ToastContainer />
        <Typography variant="h3" className="mb-8 font-bold text-[#2c3e50]">
          User Requests
        </Typography>
        <Grid container spacing={2} alignItems="center" className="mb-4">
          <Grid item xs={9}>
            <SearchBar
              label="Search Requests"
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              textAlign: "right",
              paddingRight: isMobile ? "8px" : "0",
              marginTop: isMobile ? "-10px" : "-15px",
              marginRight: isMobile ? "8px" : "0",
            }}
          >
            <Button
              onClick={() => setShowArchived(!showArchived)}
              variant="contained"
              color="primary"
              style={{
                fontSize: isMobile ? "0.75rem" : "1rem",
                padding: isMobile ? "4px 8px" : "8px 16px",
                minWidth: isMobile ? "130px" : "auto",
              }}
            >
              {showArchived ? "Hide Archived" : "Show Archived"}
            </Button>
          </Grid>
        </Grid>
        {filteredRequests?.length === 0 ? (
          <Typography variant="body1" className="mt-4">
            No requests at the moment.
          </Typography>
        ) : (
          <>
            {isMobile ? (
              <CardView
                requests={filteredRequests}
                toggleApproval={toggleApproval}
                showArchived={showArchived}
              />
            ) : (
              <TableView
                requests={filteredRequests}
                toggleApproval={toggleApproval}
                showArchived={showArchived}
              />
            )}
          </>
        )}
      </div>
      <RequestsForm />
    </>
  );
};
