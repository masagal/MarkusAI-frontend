import useInventoryData from "./ApiQueries/InventoryQueries";

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
        {
          // @ts-expect-error: Type error from controller and datetimepicker
          data!.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Inventory;
