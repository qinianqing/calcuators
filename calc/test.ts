import { calc } from './calc';
let expreion = process.argv[2]
if (!expreion) {
    console.log('a expreion required')
    process.exit(-1)
}

console.log(calc(expreion))
