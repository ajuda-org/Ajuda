import { Request } from "../models";

export default interface serviceResponseWithRequest {
  status: number;
  entityOrError: Request;
}
