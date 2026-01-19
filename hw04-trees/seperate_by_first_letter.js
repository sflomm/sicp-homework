import {
        entry,
        is_empty_tree,
        is_tree,
        left_branch,
        make_empty_tree,
        make_tree,
        right_branch     
    
} from "binary_tree";

/**
 * Returns a list containing all elements of a binary search tree `t`
 * in ascending order. Uses an in-order traversal via `tree_accumulate`.
 * 
 * @param {BinaryTree(T)} t - A binary search tree of elements T
 * @returns {List(T)} A sorted list of all elements in `t`
 */
function tree_to_list(t) {
    return tree_accumulate((x, xs) => pair(x, xs), null, t);
}

//the function insert as defined in lecture 3B
function insert(x, xs) {
    return is_null(xs)
        ? list(x)
        : x <= head(xs)
        ? pair(x, xs)
        : pair(head(xs), insert(x, tail(xs)));
}

//the function insertion_sort as defined in lecture 3B
function insertion_sort(xs) {
    return is_null(xs)
        ? xs
        : insert(head(xs), insertion_sort(tail(xs)));
}

/**
 * Creates a kind-of "table" from a binary search tree.
 * The table consists of an outer list
 * with inner lists as its elements. The outer list is sorted with
 * respect to the smallest element in the inner lists.
 * The inner lists are sorted from smallest to largest,
 * i.e., they are in ascending order. All elements e1 and e2 such
 * that char_at(e1, 0) === char_at(e2, 0) should be in the same
 * inner list.
 *
 * @param {Tree(String)} t - A tree of Strings
 * @returns {List(List(String))} See above
 */
function separate_by_first_letter(t) {
    const words = tree_accumulate((w, xs) => pair(w, xs), null, t);
    const sorted = insertion_sort(words);

    function group(xs) {
        // variant: length(xs)
        if (is_null(xs)) {
            return null;
        } else {
            const first_char = char_at(head(xs), 0);
            const this_group =
                filter(w => char_at(w, 0) === first_char, xs);
            const rest =
                filter(w => char_at(w, 0) !== first_char, xs);

            return pair(this_group, group(rest));
        }
    }

    return group(sorted);
}

/**
 * Performs a left-to-right fold on a tree by walking the tree
 * in-order and calls fun on each element.
 *
 * The parameter T to Function is the type of the items in the binary tree, e.g. String.
 * The parameter U is whatever fun should return. For example, if accumulate is called with
 * a function that checks if any item in the tree is the string "Name", then, T will be
 * String and U will be Boolean (true or false):
 *
 *   tree_accumulate((e, found) => found || e === "Name", false, t)
 *
 * Above, the lambda function takes a String and a Boolean and retuns a Boolean, i.e.,
 * T = String and U = Boolean.
 *
 * @param {Function(T,U,U)} fun
 * @param {U} init
 * @param {BinaryTree(T)} t
 * @returns {U} result of the left-to-right fold
 */
function tree_accumulate(fun, init, t) {
    function helper(tree, värde) {
        // variant: number of elements remaining in tree
        if (is_empty_tree(tree)) {
            return värde;
        } else {
            const värde_left = helper(left_branch(tree), värde);
            const värde_here = fun(entry(tree), värde_left);
            return helper(right_branch(tree), värde_here);
        }
    }

    return helper(t, init);
}

function make_leaf(item) {
    return make_tree(item, make_empty_tree(), make_empty_tree());
}

/**
 * Creates a new subtree from best by replacing its left subtree by left
 *
 * @param {BinaryTree(T)} bst
 * @param {BinaryTree(T)} left
 * @returns {BinaryTree(T)} a new tree with left as left subtree
 */
function update_left(bst, left) {
    return make_tree(head(bst), left, right_branch(bst));
}

/**
 * Creates a new subtree from best by replacing its right subtree by right
 *
 * @param {BinaryTree(T)} bst
 * @param {BinaryTree(T)} right
 * @returns {BinaryTree(T)} a new tree with right as right subtree
 */
function update_right(bst, right) {
    return make_tree(head(bst), left_branch(bst), right);
}

/**
 * Adds an element of type T to a binary sorted tree of type T.
 * @param {BST(T)} bst - binary search tree of type T
 * @param {T} item - element of type T to add
 * @returns Returns a binary sorted tree of type T that contains item, all
 *          elements of bst, and nothing else
 */
function tree_insert(bst, item) {
    // variant: nodes of traverse of the bst
    return is_empty_tree(bst)
        ? make_leaf(item)
        : head(bst) === item
        ? bst
        : head(bst) > item
        ? update_left(bst, tree_insert(left_branch(bst), item))
        : update_right(bst, tree_insert(right_branch(bst), item));
}

/**
 * Compares two lists of lists from separate_by_first_letter to see if they are equivalent.
 * @param {List(List(T)} outer1 - list of lists of elements
 * @param {List(List(T)} outer2 - list of lists of elements
 * @returns true if all inner lists with index i in the outer lists
 *      have the same elements in the same order, else false
 */
function compare_results(outer1, outer2) {
    function compare_inner(inner1, inner2) {
        // variant: length(inner1)
        return is_null(inner1)
            ? is_null(inner2)
            : is_null(inner2)
            ? is_null(inner1)
            : head(inner1) === head(inner2) &&
                compare_inner(tail(inner1), tail(inner2));
    }

    // variant: length(outer1)
    return is_null(outer1)
        ? is_null(outer2)
        : is_null(outer1)
        ? is_null(outer2)
        : compare_inner(head(outer1), head(outer2)) &&
            compare_results(tail(outer1), tail(outer2));
}

/// Below are two sets of strings you can test with

const few_words_result = list(
                              list("Alpacca", "Ansgar", "Apa"),
                              list("Banan", "Buske"),
                              list("Chinchilla"),
                              list("Dromedar")
);

// Flatten the table
const few_words = accumulate(append, null, few_words_result);

// Build a tree from the flattened list
const tree1 =
    accumulate((w, t) => tree_insert(t, w),
        make_empty_tree(),
        few_words);

// As above but more words
const many_words = list(
                        "Födelsedag",
                        "Mögel",
                        "Noll",
                        "Leksak",
                        "Linjer",
                        "Vetenskapsman",
                        "Panna",
                        "Remos",
                        "Skiffer",
                        "Mistel",
                        "Argentinska",
                        "Drottning",
                        "Dropp",
                        "Aspirera",
                        "Domaren",
                        "Krona",
                        "Tornado",
                        "Affe",
                        "Knopp",
                        "Brasilianisch",
                        "Budbärare",
                        "Skilsmässa",
                        "Som",
                        "Dick",
                        "Underarm",
                        "Klocktornet",
                        "Efternamn",
                        "Bevara",
                        "Inaktiverad",
                        "Bett",
                        "Betala",
                        "Investering",
                        "Champagne",
                        "Skyskrapa",
                        "Zon",
                        "Deutschland",
                        "Hårdhet",
                        "Oväsen",
                        "Storbritannien",
                        "Promotor"
);

// separate_by_first_letter(tree_insert(make_empty_tree(), "Aa"));
separate_by_first_letter(tree1);
// separate_by_first_letter(tree2);
// compare_results(few_words_result, separate_by_first_letter(tree1));
