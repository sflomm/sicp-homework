/ DATA DEFINITIONS
/**
 * A {Course} is a list with length 5: (code, name, capacity, enrolled, waitlist)
 * 
 * Invariants:
 * length(Course) === 5
 * code is a valid {Code}
 * name is a valid {Name}
 * capacity is a valid {Capacity}
 * enrolled is a valid {Enrolled} 
 * waitlist is a valid {Waitlist}
 */

/**
 * A {code} is a string
 * 
 * Represents the course code.
 * 
 * Invariant:
 * Must have string length of === 6
 */
 
/**
 * A {name} is a string
 * 
 * Represents the course name in human readable form.
 * 
 * Invariants:
 * string length(name) > 0
 */
 
/**
 * A {capacity} is a number
 * 
 * Represents the course capacity of enrolling students.
 * 
 * Invariants: 
 * Must be a whole number
 * Must be >= 0
 */
 
/**
 * A {enrolled} is a list of {StudentID}'s
 * 
 * Represents all students enrolled in a class.
 * 
 * Invariant: 
 * 0 <= length(enrolled) <= {capacity}.
 * Can not contain elements with the same {studentID}
 */
 
/**
 * A {waitlist} is list of {StudentID}'s
 * 
 * Represents all applicants that are yet to be enrolled.
 * 
 * Invariant: 
 * Can only cointain elements if length(enrolled) === {capacity}
 * Can not contain elements with the same {studentID}
 */
 
 /**
 * A {StudentID} is a string.
 *
 * Represents a student's identifier (e.g. national identity number).
 * 
 *
 * Invariant:
 * exactly 10 digits in the format "YYMMDDXXXX", where Y = Year, M = Month, D = Day
 * X = Social Security number.
 * digits must be whole numbers
 * digits must be >= 0
 */
 
 

// DATA TYPE EXAMPLES
// your valid, invalid and borderline examples here
const list_of_students = list("9913321234",
    "8899994321",
    "9902311111",
    "7515402222",
    "6700003333",
    "0113454444",
    "9812995555",
    "7402306666",
    "0006997777",
    "8811318888");

// FUNCTION SPECIFICATION AND IMPLEMENTATION
/**
 * Your function specification here
 */
 
//helpers for make_course
function course_invariants(code, name, capacity, enrolled, waitlist) {
    if (!is_string(code) ||
        !is_string(name) ||
        !is_number(capacity) ||
        !is_list(enrolled) ||
        !is_list(waitlist)) {
        error("invalid argument types");
    }
}


function string_length(code) {
        let i = 0;
        while (char_at(code, i) !== undefined) {
            i = i + 1;
        }
        return i;
    }
 function code_invariants(code) {
    const string = string_length(code);
    if (string !== 6) {
        error("code must have string length === 6");
    }
}


function name_invariants(name) {
    const string = string_length(name);
    if (string === 0) {
        error("name can't be empty");
    }
}

function capacity_invariants(capacity) {
    if (capacity !== math_floor(capacity) || capacity < 0) {
        error("capacity must be a whole number and non-negative");
    }
}

function member_safe(x, list) {
    return member(x, list) !== null;
}

function check_duplicates(xs) {
    function helper(seen, rest) {
        return is_null(rest)
            ? false
            : member_safe(head(rest), seen)
              ? true
              : helper(pair(head(rest), seen), tail(rest));
    }
    return helper(null, xs);
}

   function enrolled_variants(enrolled, capacity) {
    if (length(enrolled) > capacity) {
        error("enrolled is more than capacity");
    }
    if (check_duplicates(enrolled)) {
        error("duplicate StudentID in enrolled");
    }
}

function waitlist_variants(waitlist, enrolled, capacity) { 
    if (!is_null(waitlist) && length(enrolled) < capacity) {
        error("waitlist can't have elements if course isn't full");
    }
    if (check_duplicates(waitlist)) {
        error("waitlist has duplicate elements");
    }
}

 

/**
* Creates a new course.
* @param {code} - The code name
* @param {name} - The name of the course in human readable form.
* @param {capcity} - the max number of enrolled students possible.
* @param {enrolled} - The students enrolled in the course.
* @param {waitlist} - The applicants on a waiting list.
* @precondition code is a valid {code}, name is a valid {name}
* capacity is a valid {capacity}, enrolled is a valid {enrolled},
* waitlist is a valid {waitlist}
* Must take arguments === 5.
* @returns {Course} - a course.
*/
function make_course(code, name, capacity, enrolled, waitlist) {
    course_invariants(code, name, capacity, enrolled, waitlist);
    code_invariants(code);
    name_invariants(name);
    capacity_invariants(capacity);
    enrolled_variants(enrolled, capacity);
    waitlist_variants(waitlist, enrolled, capacity);
    return list(code, name, capacity, enrolled, waitlist);
}
        


