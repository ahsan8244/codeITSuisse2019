let input = {
    n : 7,
    p : 2009
}

let lastNumber = {
    '0' : [0],
    '1' : [1],
    '2' : [2,4,8,6],
    '3' : [3,9,7,1],
    '4' : [4,6],
    '5' : [5],
    '6' : [6],
    '7' : [7,9,3,1],
    '8' : [8,4,2,6],
    '9' : [9,1]
}
let output = [];
if(input.p === 0){
    output = [1,1,1];
}else if(input.n === 0 ){
    output = [0,1,0];
}
else{
    let nString = input.n.toString();
    let lastDigit = nString[nString.length - 1];
    let arr = lastNumber[lastDigit];
    let ind = input.p % arr.length;
    console.log(ind);
    ind === 0 ? ind = 1 : ind = ind;
    lastDigit = arr[ind-1];
    
    //let's find first digit
    let temp = input.p*Math.log10(input.n);
    let rounded = Math.floor(temp);
    let commas = (temp) - rounded;
    let firstDigit = Math.pow(10,commas).toString();
    firstDigit = Number(firstDigit[0]);
    let digitLength = rounded + 1;
    output = [firstDigit,digitLength,lastDigit];
}
console.log(output);
