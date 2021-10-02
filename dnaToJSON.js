import { createRequire } from "module"; // add the ability to construct the'require' method in js file
const require = createRequire(import.meta.url); // construct the require method 
const fs = require('fs');
const dnaRead = fs.readFileSync('dna.txt', 'utf8');

let dnaStr = dnaRead.replace(/#AncestryDNA/g, '');
//for every 24 characters in the string, take the first 24 characters and split them into an array
let dna24 = dnaStr.match(/.{1,24}/g);

//for each string in the array, split it into an key value pair
let dnaSet = [];
for (let i = 0; i < dna24.length; i++) {
    let dnaArr = dna24[i].split('\t');
    let snps = dnaArr[3] + dnaArr[4];
    if(snps === '00'){
        snps = '??';
    }
    let dna = {
        "ribosome": dnaArr[0],
        "chromosome": dnaArr[1],
        "marker": dnaArr[2],
        "genotype": snps

    };
    dnaSet.push(dna);
}

//write dnaSet result to json File 
fs.writeFileSync('dna.json', JSON.stringify(dnaSet, null, "  "), (err) => { //json stingify's third argument is the indentation for JSON file
    if (err) throw err;
        console.log('The file has been saved in json in dna.json!'); //saves and updates dna.json
});





