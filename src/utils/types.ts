export type Product = {
  name: string;
  quantity: number;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type Message = {
  sender: string;
  sentAt: string;
  contents: string;
};

export type SingleProduct = {
  id: number;
  name: string;
};

export type InventoryItem = {
  id: string;
  product: SingleProduct;
  quantity: number;
};

export type User = {
  clerkId: string;
  email: string;
  id: number;
  isAdmin: boolean;
  name: string;
};

export type Request = {
  approved: boolean;
  id: number;
  products: InventoryItem[];
  user: User;
};

export type Order = {
  approvedDate: Date;
  approvingAdminUser: User;
  id: number;
  request: Request;
  status: string;
};
