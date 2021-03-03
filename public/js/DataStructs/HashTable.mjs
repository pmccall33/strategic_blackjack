// Create a Hash Table and methods

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null
  }
}

class Table {
  constructor(size, hashKey) {
    this.cells = new Array(size);
    this.hashKey = hashKey
  }

 // hash(key) {
 //    let total = 0;
 //    for (let i = 0; i < key.length; i++) total += key.charCodeAt(i);
 //    return total % this.cells.length;
 //  }

  hash(key) {

    let newKey = JSON.stringify(key);

    let reducedHash = Array.from(JSON.stringify(key)).reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);
    let hash = Math.abs(reducedHash>>16);
    // console.log(hash, '- hashedReduce');
    return hash;

    // const hashCode = function(str) {
    //   let hash = 0;
    //   for (let i = 0; i < str.length; i++) {
    //       hash = ((hash<<5) - hash) + str.charCodeAt(i);
    //       hash = hash & hash;
    //   }
    //   console.log(hash, 'froom hashCode()');
    //   return hash;
    // }
    // hashCode(newKey);


    // for (let i in newKey) { total += newKey.charCodeAt(i) }

    // let total2 = 0;
    // for (let i = 0; i < newKey.length; i++) { total2 += newKey.charCodeAt(i); }
    // console.log(total2, (total2 % this.cells.length), ' method 1 hash');
    // return total2 % this.cells.length;


    // let tempHash = (total2 % this.cells.length) + (Math.floor((Math.PI * newKey.charCodeAt(13)) *
    //     (newKey.length * 3)));
    // let hash = Math.trunc((tempHash * 10e12) / 10e12);
    // console.log(hash, 'method 2 hash');
    // return hash;
  }


  insert(key, value) {
    const hash = this.hash(key);

    if (!this.cells[hash]) {
      this.cells[hash] = new Node(key, value);
      console.log(this.cells[hash], '*** ---- this.cells[hash');
    } else if (this.cells[hash].key === key) {
      this.cells[hash].value = value;
    } else {
      let node = this.cells[hash];
      while (node.next) {
        if (node.next.key === key) {
          node.next.value = value;
          return;
        }
        node = node.next;
      }
      node.next = new Node(key, value);
    }
  }

 // insert(key, value) {
 //    const hash = this.hash(key);
 //    if (!this.cells[hash]) {
 //      this.cells[hash] = new Node(key, value);
 //    } else if (this.cells[hash].key === key) {
 //      this.cells[hash].value = value;
 //    } else {
 //      let node = this.cells[hash];
 //      while (node.next) {
 //        if (node.next.key === key) {
 //          node.next.value = value;
 //          return;
 //        }
 //        node = node.next;
 //      }
 //      node.next = new Node(key, value);
 //    }
 //  }

  get(key) {
    let hash = this.hash(key);
    if (!this.cells[hash]) return null;
    else {
      let node = this.cells[hash];
      while (node) {
        if (node.key === key) return node.value;
        node = node.next;
      }
      return null;
    }
  }

  getAll() {
    const table = [];
    for (let i = 0; i < this.cells.length; i++) {
      let cell = [];
      let node = this.cells[i];
      while (node) {
        cell.push([`Cell: ${this.hash(node.key)} ` + ` { upCard: ${node.key.upCard}, total: ${node.key.total}  }, value: ${node.value},  | next: ${node.next
                          ? 'uC: ' + node.key.upCard + ' t: ' + node.next.key.total + ' v: ' + node.next.value
                            : node.next}`]);
        node = node.next;
      }
      table.push(cell);
    }
    return table[0];
  }
}

const createHashTable = (size) => new Table(size);



