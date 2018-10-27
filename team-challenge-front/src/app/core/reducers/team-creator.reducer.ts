import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {TeamCreatorActionsUnion, TeamCreatorActionTypes} from '../actions/team-creator.actions';
import {Team} from '../models/team';

export interface State {
  stage: number;
  team: Team;
  stageAvatar: {
    btnText: string;
    uploading: boolean;
    uploaded: boolean;
  };
}

const initialState: State = {
  stage: 0,
  team: null,
  stageAvatar: {
    btnText: 'Pomiń krok',
    uploading: false,
    uploaded: false
  }
};

export function reducer(
  state: State = initialState,
  action: TeamCreatorActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case TeamCreatorActionTypes.CreateTeamSuccess:
      return {
        ...state,
        stage: 1,
        team: action.payload
      };

    case TeamCreatorActionTypes.UploadAvatar:
      return {
        ...state,
        stageAvatar: {
          ...state.stageAvatar,
          uploading: true
        }
      };

    case TeamCreatorActionTypes.UploadAvatarSuccess:
      return {
        ...state,
        stageAvatar: {
          ...state.stageAvatar,
          uploading: false,
          uploaded: true,
          btnText: 'Dalej'
        }
      };

    case TeamCreatorActionTypes.ProgressStage:
      return {
        ...state,
        stage: state.stage + 1
      };

    case TeamCreatorActionTypes.SetHomeSuccess:
      return {
        ...state,
        stage: state.stage + 1
      };

    default:
      return state;
  }
}

export const getStage = (state: State) => state.stage;
export const getTeam = (state: State) => state.team;

export const getStageAvatarBtnText = (state: State) => state.stageAvatar.btnText;
export const getStageAvatarUploading = (state: State) => state.stageAvatar.uploading;
export const getStageAvatarUploaded = (state: State) => state.stageAvatar.uploaded;
