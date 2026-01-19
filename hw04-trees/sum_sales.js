/**
 * General tree accumulate.
 * Folds a general tree by applying `opp` to each node and the
 * combined result of its children.
 * 
 * @param {function} opp - handles the current node.
 * @param {function} opa - combines child results.
 * @param {*} initial - base case for a tree with no children.
 * @param {Tree} tree - general tree: list(item, ...children).
 * @returns {*} folded result.
 */
function gt_accumulate(opp, opa, initial, tree) {
    // variant: number_of_nodes(tree)
    return is_null(tree)
        ? initial
        : opp(
            head(tree),
            accumulate(
                (subtree, acc) =>
                    opa(
                        gt_accumulate(opp, opa, initial, subtree),
                        acc
                    ),
                initial,
                tail(tree)
            )
        );
}

/**
 * Builds a new tree node with updated total sales.
 *
 * @param {Pair} node - pair(name, sales).
 * @param {List(Tree)} updated_children - already-updated subtrees.
 * @returns {Tree} rebuilt subtree with summed sales.
 */
function opp_build_new_tree(node, updated_children) {
    const children_sum = accumulate(
        (child, acc) => tail(head(child)) + acc,
        0,
        updated_children
    );

    const total_sales = tail(node) + children_sum;

    return pair(
        pair(head(node), total_sales),
        updated_children
    );
}

/**
 * Collects updated child subtrees into a list.
 *
 * @param {Tree} child_tree
 * @param {List(Tree)} acc
 * @returns {List(Tree)} updated accumulator.
 */
function opa_collect(child_tree, acc) {
    return pair(child_tree, acc);
}

/**
 * Computes total sales (node + children) for each member in the tree.
 *
 * @param {Tree} network - general tree of pair(name, sales).
 * @returns {Tree} new tree with updated sales totals.
 */
function sum_sales(network) {
    //variant: number_of_nodes(network)
    return gt_accumulate(
        opp_build_new_tree,
        opa_collect,
        null,
        network
    );
}

// example networks
const small_network = list(
    pair("Alice", 100),
    list(pair("Bob", 50)),
    list(
        pair("Celine", 40),
        list(pair("David", 30))
    )
);

const larger_network = list(
    pair("Joe", 3),
    list(
        pair("Matilda", 2),
        list(pair("Magnus", 1)),
        list(pair("Lea", 1)),
        list(pair("Fred", 1))
    ),
    list(
        pair("Andrea", 2),
        list(pair("Susan", 1)),
        list(pair("Leif", 1))
    ),
    list(pair("Hannah", 2))
);
