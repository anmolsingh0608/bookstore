class BookService {
  constructor(boardModel) {
    if (!boardModel) {
      throw new Error("Board model class isn't provided on BookService");
    }
    this.boardModel = boardModel;
  }

  async getById(id) {
    const boardData = await this.boardModel.findById(id);
    return boardData;
  }

  async getAll(page, limit) {
    const boardData = await this.boardModel
      .find({})
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    return boardData;
  }

  async update(data, id) {
    const boardData = await this.boardModel.updateOne(
      { _id: id },
      { $set: data }
    );
    return boardData;
  }

  async delete(id) {
    const boardData = await this.boardModel.deleteOne({ _id: id });
    return boardData;
  }

  async create(data) {
    const boardInst = new this.boardModel(data);
    return await boardInst.save();
  }

  async search(query) {
    const books = await this.boardModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // case-insensitive search
        { author: { $regex: query, $options: "i" } },
      ],
    });
    return books;
  }
}

module.exports = BookService;
