const inventoryQueriesDevelopment = {
  getInventory: () => {
    return [
      { name: "Blue whiteboard markers", quantity: 4 },
      { name: "Orange whiteboard markers", quantity: 3 },
      { name: "Purple whiteboard markers", quantity: 9 },
      { name: "Green whiteboard markers", quantity: 67 },
      { name: "Oatly", quantity: 2 },
    ];
  },
};

const inventoryQueries = {};

const useInventoryData = () => {
  if (import.meta.env.DEV) {
    return {
      isPending: false,
      error: false,
      data: inventoryQueriesDevelopment.getInventory(),
    };
  }
  return { isPending: true, error: false, data: null };
};

export default useInventoryData;
