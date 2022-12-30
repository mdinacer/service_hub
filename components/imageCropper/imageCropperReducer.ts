import { Reducer } from 'react';

type Action =
    | { type: 'SET_CROPPER'; cropper: Cropper | null }
    | { type: 'SET_FILE_NAME'; fileName: string }
    | { type: 'SET_HEIGHT'; height: number }
    | { type: 'SET_IMAGE'; image: string }
    | { type: 'SET_WIDTH'; width: number }

interface State {
    cropper: Cropper | null;
    fileName: string;
    height: number;
    image: string;
    width: number;
}

export const imageCropperReducerInitialState: State = {
    cropper: null,
    fileName: '',
    height: 0,
    image: '',
    width: 0,
};

export const imageCropperReducer: Reducer<State, Action> = (
    state: State,
    action: Action
) => {
    switch (action.type) {
        case 'SET_CROPPER': return { ...state, cropper: action.cropper };

        case 'SET_FILE_NAME': return { ...state, fileName: action.fileName };

        case 'SET_HEIGHT': return { ...state, height: action.height };

        case 'SET_IMAGE': return { ...state, image: action.image };

        case 'SET_WIDTH': return { ...state, width: action.width };

        default: return state;
    }
};
