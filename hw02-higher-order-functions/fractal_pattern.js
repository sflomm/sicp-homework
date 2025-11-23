/**
 * Description: Places runes in a fractal pattern where each iteration 
 *              has a new color
 * @param {rune} pic - Rune to be displayed
 * @param {number} n - Number of layers
 * @param {function} clr_scheme - lambda function that maps a number
 *                   1-4 to a rune color function
 * @precondition n is a non-negative number
 * @complexity O(n)
 * @returns {rune} in a colored fractal pattern
 */
function fractal(pic, n, clr_scheme) {
    return n === 1
           ? clr_scheme(n)(pic)
           : beside(
                clr_scheme(n)(pic), 
                fractal(
                    stack(
                        clr_scheme(n)(pic),
                        clr_scheme(n)(pic)),
                    n - 1,
                clr_scheme));
}


// takes a number from 1 - 4 as input, and returns a colour function for runes
const colour_scheme = x =>
    x % 4 === 1
        ? red
        : x % 4 === 2
        ? blue
        : x % 4 === 3
        ? green
        : x % 4 === 0 
        ? yellow
        : 0;

/**
 * Description maps a new color to a color scheme
 * @param {function} clr_scheme - the colorscheme to update
 * @param {number} j - the index of colorscheme to change
 * @param {function} new_clr -  a rune color function
 * @precondition clr_scheme is a lambda function
 * @returns a color rune color function 
 */
function update_clr_scheme(clr_scheme, j, new_clr) {
    return x => x % 4 === j % 4 
           ? new_clr
           : clr_scheme(x); 
}


// Test part 1
show(fractal(rcross, 7, colour_scheme));

// Test part 2
show(fractal(rcross, 3, update_clr_scheme(colour_scheme, 2, indigo)));