import {
    ch_empty, ch_insert, ch_keys, ch_lookup, hash_id,
    ph_empty, ph_lookup, ph_insert,
    ch_delete, ph_delete, ProbingHashtable, ph_keys
} from '../lib/hashtables';

import { Pair, List, head, tail, list, pair, is_null, length } from '../lib/list';

import {
    PersonTable, People, Relations, toHashtable, Person, descendants
} from '../homework9/person_table';

test('lookup in PersonTable', () => {
    const people: People = list(pair(195003065514, "Albin"), pair(1999065532, "Magnus"));
    const relations: Relations = list(pair(195003065514, 1999065532));
    const ht: PersonTable = toHashtable(people, relations);
    const magnus: Person | undefined = ph_lookup(ht, 1999065532);
    expect(ph_lookup(ht, 1999065532)).toBe(magnus);
});

test('delete then lookup in PersonTable', () => {
    const people: People = list(pair(195003065514, "Albin"), pair(1999065532, "Magnus"));
    const relations: Relations = list(pair(195003065514, 1999065532));
    const ht: PersonTable = toHashtable(people, relations);
    const magnus: Person | undefined = ph_lookup(ht, 1999065532);
    expect(ph_delete(ht, 1999065532)).toBe(magnus);
    expect(ph_lookup(ht, 1999065532)).toBe(undefined);
});

test('get keys from PersonTable', () => {
    const people: People = list(pair(195003065514, "Albin"), pair(1999065532, "Magnus"));
    const relations: Relations = list(pair(195003065514, 1999065532));
    const ht: PersonTable = toHashtable(people, relations);
    const keys: List<number> = ph_keys(ht);
    expect(length(keys)).toBe(2);
});

test('delete and then check keys from PersonTable', () => {
    const people: People = list(pair(195003065514, "Albin"), pair(1999065532, "Magnus"));
    const relations: Relations = list(pair(195003065514, 1999065532));
    const ht: PersonTable = toHashtable(people, relations);
    ph_delete(ht, 1999065532);
    const keys: List<number> = ph_keys(ht);
    expect(length(keys)).toBe(1);
});

test('delete and then insert in PersonTable', () => {
    const people: People = list(pair(195003065514, "Albin"), pair(1999065532, "Magnus"));
    const relations: Relations = list(pair(195003065514, 1999065532));
    const ht: PersonTable = toHashtable(people, relations);
    
    ph_delete(ht, 1999065532);

    const id: number  = 1999565537;
    const name: string = "Bengt";
    const parents: number[] = [];
    const children: number[] = [];
    const bengt: Person | undefined = {id, name, parents, children};
    if (bengt !== undefined) {
        expect(ph_insert(ht, id, bengt)).toBe(true);
    }
});

//tests for descendants

test('PersonTable with 2 people, parent and child', () => {
    const people: People = list(pair(195003065514, "Albin"), pair(1999065532, "Magnus"));
    const relations: Relations = list(pair(195003065514, 1999065532));
    const ht: PersonTable = toHashtable(people, relations);
    const magnus: Person | undefined = ph_lookup(ht, 1999065532);
    expect(descendants(ht, 195003065514)).toStrictEqual([ 1999065532 ]);
});

test('PersonTable with 4 people, 1 parent, 3 children, 1 grandchild', () => {
    const people: People = list(pair(195003065514, "Albin"), 
                                pair(1999065532, "Magnus"), 
                                pair(1998065532, "Lukas"), 
                                pair(1997065532, "Gabriel"), 
                                pair(2015065532, "Melle"));
    const relations: Relations = list(pair(195003065514, 1999065532), 
                                      pair(195003065514, 1998065532), 
                                      pair(195003065514, 1997065532), 
                                      pair(1997065532, 2015065532));
    const ht: PersonTable = toHashtable(people, relations);
    expect(descendants(ht, 195003065514)).toStrictEqual([ 1999065532, 
                                                          1998065532, 
                                                          1997065532, 
                                                          2015065532 ]);
});

test('PersonTable with 0 people', () => {
    const people: People = list();
    const relations: Relations = list();
    const ht: PersonTable = toHashtable(people, relations);
    expect(descendants(ht, 195003065514)).toBe(undefined);
});

test('PersonTable with 1 Person', () => {
    const people: People = list(pair(1999065532, "Magnus"));
    const relations: Relations = list();
    const ht: PersonTable = toHashtable(people, relations);
    expect(descendants(ht, 195003065514)).toBe(undefined);
});

test('PersonTable with 2 people, child has no children', () => {
    const people: People = list(pair(195003065514, "Albin"), pair(1999065532, "Magnus"));
    const relations: Relations = list(pair(195003065514, 1999065532));
    const ht: PersonTable = toHashtable(people, relations);
    expect(descendants(ht, 1999065532)).toStrictEqual([]);
});

