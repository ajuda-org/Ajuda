export default interface serviceResponseWithError {
  status: number;
  userOrError: {
    field: string;
    error: string;
  };
}
