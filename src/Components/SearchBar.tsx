import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  label: string;
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  label,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <TextField
      label={label}
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
      style={{ marginBottom: "1rem" }}
    />
  );
};

export default SearchBar;
