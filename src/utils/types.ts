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
