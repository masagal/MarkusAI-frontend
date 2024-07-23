import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiHost = 'http://localhost:8080'; // Hardcoding deal with it potential github stalker
const requestsEndpoint = '/requests';

const getRequests = async () => {
  const url = `${apiHost}${requestsEndpoint}`;
  const response = await axios.get(url);
  return response.data;
};

const useRequests = () => {
  const queryFunction =
    import.meta.env.MODE === 'development'
      ? async () => {
        return [
          {
            id: 1,
            user: { id: 1, name: 'Alice' },
            products: [
              { id: 1, product: { id: 1, name: 'Product A' }, quantity: 2 },
              { id: 2, product: { id: 2, name: 'Product B' }, quantity: 5 },
            ],
            isApproved: false, //just for checking
          },
        ];
      }
      : getRequests;

  return useQuery({
    queryKey: ['requests'],
    queryFn: queryFunction,
  });
};

export default useRequests;
