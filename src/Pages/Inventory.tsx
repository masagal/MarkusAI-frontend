import { InventoryCard } from "../Components/InventoryCard";
import useInventoryData from "../ApiQueries/useInventory";
import { Product } from "../utils/types";
import SearchBar from "../Components/SearchBar";
import { useState } from "react";

export const Inventory = () => {
  const { data, isLoading } = useInventoryData();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {!isLoading &&
          filteredData &&
          filteredData.length !== 0 &&
          filteredData.map((value: Product, index: number) => (
            <InventoryCard key={index} product={value} />
          ))}
      </main>
    </div>
  );
};