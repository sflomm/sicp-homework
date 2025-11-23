const ex_text = list("jag", "älskar", "dig", "älskar", "jag", "med");

/**
 * Finds all pairs of adjacent words in a given text.
 * @example
 * adjacent_pairs(list("time", "for", "a", "break"))
 * // returns list(["time", "for"], ["for", "a"], ["a", "break"])
 * adjacent_pairs(list("time"))   // returns list()
 * @param {List} text - List of words (strings)
 * @returns {List} List of pairs, one pair for each pair of words that appear
 *     after one another (in that order) in `text`
 */
function adjacent_pairs(xs) { //variant: length(xs)
    return is_null(xs)
        ? null
        : pair(
              list(
                  head(xs),
                  is_null(tail(xs)) ? null : head(tail(xs))
              ),
              adjacent_pairs(tail(xs))
          );
}

/**
 * Sorts the words in the pairs so that the order doesn't matter.
 * @example
 * pair_sorting(adjacent_pairs(list("time", "for", "for", "time"))
 * // returns list(["for", "time"], ["for", "for"], ["for", "time"])
 * @param {List} p - a pair (a list with two words)
 * @returns {List} Returns the sorted version of all pairs
 */
function pair_sorting(p) {
    return is_null(tail(p))
        ? p
        : is_null(head(tail(p)))
            ? p
            : (head(p) <= head(tail(p))
                ? p
                : list(head(tail(p)), head(p)));
}

/**
 * Checks if a pair is already accounted for in the acc.
 * @param {acc} - A list consisting of already counted pairs
 * @param {pair} - A pair that gets cross checked for in the acc.
 * @returns {number} - An index if the pair is in the acc, or -1 if not.
 */
function index_of_pair(acc, pair) { //variant: acc
    return is_null(acc)
        ? -1
        : equal(head(head(acc)), pair)
            ? 0
            : (index_of_pair(tail(acc), pair) === -1
                ? -1
                : 1 + index_of_pair(tail(acc), pair));
}

/**
 * Updates the acc when index_of_pairs locates a pair in the acc..
 * @param {acc} - A list consisting of already counted pairs
 * @param {idx} - A parameter that indicated which pair that should be updated.
 * @returns {List} - Updated acc.
 */
function update_acc(acc, idx) { //variant: idx
    return idx === 0
        ? pair(list(head(head(acc)), head(tail(head(acc))) + 1), tail(acc))
        : pair(head(acc), update_acc(tail(acc), idx - 1));
}

/**
 * Counts the numbers of unique pairs in a list.
 * @param {pairs} - A list of pairs created by adjacent_pairs
 * @param {acc} - A list consisting of already counted pairs
 * @returns - A list with pairs, and how many times they are repeated.
 */
function pairs_count_helper(pairs, acc) { //variant: lenght(pairs)
    return is_null(pairs)
        ? acc
        : pairs_count_helper(
              tail(pairs),
              index_of_pair(acc, pair_sorting(head(pairs))) === -1
                  ? pair(list(pair_sorting(head(pairs)), 1), acc)
                  : update_acc(acc, index_of_pair(acc, pair_sorting(head(pairs))))
          );
}
/**
 * Counts how often pairs of words appear in a text.
 * The order of words in a pair do not matter, i.e. ["a", "b"] is the same
 * as ["b", "a"] and any one of these pairs may appear in the result.
 * @example
 * pairs_count(pairs_count(list("time", "for", "a", "break", "a", "break",
 *                              "for", "a", "while")))
 * // returns
 * // list([["for", "time"], 1], [["a", "break"], 3], [["break", "for"], 1],
 * //      [["a", "for"], 2], [["a", "while"], 1])
 * @param {List} text - List of words (strings).
 * @returns {List} List of pairs, each pair consist of a pair of words that
 *     appear next to each other in `text` and a count of how often it appears
 */
function pairs_count(text) {
    return pairs_count_helper(adjacent_pairs(text), null);
}

display_list(pairs_count(ex_text));