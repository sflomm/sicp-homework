function palindrome_distance_arr(arr) {
    if (array_length(arr) === 0) {
        return 0;
    }

    function helper_pda(arr, index, last) {
        if (index === last || arr[index] === arr[last] && index === last - 1) {
            return 0;
        } else if (arr[index] === arr[last]) {
            return helper_pda(arr, index + 1, last - 1);
        }
        const del_index = 1 + helper_pda(arr, index, last - 1);
        const del_last = 1 + helper_pda(arr, index + 1, last);

        return math_min(del_index, del_last);
    }
    return helper_pda(arr, 0, array_length(arr) - 1); 
}

palindrome_distance_arr(["M", "A", "D", "A", "M"]);

/*
### The recurrence relation for the worst-case running time is as follows:
T(n) = 2T(n - 1) + 1
*
### This is how we derived it:
We know that the algorithm for the worst case scenario uses
two recursion calls and each recursive call reduces the problem size to n − 1.
variant n is last - index + 1.
This makes it a decremental algorithm so we use the “Muster” theorem.
The work done outside the recursive calls is constant beacuse
array indexing, arithetic operation like addition and
comparisons, and math_min all take constant time (1 in this course).
*
### Its order of growth (in simplified form) is:
T(n) = O(2^n).
*
### This is how we solved it:
SInce the recurrence T(n) = 2T(n − 1) + 1. Substituting the constants 
a = 2, b = 1, d = 0 into O(n^d * a^(n/b)) = O(2^n).
The recurrence is branch-dominated, since the number of recursive calls 
doubles at each level. Therefore, T(n) = O(2^n).
*
*/
