import bcrypt from "bcryptjs";

const userService = {
  encryptPassword: async (password: string): Promise<string> => {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  },
  checkPassword: (hashPassword: string, password: string): Promise<boolean> => {
    return bcrypt.compare(password, hashPassword);
  }
};

export default userService;
