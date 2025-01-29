export interface GameModule {
    _init_game: () => number;
    _update_game: () => void;
    _draw_game: () => void;
    _handle_input: (key: number) => void;
  }
  
  export interface EmscriptenModule {
    canvas?: HTMLCanvasElement;
    onRuntimeInitialized?: () => void;
    ccall: (
      functionName: string,
      returnType: string,
      argumentTypes: string[],
      args: any[]
    ) => any;
    cwrap: (
      functionName: string,
      returnType: string,
      argumentTypes: string[]
    ) => (...args: any[]) => any;
  }