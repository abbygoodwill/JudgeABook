export default class Book {
  title;
  isbn13;
  url;
  image;

  constructor(
    title = "",
    isbn13 = "",
    url = "",
    image = "") {

    this.title = title;
    this.isbn13 = isbn13;
    this.url = url;
    this.image = image;
  }
}