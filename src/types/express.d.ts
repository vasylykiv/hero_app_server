declare namespace Express {
  export interface Request {
    filesFolderPath?: string;
    deleted?: boolean;
    created?: boolean;
  }
}
