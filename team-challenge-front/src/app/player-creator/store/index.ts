import * as fromPlayerCreator from './player-creator.reducer';
import * as fromRoot from './../../core/reducers/index';

export interface PlayerCreatorState {
  playerCreator: fromPlayerCreator.State;
}

export interface State extends fromRoot.State {
  playerCreator: PlayerCreatorState;
}