const rowA = [0.186367, 0.189883, 0.188851, 0.190272, 0.076531, 0.168096];
const row2 = [0.139367, 0.133348, 0.130744, 0.123997, 0.119254, 0.353291];
const row3 = [0.132764, 0.130676, 0.124575, 0.121811, 0.11538, 0.374794];
const row4 = [0.130704, 0.120208, 0.121038, 0.116366, 0.113145, 0.39854];
const row5 = [0.121005, 0.122831, 0.117318, 0.109022, 0.10732, 0.422505];
const row6 = [0.166224, 0.10617,  0.106749, 0.101217, 0.097508, 0.422132];
const row7 = [0.370478, 0.138195, 0.078013, 0.078781, 0.07339, 0.261143];
const row8 = [0.129697, 0.361182, 0.129025, 0.068857, 0.06961,  0.24163];
const row9 = [0.12094,  0.112016, 0.354051, 0.121118, 0.060977, 0.230898];
const row10 = [0.122412, 0.1216,   0.122524, 0.36387,  0.038449, 0.231144];
const rowTotal = [0.152784, 0.145746, 0.140865, 0.186996, 0.076841, 0.296767];


const probValues = [...rowA, ...row2, ...row3, ...row4, ...row5, ...row6, ...row7, ...row8, ...row9, ...row10, ...rowTotal];
const keysTotal = [17, 18,  19,  20,  21, 'BUST'];
const keysUpCard = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'ALL'];

// Create a hashKey to pass to Table methods
const createHashKey = (key) => {
  let sum = 0;
  const jsonKey = JSON.stringify(key);
  for (const i in jsonKey) { sum += jsonKey.charCodeAt(i) }
  // console.log(jsonKey, sum, 'key/sum createKey()')
  const hashKey = Math.trunc(sum + Math.PI * (sum * Math.floor(Math.random() * (jsonKey.length
                                                * jsonKey.charCodeAt(Math.floor(Math.random()))))));

  // console.log(sum, hashKey, 'sum/hashKey');
  return hashKey;
}


// Create new Map with just keys as Objects
const createMapKeys = function(arr1, arr2) {
  const hashMapByKeys = new Map();

    for (let i in arr2) {
      for (let j in arr1) {
          hashMapByKeys.set({ total: arr1[j], upCard: arr2[i] }, NaN );
      }
    }
    // console.log(hashMapByKeys, hashMapByKeys.size, ' from createHashMapByKeys() ++++')
    return hashMapByKeys;
}

createMapKeys(keysTotal, keysUpCard);

// Create new Map from table probability values
const createMap = function(arr1, arr2, valArr) {
  const hashMap = new Map();

    for (let i in arr2) {
      for (let j in arr1) {
          hashMap.set({ total: arr1[j], upCard: arr2[i] }, NaN );
      }
    }
    let indx = 0;
    let val;
    hashMap.forEach((value, key) => {
      value = valArr[indx];
      hashMap.set(key, value);
      indx++;
    });

  // console.log(hashMap);
  return hashMap;
}

// Create a unique hashKey for probHashTable
const probHashMap = createMap(keysTotal, keysUpCard, probValues);


// Create a new HashTable from HashMap of probablities
const createNewTableFromMap = (map, valArr, hashKey) => {
    const probHashTable = new Table((map.size), hashKey);

    let indx = 0;
    map.forEach((value, key) => {
      value = valArr[indx];
      probHashTable.insert(key, value);
      indx++;
    });

    // let indx = 0;
    // for (let [key, value] of map) {
    //   probHashTable.insert(key, value);
    //   indx++;
    // }

    // console.log(probHashTable.cells, probHashTable.cells.length, 'from createTable');
    return probHashTable;
}

const probHashKey = createHashKey({ key: '*((&*#Fi4Bb_lw334?+_8Pr763as^r2' });

const probHashTable = createNewTableFromMap(probHashMap, probValues, probHashKey);

// console.log(probHashMap, probValues, probHashKey, 'probHashMap.size');
console.log(probHashTable.getAll(), 'pHTable ^^^^^^^^^');
// console.log(probHashTable.get('95789027810118730000'), '<<<+++///// -- get()')
// console.log(probHashTable.get({ total: 20, upCard: 10 }), '<<<+++///// -- get()')
// console.log(probHashTable.getAll(), 'getAll() %%%%%%%%%%%%% =====');


export { createHashTable }
