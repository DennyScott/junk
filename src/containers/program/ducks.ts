import {
  ProgramsState,
  Program,
  OpenProgramPayload,
  CloseProgramByProgramIdPayload,
  CloseProgramByWindowIdPayload,
  ShowProgramPayload,
} from './interfaces';
import { Action, createAction } from 'action';

const OPEN_PROGRAM = 'junk/program/OPEN_PROGRAM';
const PROGRAM_CLOSED = 'junk/program/PROGRAM_CLOSED';
const SHOW_PROGRAM = 'junk/program/SHOW_PROGRAM';
const CLOSE_PROGRAM_BY_WINDOW_ID = 'junk/program/CLOSE_PROGRAM_BY_WINDOW_ID';
const CLOSE_PROGRAM_BY_PROGRAM_ID = 'junk/program/CLOSE_PROGRAM_BY_PROGRAM_ID';

export const initialState = {
  openPrograms: [],
  isLoaded: false,
} as ProgramsState;

export function reducer(state: ProgramsState = initialState, action: Actions) {
  switch (action.type) {
    case OPEN_PROGRAM: {
      return {
        ...state,
        openPrograms: [...state.openPrograms, action.payload],
      };
    }
    case CLOSE_PROGRAM_BY_PROGRAM_ID: {
      return {
        ...state,
        openPrograms: state.openPrograms.filter((program: Program) => program.programId !== action.payload.programId),
      };
    }
    case CLOSE_PROGRAM_BY_WINDOW_ID: {
      return {
        ...state,
        openPrograms: state.openPrograms.filter((program: Program) => program.windowId !== action.payload.windowId),
      };
    }
    default:
      return state;
  }
}

export function closeProgramByWindowId(payload: CloseProgramByWindowIdPayload): void {
  createAction(CLOSE_PROGRAM_BY_WINDOW_ID, payload);
  createAction(PROGRAM_CLOSED, {});
}

export function closeProgramByProgramId(payload: CloseProgramByProgramIdPayload): void {
  createAction(CLOSE_PROGRAM_BY_PROGRAM_ID, payload);
  createAction(PROGRAM_CLOSED, {});
}

export function programOpened(payload: Program) {
  createAction(OPEN_PROGRAM, payload);
}

export function showProgram(payload: ShowProgramPayload) {
  createAction(SHOW_PROGRAM, payload);
}

export function openProgram(payload: OpenProgramPayload): Function {
  return (dispatch: Function, getState: Function) => {
    if (!payload.allowMultipleInstances) {
      const foundProgram: Program = getState().program.openProgram.find(
        (program: Program) => program.programId === payload.programId,
      );

      if (foundProgram) {
        dispatch(showProgram({ windowId: foundProgram.windowId }));
      } else {
        dispatch(programOpened(payload));
        dispatch(showProgram({ windowId: payload.windowId }));
      }
    } else {
      dispatch(programOpened(payload));
      dispatch(showProgram({ windowId: payload.windowId }));
    }
  };
}

type OpenProgramAction = Action<typeof OPEN_PROGRAM, Program>;
type ShowProgramAction = Action<typeof SHOW_PROGRAM, ShowProgramPayload>;
type CloseProgramByProgramIdAction = Action<typeof CLOSE_PROGRAM_BY_PROGRAM_ID, CloseProgramByProgramIdPayload>;
type CloseProgramByWindowIdAction = Action<typeof CLOSE_PROGRAM_BY_WINDOW_ID, CloseProgramByWindowIdPayload>;

export type Actions =
  | OpenProgramAction
  | ShowProgramAction
  | CloseProgramByProgramIdAction
  | CloseProgramByWindowIdAction;
