import {
    head, tail, is_null, list, pair, map, List, length
} from '../lib/list';

/**
 * The ISBN number represents the unique identification number of a book.
 * Invariant: The number is greater than 0.
 */
type ISBN = number;

/**
 * A Book item is a tuple with three elements: the book's title (as a string),
 * the ISBN number, and a boolean representing whether the book is currently
 * checked out or not.
 * Invariant: The string is not empty.
 */
type Book_item = [string, ISBN, boolean];

/**
 * Represents the list of books present in the library.
 * Invariant: The list is sorted by the book's ISBN and does not have duplicate
 *     books (with the same ISBN).
 */
type Library = List<Book_item>;

/**
 * Creates a new book
 * @param title The title of the book to be added.
 * @param isbn The book's ISBN number
 * @returns Returns a book that is not checked out (by default).
 */
function make_book(title: string, isbn: ISBN): Book_item {
    return [title, isbn, false];
}

// Retrieves the title of a book.
const get_title = (book_item: Book_item) => book_item[0];

// Retrieves the ISBN of a book.
const get_isbn = (book_item: Book_item) => book_item[1];

// Returns true if the given book is marked as checked out.
const is_checked_out = (book_item: Book_item) => book_item[2];

// Returns a book with the same title and ISBN, but marked as checked out.
const check_out_book =
    (book_item: Book_item) => book_item = 
        [get_title(book_item), get_isbn(book_item), true]; 

// Returns a book with the same title and ISBN, but marked as checked in.
const check_in_book =
    (book_item: Book_item) => book_item = 
        [get_title(book_item), get_isbn(book_item), false];

// An empty Library.
const empty_library: Library = list();

/**
 * Add a new book to the library.
 * @param book New book to be added.
 * @param library The library to add a book to.
 * @returns Returns a new library, with the new book added if it does not
 *     already exist (does not override an existing entry).
 */
function add_book(book: Book_item, library: Library): Library {
    const isbn_book = get_isbn(book);
    function insert(library: Library): Library {
        // variant: length(lib)
        return is_null(library)
               ? list(book)
               : get_isbn(head(library)) < isbn_book
               ? pair(head(library), insert(tail(library)))
               : pair(book, library);
    }
    return insert(library);
}

/**
 * Retrieves a book from the library.
 * @param library The library to search for a book.
 * @param isbn The ISBN number of the wanted book.
 * @returns The book that has the given ISBN number or null, if it
 *     does not exist.
 */
function find_book(library: Library, isbn: ISBN): Book_item | null {
    function get(library: Library): Book_item | null {
        // variant: length(lib)
        return is_null(library)
               ? null
               : get_isbn(head(library)) === isbn
               ? head(library)
               : get(tail(library));
    }
    return get(library);
}

/**
 * Check out a book from the library.
 * Returns the library unmodified if the book is already checked out.
 * @param library The library where to check out the book.
 * @param isbn The ISBN number of the book to check out.
 * @returns Returns a new library where the mentioned book is marked
 *     as checked out.
 */
function check_out(library: Library, isbn: ISBN) {
    return map(book => get_isbn(book) === isbn ? check_out_book(book) : book,
               library);
}

/**
 * Check in a book from the library.
 * Returns the library unmodified if the book is already checked in.
 * @param library The library where to check in the book.
 * @param isbn The ISBN number of the book to check in.
 * @returns Returns a new library where the mentioned book is marked
 *     as checked in.
 */
function check_in(library: Library, isbn: ISBN) {
    return map(book => get_isbn(book) === isbn ? check_in_book(book) : book,
               library);
}


// Tests:
const lotta1 = make_book("Lotta på Bråkmakargatan", 9789129689006);
const lotta2 = make_book("Lotta på Bråkmakargatan", 9789129743753);
const pippi  = make_book("Pippi Långstrump",        9789129723632);
const null_book = make_book("Null Book", 0);

const library = add_book(pippi, add_book(lotta2,
                                         add_book(lotta1, empty_library)));

console.log("test length of library: ", length(library) === 3);

console.log("test find_book not found:", find_book(library, 378295045) === null);

let book = find_book(library, 9789129689006);
if (book === null) {
    book = null_book;
}
console.log("test find_book found:", get_title(book) ===
                "Lotta på Bråkmakargatan");
console.log("test is_checked_out:", is_checked_out(book) === false);

let book2 = find_book(check_out(library, 9789129723632), 9789129723632);
if (book2 === null) {
    book2 = null_book;
}
console.log("test check_out:", get_title(book2) === "Pippi Långstrump");
console.log("test is_checked_out:", is_checked_out(book2) === true);

let book3 = find_book(check_in(check_out(library, 9789129723632),
                                 9789129723632),
                        9789129723632);
if (book3 === null) {
    book3 = null_book;
}
console.log("test is_checked_out:", is_checked_out(book3) === false);