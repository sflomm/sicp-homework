// The function to analyse:

/**
 * Compute the palindrome distance of a word represented as a list of
 * one-character strings.
 * @param {List(Char)} lst - A list of one-character strings, representing
 *                           a word
 * @returns The palindrome distance of the represented word, as a number
 *          between 0 (a palindrome) and n-1, where n is length(lst)
 */
function palindrome_distance(lst) {
    // Variant: length(lst)
    if (is_null(lst)) {
        return 0;
    } else if (is_null(tail(lst))) {
        return 0;
    } else if (head(lst) === last(lst)) {
        return palindrome_distance(tail(drop_last(lst)));
    } else {
        const pd1 = 1 + palindrome_distance(drop_last(lst));
        const pd2 = 1 + palindrome_distance(tail(lst));
        return math_min(pd1, pd2);
    }
}

// Helper function to return the last element of list lst;
// has linear running time.
function last(lst) { // Variant: length(lst)
    return is_null(tail(lst)) ? head(lst) : last(tail(lst));
}

// Helper function to return the list lst without the last element;
// has linear running time.
function drop_last(lst) { // Variant: length(lst)
    return is_null(tail(lst)) ? null
         : pair(head(lst), drop_last(tail(lst)));
}

/*
### The recurrence relation for the worst-case running time is as follows:
    T(n) = 2T(n-1) + n

### This is how we derived it:
    First we saw that the algoritm for the worst case scenario is a
    subtract 1 reccurence which meant that we should use muster theorem.
    We saw that the number of recursion calls are 2 which meant O(n^d * a^(n/b)) version. 
    The constants are a = 2, b = 1 and d = 1. That is because there are 2 
    recursion calls, every recursion call decrement with size n-1, creating branches with
    each recursion. Finally the last term is the size of local work for each recursive call. 
    The two helper functions which are considered linear (meaning they do work of size n)
    aswell as other local functions like tail and math_min which all do constant
    work (which we assume here to be 1). Thus the local work for each call which makes up
    the last term in T(n) could be considered to be 2n + 1 ∽ n for large n. 
    

### Its order of growth (in simplified form) is:
    T(n) = O(2^n)

### This is how we solved it:
    Using T(n) = 2T(n-1) + n. From that we put in the constants (a = 2, b = 1 and d = 1)
    in O(n^d*a^(n/b)) which eveluate to O(n2^n). But for this course we use 
    the convention that polynomial coefficents are either 0 or 1 so 
    O(n2^n) = O(n^2).
    That is because the function is branch dominated for larger n, so
    the coefficient n can be omitted, hence T(n) = O(2^n). 
    
*/
