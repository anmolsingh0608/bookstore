class UserService {
  constructor(UserModel) {
    if (!UserModel) {
      throw new Error("User model class isn't provided on UserService");
    }
    this.userModel = UserModel;
  }

  async createUser(data) {
    const userData = new this.userModel(data);
    return await userData.save();
  }

  async findOne(data) {
    const userData = await this.userModel.findOne(data);
    return userData;
  }
}

module.exports = UserService;
