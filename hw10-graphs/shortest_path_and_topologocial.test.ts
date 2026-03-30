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

import { lg_shortest_path } from './shortest_path';
import { topological_sort, is_topological_sort } from '../sicp-homework/hw10-graphs/topological_sort';


test('startnode === endnode', () => {
const listgraph1: ListGraph = {
    adj : [ list(1), //0
            list(3), //1
            list(), //2
            list() //3 
      ],
    size : 4
    }

    expect(lg_shortest_path({size: listgraph1.size, adj: listgraph1.adj}, 2, 2)).toEqual([2, null]);
});

test('no path exists', () => {
const listgraph2: ListGraph = {
    adj : [ list(), //0
            list(), //1
            list(), //2
            list() //3 
      ],
    size : 4
}
    expect(lg_shortest_path({size: listgraph2.size, adj: listgraph2.adj}, 0, 3)).toBe(null);
});

test('two paths with equal distance', () => {
const listgraph3: ListGraph = {
    adj : [ list(1, 2), //0
            list(3), //1
            list(3), //2
            list() //3 
      ],
    size : 4
}
    expect(lg_shortest_path({size: listgraph3.size, adj: listgraph3.adj}, 0, 3)).toEqual([0, [1, [3, null]]]);
});

test('choosing the shortest path', () => {
    const listgraph4: ListGraph = {
    adj : [ list(1, 2), //0
            list(2), //1 
            list(3), //2 
            list() //3 
      ],
    size : 4
}
    expect(lg_shortest_path({size: listgraph4.size, adj: listgraph4.adj}, 0, 3)).toEqual([0, [2, [3, null]]]);
});

test('End is never reached', () => {
const listgraph5: ListGraph = {
    adj : [ list(1), //0
            list(2), //1
            list(), //2
            list() //3 
      ],
    size : 4
}
    expect(lg_shortest_path({size: listgraph5.size, adj: listgraph5.adj}, 0, 3)).toEqual(null);
});

//topological_sort

test('random DAG', () => {
const listgraph6: ListGraph = {
    adj: [
        list(1, 2), 
        list(3),    
        list(3),    
        list()       
    ],
    size: 4
};
const order  = topological_sort(listgraph6);
console.log(topological_sort(listgraph6));
expect(is_topological_sort(listgraph6, order)).toBe(true);
})

test('random DAG 2', () => {
const listgraph6: ListGraph = {
    adj: [
        list(1), 
        list(2),    
        list(),     
        list()       
        ],
    size: 4
};
const order  = topological_sort(listgraph6);
expect(is_topological_sort(listgraph6, order)).toBe(true);
})


test("linear DAG", () => {
    const listgraph: ListGraph = {
        adj: [
            list(1),
            list(2), 
            list(3), 
            list() 
        ],
        size: 4
    };

    const order = topological_sort(listgraph);
    expect(is_topological_sort(listgraph, order)).toBe(true);
});

test("not a valid DAG (Cycles)", () => {
    const listgraph: ListGraph = {
        adj: [
            list(1), 
            list(2), 
            list(0)  
        ],
        size: 3
    };
    const order = topological_sort(listgraph);
    expect(is_topological_sort(listgraph, order)).toBe(false);
});

test("no entries, but still valid DAG", () => {
    const listgraph: ListGraph = {
        adj: [
            list(), 
            list(), 
            list() 
        ],
        size: 3
    };

    const order = topological_sort(listgraph);

    expect(is_topological_sort(listgraph, order)).toBe(true);
});