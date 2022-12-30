import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  categoriesSelectors,
  fetchCategoriesAsync
} from 'store/slices/categoriesSlice';

export default function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesSelectors.selectAll);
  const { categoriesLoaded, status } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!categoriesLoaded && status === 'idle') {
      dispatch(fetchCategoriesAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesLoaded, status]);

  return { categories };
}
