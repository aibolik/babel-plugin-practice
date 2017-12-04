var babylon = require('babylon');
var traverse = require('babel-traverse').default;
var t = require('babel-types');
var generate = require('babel-generator').default;
var template = require('babel-template');

const code = `function square(n) {
  var a = console.log('a');
  console.error('as');
  console.log('hahah');
  console.log(n);
  return n * n;
}`;

const ast = babylon.parse(code);

// traverse(ast, {
//   enter(path) {
//     if (t.isIdentifier(path.node, { name: "n" })) {
//       path.node.name = "x";
//     }
//   }
// });

// path.node.left = t.identifier('sebmck');

traverse(ast, {
  enter(path) {
    if(t.isIdentifier(path.node, { name: "console", paren})) {
      // console.log('We found console');
      let node = path.findParent(path => path.isExpressionStatement());
      if(node) {
        node.remove();
        path.skip();
      }
      // console.log(node);
    }
  }
})

let newCode = generate(ast, {}, code);
// console.log(JSON.stringify(ast));
console.log(newCode.code);

/*
let newCode = generate(ast, {
    retainLines: false,
    compact: "auto",
    concise: false,
    quotes: "double",
  }, code);

// console.log(newCode);
const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast2 = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});

console.log(generate(ast).code);
*/
