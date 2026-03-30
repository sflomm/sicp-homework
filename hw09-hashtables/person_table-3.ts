// extend imports as needed
import { Pair, List, head, tail,list, pair, is_null } from '../lib/list';
import { ProbingHashtable, ph_insert, ph_empty, hash_id, ph_lookup, ph_delete } from '../lib/hashtables';

/* DO NOT MODIFY these type declarations */
export type People = List<Pair<number,string>>;
export type Relations = List<Pair<number,number>>;
export type Person = {
    id: number, // the identifier as described above
    name: string,
    parents: Array<number>,
    children: Array<number>
};
export type PersonTable = ProbingHashtable<number,Person>;
/* End of type declarations */

/**
 * Create a hash table of Person records based on given relations.
 * @precondition All ids appearing in relations are in the people list.
 * @param people peoples ids and names
 * @param relations parent-child relations
 * @return Returns a hash table with a Person record for each person from people
 *     that includes all relationships according relations.
 */
export function toHashtable(people: People, relations: Relations): PersonTable {
    //create a empty PersonTable
    const ht: PersonTable = ph_empty(is_null(people) ? 0 : 3 * people.length, hash_id);

    //insert all people into ht
    function insert_people(ht: PersonTable, people: People): PersonTable | undefined {
        if (is_null(people)) {
            return ht;
        } else {
          const pair: Pair<number, string> = head(people);
          const id: number = head(pair);
          const name: string = tail(pair); 
          let person: Person = {id, name, parents: [], children: []}
          
          ph_insert(ht, id, person);
          insert_people(ht, tail(people));
    }}

    //map relations
    function map_relations(updated_ht: PersonTable, relations: Relations): 
                                                    PersonTable | undefined {
      if (is_null(relations)) {
        return updated_ht
      } else {
        const pair_relation: Pair<number, number> = head(relations);
        const parent_id: number = head(pair_relation);
        const child_id: number = tail(pair_relation);

        const parent: Person | undefined = ph_lookup(updated_ht, parent_id);
        const child: Person | undefined = ph_lookup(updated_ht, child_id);

        parent?.children.push(child_id);
        child?.parents.push(parent_id);

        map_relations(updated_ht, tail(relations));
    }}

    insert_people(ht, people);
    map_relations(ht, relations);

    return ht;
}

const people: People = list(pair(195003065514, "Albin"), 
                            pair(1999065532, "Magnus"), 
                            pair(1998065532, "Lukas"), 
                            pair(1997065532, "Gabriel"), 
                            pair(2015065532, "Melle"));
const relations: Relations = list(pair(195003065514, 1999065532), 
                                  pair(195003065514, 1998065532), 
                                  pair(195003065514, 1997065532), 
                                  pair(1997065532, 2015065532));
const h = toHashtable(people, relations);

/**
 * Computes the descendants of a person.
 * @param ht Relationships of people
 * @param id Identification number of the person to compute the descendants for
 * @returns Returns all the descendants of the person with ID id, according to
 *     the relationships in ht, or undefined if the person with ID is is not
 *     found in ht.
 */
export function descendants(ht: PersonTable, id: number): Array<number> | undefined {
  let stack: Array<number> = [];
  const person: Person | undefined = ph_lookup(ht, id);

  if (person === undefined) {
    return undefined;
  }

  function find_descendants(ht: PersonTable, person_rec: Person): void {
    for (let i = 0; i < person_rec.children.length; i++) { 
      const childId: number = person_rec.children[i];
      const child: Person | undefined = ph_lookup(ht, childId);
      console.log(childId);
      console.log(child);

      if (child !== undefined) {
        stack.push(childId);
        find_descendants(ht, child);
      }
    }
}
  find_descendants(ht, person);
   return stack;
}

console.log(descendants(h ,195003065514));
console.log(h.entries);
