import IUserWithoutPassword from "./userWithoutPassword";

export default interface serviceResponseWithUser {
  status: number;
  entityOrError: IUserWithoutPassword;
}
