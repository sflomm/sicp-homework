import {
    for_each, filter, list, head, tail, List, pair, Pair
    , accumulate
} from '../lib/list';

import {
    type Queue, empty, is_empty, enqueue, dequeue, head as qhead
} from '../lib/queue_array';
import {
    lg_from_edges,
    ListGraph
} from "../lib/graphs";

// Build an array based on a function computing the item at each index
function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

/**
 * Node colours for traversal algorithms
 * @constant white an unvisited node
 * @constant grey a visited but not finished node
 * @constant black a finished node
 */
const white = 1;
const grey = 2;
const black = 3;
/**
 * Computes a shortest path between two nodes in a ListGraph.
 * Returns one of possibly several paths.
 * @param lg the list graph
 * @param initial the id of the starting node
 * @param end the id of the end node
 * @returns A list with the nodes on one shortest path from initial to end,
 *          with initial and end included. If no such path exists, returns
 *          the empty list.
 */
export function lg_shortest_path({adj, size}: ListGraph,
                                 initial: number, end: number): List<number> {

    // YOUR TASK: modify the original BFS code below.
    // Do NOT modify the function signature.

    const result  = empty<number>();  // nodes in the order they are being visited
    const pending = empty<number>();  // grey nodes to be processed
    const colour  = build_array(size, _ => white);
    const tracknode = build_array(size, _ => -1);

    // visit a white node
    function bfs_visit(current: number) {
        colour[current] = grey;
        enqueue(current, result);
        enqueue(current, pending);

    }

    // paint initial node grey (all others are initialized to white)
    bfs_visit(initial);

    while (!is_empty(pending)) {
        // dequeue the head node of the grey queue
        const current = qhead(pending);
        dequeue(pending);

        // Paint all white nodes adjacent to current node grey and enqueue them.
        const adjacent_white_nodes = filter(node => colour[node] === white,
                                            adj[current]);
        for_each(bfs_visit, adjacent_white_nodes);

        //update the tracknode array to hold its parent as index
        for_each(node => tracknode[node] = current, adjacent_white_nodes);

        // paint current node black; the node is now done.
        colour[current] = black;
    }
 //base cases

 //initial and end are the same
   if (initial === end) {
        return pair(initial, null);
    }
 //end is never reached
    if (tracknode[end] === -1) {
        return null;
    }


    let path: List<number> = null; // initialize list that holds shortest path
    let currentnode: number = end;
    
    //build path backwards starting from end
    while (currentnode !== initial) {
        path = pair(currentnode, path);   // Add current node to the FRONT of the list
        currentnode = tracknode[currentnode];  // Move to the parent node
    }
 // return the path, include initial
    path = pair(initial, path);
    return path;
}