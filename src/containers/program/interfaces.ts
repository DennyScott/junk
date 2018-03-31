// Program
export interface Program {
  windowId: string; // //random generated number between 1 and 100000000, or a guid
  programId: number; // The specific programs id, ex) notepad could be 2
}

export interface ProgramsState {
  openPrograms: Array<Program>;
  isLoaded: boolean;
}

export interface ProgramConfiguration {
  allowMultipleInstances: boolean;
}

export interface OpenProgramPayload extends Program {
  allowMultipleInstances: boolean;
}

export interface CloseProgramByWindowIdPayload {
  windowId: string;
}

export interface CloseProgramByProgramIdPayload {
  programId: number;
}

export interface ShowProgramPayload {
  windowId: string;
}
