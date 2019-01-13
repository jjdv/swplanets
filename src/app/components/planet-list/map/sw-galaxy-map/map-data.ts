
export type MapLetters = Array<string>;
export type MapNumbers = Array<number>;

const	charCodeStart = 'A'.charCodeAt(0);
const	charCodeEnd = 'V'.charCodeAt(0);
const mapLetters: MapLetters = [];
for (let charCode=charCodeStart; charCode<=charCodeEnd; charCode++) mapLetters.push(String.fromCharCode(charCode))

const	numStart = 1;
const	numEnd = 28;
const mapNumbers: MapNumbers = [];
for (let i=numStart; i<=numEnd; i++) mapNumbers.push(i);

export { mapLetters, mapNumbers };