function course_code(c) {
    return list_ref(c, 0);
}
function course_name(c) {
    return list_ref(c, 1);
}
function course_capacity(c) {
    return list_ref(c, 2);
}
function course_enrolled(c) {
    return list_ref(c, 3);
}
function course_waitlist(c) {
    return list_ref(c, 4);
}

const c_1 = make_course("1DL201", "Programkonstruktion och Datastrukturer", 
    4, list("050624-2255", "040125-1287", "020424-2752", "090724-2753"), list("040621-1234"));
    

function remove(x, xs) {
    return filter(y => y !== x, xs);
}


/**
 * Adds a student to a course.
 * If the course is full, the student gets added to the waitlist
 * @param {Course} course - a list with all details about the course
 * @param {string} NIN - a string to represent a student
 * @return {Course} course - returns a new course with the person added to 
 * enrolled or waitlist if the course is full
 */
function apply(course, NIN) {  // edit parameters freely, but do not rename
    // you implementation here
    const enrolled = course_enrolled(course);
    const waitlist = course_waitlist(course);
    const capacity = course_capacity(course);

    if (member_safe(NIN, enrolled) || member_safe(NIN, enrolled)) {
        return course;
    } else if (length(enrolled) < capacity) {
        return make_course(course_code(course), course_name(course),
            capacity, append(enrolled, list(NIN)), waitlist);
    } else {
        return make_course(course_code(course), course_name(course),
            capacity, enrolled, append(waitlist, list(NIN)));
    }
}
/**
 * Withdraws a student from a course.
 * @param {Course} course - A course.
 * @param {StudentID} NIN - The student identifier.
 * @precondition course is a valid {Course} and NIN is a valid {StudentID}.
 * @returns {Course} - A course where NIN is removed from enrolled or waitlist,
 * or the original course if NIN was not present.
 */
function withdraw(course, NIN) { // edit parameters freely, but do not rename
    // you implementation here
    const enrolled = course_enrolled(course);
    const waitlist = course_waitlist(course);
    const capacity = course_capacity(course);

    if (member_safe(NIN, enrolled)) {
        return make_course(course_code(course), course_name(course), capacity, 
            remove(NIN, enrolled), waitlist);
    } else if (member_safe(NIN, waitlist)) {
        return make_course(course_code(course), course_name(course), capacity, 
            enrolled, remove(NIN, waitlist));
    } else {
        return course;
    }
}
// TESTS
display(apply(c_1, "010124-2751"), "Test apply 1: ");

display(withdraw(c_1, "040621-1234"), "Test withdraw 1: ");

const invalid_make_course1 = make_course(123, "Name", 10, list("1111111111"), list("2222222222"));
// code is not a string

const invalid_make_course2 = make_course("1TD023", 999, 10, list("1111111111"), list("2222222222"));
// name is not a string

const invalid_make_course3 = make_course("1TD023", "Name", "10", list("1111111111"), list("2222222222"));
// capacity is not a number

const invalid_make_course4 = make_course("1TD023", "Name", 10, "not_a_list", list("2222222222"));
// enrolled is not a list

const invalid_make_course5 = make_course("1TD023", "Name", 10, list("1111111111"), "not_a_list");
//whitelist not a list

const invalid_make_course6 = make_course("1TD0237", "Name", 10, list("1111111111"), list("2222222222"));
// code is !== 6 characters

const invalid_make_course7 = make_course("1TD023", "", 10, list("1111111111"), list("2222222222"));
// name cannot be empty 

const invalid_make_course8 = make_course("1TD023", "Name", -1, list("1111111111"), list("2222222222"));
//capacity cannot be empty

const invalid_make_course9 = make_course("1TD023", "Name", 10.5, list("1111111111"), list("2222222222"));
// capacity not a whole number

const invalid_make_course10 = make_course("1TD023", "Name", 1,list("1111111111", "2222222222"), list("3333333333"));
// enrolled bigger than capacity

const invalid_make_course11 = make_course("1TD023", "Name", 2, list("1111111111", "1111111111"), list("2222222222"));
//duplicate elements in enrolled

const invalid_make_course12 = make_course("1TD023", "Name", 3,list("1111111111", "2222222222"), list("3333333333"));
// waitlist cant have elements if course isnt full

const invalid_make_course13 = make_course("1TD023", "Name", 1,list("1111111111"), list("2222222222", "2222222222"));
//waitlist has duplicate elements
