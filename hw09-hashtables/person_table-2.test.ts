import {
    ch_empty, ch_insert, ch_keys, ch_lookup, hash_id,
    ph_empty, ph_lookup, ph_insert,
    ch_delete, ph_delete, ProbingHashtable, ph_keys
} from '../lib/hashtables';

import { Pair, List, head, tail,list, pair, is_null, length } from '../lib/list';

import {
    PersonTable, People, Relations, toHashtable, Person
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