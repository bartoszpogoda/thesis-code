import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {PlayerCreatorActionsUnion, PlayerCreatorActionTypes} from './player-creator.actions';


export interface State {
  stage: number;
  avatarUploading: boolean;
  avatarUploaded: boolean;
  buttonText: string;
}

const initialState: State = {
  stage: 0,
  avatarUploading: false,
  avatarUploaded: false,
  buttonText: 'Pomiń krok'
};

export function reducer(
  state: State = initialState,
  action: PlayerCreatorActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case PlayerCreatorActionTypes.RegisterSuccess:
      return {
        ...state,
        stage: 2
      };

    case PlayerCreatorActionTypes.UploadAvatar:
      return {
        ...state,
        avatarUploading: true
      };

    case PlayerCreatorActionTypes.UploadAvatarSuccess:
      return {
        ...state,
        avatarUploading: false,
        avatarUploaded: true,
        buttonText: 'Pokaż profil'
      };

    case PlayerCreatorActionTypes.BaseDateSubmitted:
      return {
        ...state,
        stage: 1
      };

    default:
      return state;
  }
}

export const getStage = (state: State) => state.stage;
export const getAvatarUploading = (state: State) => state.avatarUploading;
export const getAvatarUploaded = (state: State) => state.avatarUploaded;
export const getButtonText = (state: State) => state.buttonText;

