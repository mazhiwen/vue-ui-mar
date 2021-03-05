const wordTypesList = [
  {
    type: 'keyword',
    words: [
      'function', 'SELECT', 'DISTINCT',
      'FROM', 'AS', 'ON', 'INNER', 'JOIN', 'LEFT',
      'WHERE', 'IS', 'NOT', 'NULL', 'ORDER', 'BY',
      'PARTITION', 'over', 'DESC', 'type', 'this', 'const',
    ],
  },
  {
    type: 'condition',
    words: [
      'if', 'else', 'while',
    ],
  },
  {
    type: 'operator',
    words: [
      '+', '-', '*', '/', '>', '<', '=', '(', ')', '{', '}', '[', ']',
    ],
  },
  {
    type: 'split',
    words: [
      '.', ';', ',',
    ],
  },
  {
    type: 'function',
    words: [
      'aa',
    ],
  },
];


export {
  wordTypesList,
};
