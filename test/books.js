const expect = require("chai").expect;
const sinon = require("sinon");
const Book = require("../src/models/Books");
const BookService = require("../src/services/BookService");
const {
  getBook,
  getBooks,
  createBook,
  update,
  deleteFn,
  search,
} = require("../src/controllers/booksController");

describe("BookController", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("should create a book and return success response", async () => {
    const req = {
      body: {
        title: "Test Title",
        author: "Test Author",
        price: 20,
      },
    };

    const res = {
      statusCode: null,
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      data: null,
      json: function ({ data }) {
        this.data = data;
      },
    };

    sinon.stub(Book.prototype, "save").resolves(req.body);

    await createBook(req, res);

    expect(res).to.have.property("statusCode", 200);
  });

  it("should get books with pagination and return success response", async () => {
    const req = {
      query: {
        page: 1,
        limit: 10,
      },
    };

    const res = {
      statusCode: null,
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      data: null,
      json: function ({ data }) {
        this.data = data;
      },
    };

    const mockBooks = [{ title: "Test Book" }, { title: "Another Book" }];

    sinon.stub(Book, "find").returns({
      skip: sinon.stub().returnsThis(),
      limit: sinon.stub().resolves(mockBooks),
    });

    await getBooks(req, res);

    expect(res).to.have.property("statusCode", 200);
  });

  it("should update a book and return success response", async () => {
    const req = {
      body: { title: "Updated Title" },
      params: { id: "1" },
    };

    const res = {
      statusCode: null,
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      data: null,
      json: function ({ data }) {
        this.data = data;
      },
    };

    const mockUpdateResult = { nModified: 1 };

    sinon.stub(Book, "updateOne").resolves(mockUpdateResult);

    await update(req, res);

    expect(res).to.have.property("statusCode", 200);
  });

  it("should delete a book and return success response", async () => {
    const req = {
      params: { id: "1" },
    };

    const res = {
      statusCode: null,
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      data: null,
      json: function ({ data }) {
        this.data = data;
      },
    };

    const mockDeleteResult = { deletedCount: 1 };

    sinon.stub(Book, "deleteOne").resolves(mockDeleteResult);

    await deleteFn(req, res);

    expect(res).to.have.property("statusCode", 200);
  });

  it("should get a book by ID and return success response", async () => {
    const req = {
      params: { id: "1" },
    };

    const res = {
      statusCode: null,
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      data: null,
      json: function ({ data }) {
        this.data = data;
      },
    };

    const mockBook = { id: "1", title: "Test Book" };

    sinon.stub(Book, "findById").resolves(mockBook);

    await getBook(req, res);

    expect(res).to.have.property("statusCode", 200);
  });

  it("should search for books and return success response", async () => {
    const req = {
      query: { query: "Test" },
    };

    const res = {
      statusCode: null,
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      data: null,
      json: function ({ data }) {
        this.data = data;
      },
    };

    const mockBooks = [{ title: "Test Book" }];

    sinon.stub(Book, "find").resolves(mockBooks);

    await search(req, res);

    expect(res).to.have.property("statusCode", 200);
  });
});
