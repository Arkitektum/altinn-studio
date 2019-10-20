import update from 'immutability-helper';
import { Action, Reducer } from 'redux';
import * as AppReleaseActionTypes from './appReleaseActionTypes';
import { ICreateReleaseFulfilledAction, ICreateReleaseRejectedActions } from './create/createAppReleaseActions';
import { IGetReleaseActionFulfilled, IGetReleaseActionRejected } from './get/getAppReleasesActions';
import { IRelease } from './types';

export interface IAppReleaseState {
  releases: IRelease[];
  creatingRelease: boolean;
  error: Error;
}

const initialState: IAppReleaseState = {
  releases: [],
  creatingRelease: false,
  error: null,
};

update.extend<IRelease[]>('$addFirstIndex', (param: IRelease, old: IRelease[]) => {
  return new Array().concat(param, ...old);
});

const appReleaseReducer: Reducer<IAppReleaseState> = (
  state: IAppReleaseState = initialState,
  action?: Action,
): IAppReleaseState => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case AppReleaseActionTypes.GET_APP_RELEASES_FULFILLED: {
      const { releases } = action as IGetReleaseActionFulfilled;
      return update<IAppReleaseState>(state, {
        releases: {
          $set: releases,
        },
        error: {
          $set: null,
        },
      });
    }
    case AppReleaseActionTypes.GET_APP_RELEASES_REJECTED: {
      const { error } = action as IGetReleaseActionRejected;
      return update<IAppReleaseState>(state, {
        error: {
          $set: error,
        },
      });
    }
    case AppReleaseActionTypes.CREATE_APP_RELEASE: {
      return update<IAppReleaseState>(state, {
        creatingRelease: {
          $set: true,
        },
      });
    }
    case AppReleaseActionTypes.CREATE_APP_RELEASE_FULFILLED: {
      const { release } = action as ICreateReleaseFulfilledAction;
      return update<IAppReleaseState>(state, {
        releases: {
          $addFirstIndex: release,
        },
        creatingRelease: {
          $set: false,
        },
        error: {
          $set: null,
        },
      });
    }
    case AppReleaseActionTypes.CREATE_APP_RELEASE_REJECTED: {
      const { error } = action as ICreateReleaseRejectedActions;
      return update<IAppReleaseState>(state, {
        error: {
          $set: error,
        },
        creatingRelease: {
          $set: false,
        },
      });
    }
    default: {
      return state;
    }
  }
};

export default appReleaseReducer;
