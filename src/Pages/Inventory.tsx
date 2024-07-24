import { InventoryCard } from "../Components/InventoryCard";
import useInventoryData from "../ApiQueries/InventoryQueries";
import { Product } from "../utils/types";

export const Inventory = () => {
  const { data, isLoading } = useInventoryData();
  console.log(data);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {!isLoading &&
        data &&
        data.length != 0 &&
        data.map((value: Product, index: number) => (
          <InventoryCard key={index} product={value} />
        ))}
    </main>
  );
};
