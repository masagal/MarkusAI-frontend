import { InventoryCard } from "../Components/InventoryCard";
import useInventoryData from "../ApiQueries/InventoryQueries";
import { Product } from "../utils/types";

export const Inventory = () => {
  const { data, isLoading } = useInventoryData();
  console.log(data);

  return (
    <main className="flex gap-10">
      {!isLoading &&
        data &&
        data.length != 0 &&
        data.map((value: Product, index: number) => (
          <InventoryCard key={index} product={value} />
        ))}
    </main>
  );
};
