/ TASK 1 

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
// Taken from exercise 9 week 5
function color_rotate(src, dest) {
    const width = image_width();
    const height = image_height();
    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            set_rgba(
                dest[y][x],
                blue_of(src[y][x]),
                red_of(src[y][x]),
                green_of(src[y][x]),
                alpha_of(src[y][x])
            );
        }
    }
}

/**
 * Vertically flips an image.
 * @param {array} src - contains the source image
 * @param {array} dest - array where the flipped source image is copied into4
 * @returns a function that take a source and destination image and applies
 * the flip_vertically filter in destination.
 */
// Taken from exercise 10 week 5
function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();
    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            set_rgba(
                dest[height - 1 - i][j],
                red_of(src[i][j]),
                green_of(src[i][j]),
                blue_of(src[i][j]),
                alpha_of(src[i][j])
            );
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
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            row[j] = [];
            set_rgba(row[j], 255, 255, 255, 255);
        }
    }
    return img;
}

/**
 * Overlays a crosshair pattern and blue semi-transparent circles over 
 * the image in src and writes the result into dest.
 *
 * @param {array} src - input image
 * @param {array} dest - output image
 * @returns a function that take a source and destination image and applies
 * the crosshair filter in destination.
 */
function crosshair(src, dest) {
    const width = image_width();
    const height = image_height();

    const cx = math_floor(width / 2);
    const cy = math_floor(height / 2);

    for (let heighty = 0; heighty < height; heighty = heighty + 1) {
        for (let widthx = 0; widthx < width; widthx = widthx + 1) {
            set_rgba(
                dest[heighty][widthx],
                red_of(src[heighty][widthx]),
                green_of(src[heighty][widthx]),
                blue_of(src[heighty][widthx]),
                alpha_of(src[heighty][widthx])
            );

            const dx = widthx - cx;
            const dy = heighty - cy;
            const distance = math_floor(math_sqrt(dx * dx + dy * dy));

            const band = math_floor(distance / 25);

            if (band % 2 === 1) {
                set_rgba(
                    dest[heighty][widthx],
                    math_floor(0.9 * red_of(dest[heighty][widthx])),
                    math_floor(0.9 * green_of(dest[heighty][widthx])),
                    math_floor(0.2 * blue_of(dest[heighty][widthx]) + 245),
                    255
                );
            }

            if (
                widthx === math_floor(width / 2) ||
                heighty === math_floor(height / 2)
            ) {
                set_rgba(dest[heighty][widthx], 255, 0, 0, 255);
            }
        }
    }
}

/**
 * Applies two filters one after another.
 *
 * @param {function} filter1 - filter to apply first
 * @param {function} filter2 - filter to apply second
 * @returns {function} Returns a function that takes a source and destination
 *   image and applies the filters in the destination.
 */
function compose(filter1, filter2) {
    const temp = make_image(WIDTH, HEIGHT);
    return (src, dest) => {
        filter1(src, temp);
        filter2(temp, dest);
    };
}

// Test one filter at a time:
install_filter(crosshair);
//install_filter(compose(crosshair, flip_vertically));

// comment the following line to use your video feed:
use_image_url("https://upload.wikimedia.org/wikipedia/commons/3/31/William_Shakespeare_1609.jpg");

// do not modify the following:
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
