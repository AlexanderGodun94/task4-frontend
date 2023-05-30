import { useEffect } from 'react';
import { useRequestStore } from './store';
import { getRequestTypes } from '../api';

export const useRequestTypes = () => {
  const { types, setTypes } = useRequestStore(state => state);

  const fetchRequestTypes = async () => {
    try {
      const res = await getRequestTypes();
      setTypes(res.data);
    } catch (e) {
      console.error('FETCH_REQUEST_TYPES', e);
    }
  };

  useEffect(() => {
    (async () => {
      if (!types) {
        await fetchRequestTypes();
      }
    })();
  }, []);


  return { types: types, refetch: fetchRequestTypes };
};
