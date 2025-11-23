/**
* Displays four runes in a 2x2 pattern with four different colors.
* @param {r1} rune 1
* @param {r2} rune 2
* @param {r3} rune 3
* @param {r4} rune 4
* @param {clr_scheme} lambda function that converts a number 1-4 to a rune color
* @precondition clr_scheme takes input between 1-4
* @returns {rune} 4 runes in 2x2 square with differend colors
*/

function mosaic(r1, r2, r3, r4, clr_scheme) {
    return stack(
        beside(clr_scheme(1)(r1),
               clr_scheme(2)(r2)),
        beside(clr_scheme(3)(r3),
               clr_scheme(4)(r4))
    );
}

function rotation(r, clr_scheme) {
    return stack(
        beside(clr_scheme(1)(quarter_turn_left(r)),
               clr_scheme(2)(r)),
        beside(clr_scheme(3)(turn_upside_down(r)),
               clr_scheme(4)(quarter_turn_right(r)))
    );
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

// Test
show(mosaic(rcross, sail, pentagram, nova, colour_scheme));
show(rotation(rcross, colour_scheme));