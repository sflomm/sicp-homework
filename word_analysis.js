const ex_text = list("a", "rose", "is", "a", "rose",
                     "but", "so", "is", "a", "rose");

/**
 * Counts the number of unique words in a list.
 * @example
 * num_unique_words(list("a", "rose", "is", "a", "rose"))  // returns 3
 * num_unique_words(list())                                // returns 0
 * @param {List} text - List of words (strings)
 * @returns {number} Number of distinct words in text.
 */
function num_unique_words(text) {
    return accumulate(
        (word, count) => count + 1,
        0,
        num_unique_words_helper(text)
    );
}

/**
 * Builds a list of unique words from text.
 * @example
 * num_unique_words_helper(list("a", "a", "rose"))
 * // returns list("a", "rose")
 * @param {List} text - List of words
 * @returns {List} List of unique words
 */
function num_unique_words_helper(text) {
    return accumulate(
        (x, text) =>
            is_null(member(x, text))
            ? pair(x, text)
            : text,
        null,
        text
    );
}

/**
 * Tallies the words in a list.
 * @example
 * word_tally(list("a", "a", "rose"))
 * // returns list(pair("a", 2), pair("rose", 1))
 * @param {List} text - List of words
 * @returns {List} List of pairs(word, count) or {null}
 */
function word_tally(text) {
    // variant: length(text)
    return is_null(text)
        ? null
        : pair(
            pair(head(text),
                 length(filter(x => x === head(text), text))),
            word_tally(
                filter(x => x !== head(text), tail(text))
            )
        );
}

/**
 * Finds the maximum count among tally pairs.
 * @example
 * max_count(list("a", "rose", "is", "a", "rose")) //returns 2
 * @param {List} Tally - List of pairs (word, count) 
 * @returns {number} Maximum count found in tallies
 */
function max_count(tallies) {
    // variant: length(tally)
    if (is_null(tallies)) {
        return 0;
    } else {
        const first = head(tallies);
        const c = tail(first);
        const rest_max = max_count(tail(tallies));
        if (c > rest_max) {
           return c;
        } else {
            return rest_max;
        }
    }
}


/**
 * Selects all pairs whose count equals max.
 * @param {List} tallies - List of pairs (word, count)
 * @param {number} max   - Maximum count
 * @returns {List} All pairs in tallies with count = max
 */
function select_most(tallies, max) {
    // variant: length(tallies)
    if (is_null(tallies)) {
        return null;
    } else {
        const first = head(tallies);
        const c = tail(first);
        const rest = select_most(tail(tallies), max);
        return c === max
            ? pair(first, rest)
            : rest;
    }
}

/**
 * Identifies the most commonly used words in a text.
 * @example
 * most_used_words(list("a", "rose", "is", "a", "rose"))
 * // returns list(pair("rose", 3), pair("a", 3))
 * @param {List} text - List of words {strings}
 * @returns {List} List of pairs (word, count) for the most common words
 */
function most_used_words(text) {
    if (is_null(text)) {
        return null;
    } else {
        const tallies = word_tally(text);
        const max = max_count(tallies);
        return select_most(tallies, max);
    }
}