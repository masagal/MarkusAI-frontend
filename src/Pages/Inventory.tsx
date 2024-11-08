import { InventoryCard } from "../Components/InventoryCard";
import useInventoryData from "../ApiQueries/useInventory";
import { Product } from "../utils/types";
import SearchBar from "../Components/SearchBar";
import { useState } from "react";
import { Typography } from "@mui/material";
import { InventoryLoading } from "../Components/InventoryLoading";

export const Inventory = () => {
  const { data, isLoading } = useInventoryData();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return (
      <>
        <Typography variant="h3" className="mb-8 text-slate-600">
          Inventory
        </Typography>
        <InventoryLoading />
      </>
    );
  }

  const filteredData = data?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Typography variant="h3" className="mb-8 font-bold text-[#2c3e50]">
        Inventory
      </Typography>
      <SearchBar
        label="Search Inventory"
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <main className="flex flex-wrap pt-10 gap-y-10 justify-center md:justify-between">
        {!isLoading &&
          filteredData &&
          filteredData.length !== 0 &&
          filteredData.map((value: Product, index: number) => (
            <InventoryCard key={index} product={value} />
          ))}
      </main>
    </>
  );
};
