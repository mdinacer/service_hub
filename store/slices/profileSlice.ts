import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { MemberUpdateInput } from '../../gql/member/mutations';
import { MemberProfile } from '../../models/member-profile';
import agent from '../../services/agent';
import { RootState } from '../configureStore';

interface ProfileState {
    profile: MemberProfile | null;
    profileLoaded: boolean;
    status: 'idle' | 'pending' | 'error';
}

const initialState: ProfileState = {
    profile: null,
    profileLoaded: false,
    status: 'idle'
};

export const fetchProfileAsync = createAsyncThunk<
    MemberProfile,
    void,
    { state: RootState }
>(
    'profile/fetchProfileAsync',
    async (_, thunkApi) => {
        try {
            const response: MemberProfile = await agent.Account.me();
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: (_, thunkApi) => {
            const { profileLoaded, status } = thunkApi.getState().profile;

            if (profileLoaded || status !== 'idle') return false;
        }
    }
);

export const updateProfileAsync = createAsyncThunk<
    MemberProfile,
    Partial<MemberUpdateInput>,
    { state: RootState }
>('profile/updateProfileAsync', async (values, thunkApi) => {
    try {
        const response: MemberProfile = await agent.Account.update(values);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data });
    }
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileAsync.pending, (state) => {
            state.status = 'pending';
        });

        builder.addCase(updateProfileAsync.pending, (state) => {
            state.status = 'pending';
        });

        builder.addMatcher(
            isAnyOf(fetchProfileAsync.rejected, updateProfileAsync.rejected),
            (state) => {
                state.status = 'error';
                state.profileLoaded = true;
            }
        );

        builder.addMatcher(
            isAnyOf(fetchProfileAsync.fulfilled, updateProfileAsync.fulfilled),
            (state, action) => {
                state.status = 'idle';
                state.profile = action.payload;
                state.profileLoaded = true;
            }
        );
    }
});

export const { setProfile } = profileSlice.actions;
