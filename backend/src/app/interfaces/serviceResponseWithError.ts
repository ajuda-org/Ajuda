export default interface serviceResponseWithError {
  status: number;
  entityOrError: {
    field: string;
    error: string;
  };
}
