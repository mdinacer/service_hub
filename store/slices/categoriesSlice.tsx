import { RootState } from 'store/configureStore';

import { ServiceCategory } from '@models/service-category';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import agent from '@services/agent';

interface State {
  categoriesLoaded: boolean;
  status: 'idle' | 'pending' | 'error';
}

const initialState: State = {
  categoriesLoaded: false,
  status: 'idle'
};

const categoriesAdapter = createEntityAdapter<ServiceCategory>({
  selectId: (category) => category.id
});

export const fetchCategoriesAsync = createAsyncThunk<
  Array<ServiceCategory>,
  void,
  { state: RootState }
>(
  'categories/fetchCategoriesAsync',
  async (_, thunkApi) => {
    try {
      const response: Array<ServiceCategory> = await agent.Categories.list();
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: (_, thunkApi) => {
      const { categoriesLoaded, status } = thunkApi.getState().categories;

      if (categoriesLoaded || status !== 'idle') return false;
    }
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState<State>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAsync.pending, (state) => {
      state.status = 'pending';
      state.categoriesLoaded = false;
    });

    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      const categories = action.payload.map((category) => ({
        id: category.id,
        name: category.name,
        types: category.types.map((t) => ({
          id: t.id,
          name: t.name,
          categoryId: category.id
        }))
      }));

      console.log(categories);

      categoriesAdapter.setAll(state, categories || []);
      state.status = 'idle';
      state.categoriesLoaded = true;
    });

    builder.addCase(fetchCategoriesAsync.rejected, (state) => {
      state.status = 'error';
    });
  }
});

export const categoriesSelectors = categoriesAdapter.getSelectors(
  (state: RootState) => state.categories
);
