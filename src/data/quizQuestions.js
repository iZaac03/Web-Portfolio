export const TRIVIA_QUESTIONS = [
  {
    q: 'What type of dependency is eliminated when advancing a database from 2NF to 3NF?',
    opts: ['Partial Key Dependency', 'Transitive Functional Dependency', 'Repeating Group Arrays', 'Foreign Key Mismatch'],
    ans: 1,
    exp: '3NF requires that all non-key columns depend directly ONLY on the primary key, eliminating transitive dependencies.'
  },
  {
    q: 'Which DFD process symbol standard is commonly used to show systems data flow transformations?',
    opts: ['Gane & Sarson standard', 'Taylor Scientific chart', 'UML Use Case Oval', 'Kanban Matrix'],
    ans: 0,
    exp: 'Gane & Sarson and Yourdon-DeMarco are the gold standards for DFD Level 0 Context and Level 1 flows.'
  },
  {
    q: 'In MySQL relational design, what does ON DELETE CASCADE accomplish on a Foreign Key?',
    opts: ['Blocks child deletion', 'Automatically removes related child rows when parent is deleted', 'Throws a SQL error', 'Locks parent row forever'],
    ans: 1,
    exp: 'ON DELETE CASCADE deletes related child foreign key records when the parent primary record is deleted.'
  },
  {
    q: 'What is the theoretical lookup time complexity of a MySQL B-Tree Index?',
    opts: ['O(N) linear time', 'O(1) constant time', 'O(log N) logarithmic time', 'O(N^2) quadratic time'],
    ans: 2,
    exp: 'B-Tree indexes enable O(log N) traversal for fast lookups across millions of database rows.'
  },
  {
    q: 'Which guitar riff is John Isaac famously recognized for synthesizing into Web Audio?',
    opts: ['Sweet Child O\' Mine (Guns N\' Roses)', 'Smells Like Teen Spirit', 'Smoke on the Water', 'Hotel California'],
    ans: 0,
    exp: 'John Isaac built the full multi-oscillator Sweet Child O\' Mine intro riff in Web Audio API!'
  }
];
