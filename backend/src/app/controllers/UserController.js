class UserController {
  async index(req, res) {
    return res.json({
      message: "Hello World"
    })
  }
}

export default new UserController