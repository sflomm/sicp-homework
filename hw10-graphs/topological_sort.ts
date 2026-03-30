// extend as needed
import {
    for_each, List, head, tail, is_null, list
} from '../../lib/list';
import {
    type Queue, empty, is_empty, enqueue, dequeue, head as qhead
} from '../../lib/queue_array';
import {
    type ListGraph, 

} from '../../lib/graphs';

// Build an array based on a function computing the item at each index
function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

/**
 * Topological sort of a graph.
 * @param adj a directed acyclic graph
 * @returns Returns one valid topological sort of the input graph.
 */
export function topological_sort({adj, size}: ListGraph): Queue<number> {

  //initialize pending and result queues to empty
  const pending: Queue<number> = empty();
  const result: Queue<number> = empty();

//traverses each element in ListGraph, counts the number of nodes pointing to node i
function in_degree_helper(adj: List<number>[], size: number, i: number): number {
    let counter = 0;
    for (let j = 0; j < size; j++) {
      for_each(x => x === i ? (counter = counter + 1) : undefined, adj[j]);
    }
    return counter;
  }

  //build the array that hold in_degrees
  const in_degree: Array<number> =
    build_array(size, i => in_degree_helper(adj, size, i));


  // enqueue all nodes with in-degree 0 to pending
    for (let i = 0; i < size; i++) {
    if (in_degree[i] === 0) {
        enqueue(i, pending);
    }
  }

  //if pending is not empty dequeue from pending and enqueue to result
  while (!is_empty(pending)) {
    const node = qhead(pending);
    dequeue(pending);

    enqueue(node, result);

    //decrement each in_degree until in_degree[el] === 0, if 0 enqueue that el to 
    for_each(el => {
      in_degree[el] = in_degree[el] - 1;
      if (in_degree[el] === 0) {
        enqueue(el, pending);
      }
    }, adj[node]);
  }

  return result;
}

// Builds array that maps each node to position in postion array
export function to_position_array(tsort: Queue<number>, size: number): number[] {
     const pos = build_array(size, () => -1);

    const head_index = tsort[0];
    const tail_index = tsort[1];
    const arr = tsort[2];

    let i = 0;

    for (let j = head_index; j < tail_index; j++) {
        pos[arr[j]] = i++;
    }

    return pos;
}

/**
 * Check whether a topological sort of a graph is valid.
 * @param adj a directed acyclic graph
 * @param tsort topological ordering to check
 * @returns Returns true if tsort is a valid topological ordering of the
 *     nodes in the input graph, false otherwise.
 */
export function is_topological_sort({adj, size}: ListGraph,
                                    tsort: Queue<number>): boolean {
// Checks invariant: "must contain every node exactly once."
if (tsort[1] - tsort[0] !== size) {
    return false;
}

// Builds array that maps positions to its ordering
const pos = to_position_array(tsort, size);


// Checks if node appears after its neighbor
function check_neighbors(node: number, xs: List<number>): boolean {
    return is_null(xs)
        ? true
        : pos[node] > pos[head(xs)]
        ? false
        : check_neighbors(node, tail(xs));
    }

// Check all nodes in the ListGraph
function check_nodes(node: number): boolean {
    return node === size // base case, all nodes checked
        ? true
        : !check_neighbors(node, adj[node])     
        ? false
        : check_nodes(node + 1);
    }

    //Start from first node
    return check_nodes(0);
}
