import useInventoryData from "./ApiQueries/useInventory";

const Inventory = () => {
  const { isPending, error, data } = useInventoryData();

  if (isPending) return "Loading . . .";
  if (error) return "Error! Error! Eek! Error!";

  return (
    <table>
      <thead>
        <th>Product</th>
        <th>Quantity</th>
      </thead>
      <tbody>
        {data!.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Inventory;
