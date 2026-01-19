// TASK 2

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;


/**
 * Swaps the color channels of an image: R -> G -> B -> R.
 * @param {array} src - contains the source image
 * @param {array} dest - array where the channel-changed image is copied into
 * @returns a function that take a source and destination image and applies
 * the color_rotate filter in destination.
 */
 // taken from exercise 9 week 5
function color_rotate(src, dest) {
    const width = image_width();
    const height = image_height();
    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            set_rgba(dest[y][x],
                blue_of(src[y][x]),
                red_of(src[y][x]),
                green_of(src[y][x]),
                alpha_of(src[y][x]));
        }
    }
}

/**
 * Vertically flips an image.
 * @param {array} src - contains the source image
 * @param {array} dest - array where the flipped source image is copied into
 * @returns a function that take a source and destination image and applies
 * the flip_vertically filter in destination.
 */
 // taken from exercise 10 week 5
function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();
    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            set_rgba(dest[height - 1 - i][j],
                red_of(src[i][j]),
                green_of(src[i][j]),
                blue_of(src[i][j]),
                alpha_of(src[i][j]));
        }
    }
}

/**
 * Creates an image with given dimensions with each pixel having maximal
 * intensity of red, green and blue.
 * @param {number} width - width of the image to be generated
 * @param {number} height - height of the image to be generated
 * @returns {array} Returns a 3 dimensional array representing the image
 */
function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = []; // Creates a new Pixel
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            row[j] = [];
	    set_rgba(row[j], 255, 255, 255, 255);
        }
    }
    return img;
}

/**
 * Stacks the images produced by two filters one on top of another.
 * @param {function} filter1 - filter to apply on the top
 * @param {function} filter2 - filter to apply on the bottom
 * @returns {function} Returns a function that applies the filters.
 */
 // taken from exercise 11 week 5
function stack(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);
    
    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_height = math_floor(height / 2);
        
        filter1(src, temp1);
        filter2(src, temp2);
        
        for (let i = 0; i < half_height; i = i + 1) {
            dest[i] = temp1[i * 2];
            dest[i + half_height] = temp2[i * 2];
        }
        for (let i = half_height * 2; i < height; i = i + 1) {
            dest[i] = temp2[i];
        }
    };
}


/**
 * Zooms into an image by a given factor.
 * @precondition factor > 0
 * @param {number} factor - specifies how much to zoom in
 * @returns {function} Returns a function that takes a source and destination
 *     image and applies the zoom.
 */
function zoom(factor) {
    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        
        const centerx = math_floor(width / 2);
        const centery = math_floor(height / 2);
        
        for (let heighty = 0; heighty < height; heighty = heighty + 1) {
            for (let widthx = 0; widthx < width; widthx = widthx + 1) {
                
                let srcx = math_floor(centerx + (widthx - centerx) / factor);
                let srcy = math_floor(centery + (heighty - centery) / factor);
                
                if (srcx < 0) {
                    srcx = 0;
                } else if (srcx >= width) {
                    srcx = width - 1;
                }

                if (srcy < 0) {
                    srcy = 0;
                } else if (srcy >= height) {
                    srcy = height - 1;
                }
                
                set_rgba(dest[heighty][widthx],
                    red_of(src[srcy][srcx]),
                    green_of(src[srcy][srcx]),
                    blue_of(src[srcy][srcx]),
                    alpha_of(src[srcy][srcx]));
            }
        }
    };
}

/**
 * Shows the result of two filters side-by-side.
 *
 * @param {function} filter1 - filter to apply on the left
 * @param {function} filter2 - filter to apply on the right
 * @returns {function} Returns a function that applies the filters.
 */

function beside(filter1, filter2) {
    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_width = math_floor(width / 2);

        const temp3 = make_image(width, height);
        const temp4 = make_image(width, height);

        filter1(src, temp3);
        filter2(src, temp4);

        for (let y = 0; y < height; y = y + 1) {
            for (let x = 0; x < width; x = x + 1) {
                if (x < half_width) {
                    dest[y][x] = temp3[y][x * 2];
                } else {
                    dest[y][x] = temp4[y][(x - half_width) * 2];
                }
            }
        }
    };
}


//install_filter(zoom(3));
install_filter(stack(beside(flip_vertically, color_rotate), beside(copy_image, zoom(2))));
//install_filter(beside(flip_vertically, color_rotate));

// comment to use your video
use_image_url("https://upload.wikimedia.org/wikipedia/commons/3/31/William_Shakespeare_1609.jpg");

// do not modify
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
