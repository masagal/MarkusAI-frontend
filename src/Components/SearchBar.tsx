import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearchChange }) => {
  return (
    <TextField
      label="Search Orders"
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
      style={{ marginBottom: '1rem' }}
    />
  );
};

export default SearchBar;