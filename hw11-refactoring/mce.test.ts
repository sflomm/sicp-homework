//extend imports as needed
import {
    parse
} from 'sicp';
import {
    evaluate, setup_environment, tagged_list_to_record
} from '../src/mce';

test('case operator_combination, application, name, literal ', () => {
    const tl = parse(`{-2 / 2 * 2 + 2 -2;}`);
    const enviro = setup_environment();
    expect(evaluate(tl, enviro)).toBe(-2);
});

               
test('case block, sequence, function_declaration, name', () => {      
const tl = parse("{ function f(x) { return x + 1; } f(5); }");
const enviro = setup_environment();
expect(evaluate(tl, enviro)).toBe(6);

});

test('case application, lambda_expression, return_staterment, literal', () => {
    const enviro = setup_environment();
    const tl= parse(
        `{
           const lambda = (access) => {return access;};
           lambda(1738);
        }`)
    
    expect(evaluate(tl, enviro)).toBe(1738);
});

test('case conditional, literal', () => {
    const tl = parse("true ? 2 : 1;");
    const enviro = setup_environment();
    expect(evaluate(tl, enviro)).toBe(2);
});

test('case block, sequence, constant_declaration, assignment, name, literal', () => {
    const enviro = setup_environment();
    const tl = parse("{const x = 1; x = 2; x; }");
    expect(evaluate(tl, enviro)).toBe(2);
});