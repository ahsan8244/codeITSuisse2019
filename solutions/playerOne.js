input={
    "maxChoosableInteger": 6,
    "desiredTotal": 12
}

n=input["maxChoosableInteger"];
t=input["desiredTotal"];

function hasNumbers(diff, numbers, x, y){
    for(var i=1; i<numbers.length+1; i++){
        if((i===x) || (i===y)){
            continue;
        }
        if(i>=diff){
            return true;
        }
    }
    return false;
}

function trueForAll(numbers, x){
    for(var y=1; y<numbers.length+1; y++){
        diff=t-(x+y);
        if(!hasNumbers(diff, numbers, x, y)){
            return false
        }
    }
    return true
}
numbers=[]
for (var i=1; i<n+1; i++){
    numbers.push(i);
}
notPossible=[]
for(var i=1; i<n+1; i++){
    for(var x=1; x<n+1; x++){
        if (x===i){
            continue;
        }
        if(i+x>=t){
            notPossible.push(i)
            break;
        }
    }
}

firstPossible=[]

for(var i=1; i<n+1; i++){
    if(!(notPossible.includes(i))){
        firstPossible.push(i);
    }
}

notPossibleTwo=[]

yes=[]
for(var i=0; i<firstPossible.length; i++){
    num=firstPossible[i];
    if(trueForAll(numbers, num)){
        yes.push(num);
    }
}
if(yes.length>0){
    result=3;
}

if(yes.length===0){
    result=-1;
}

obj={
    "res": result,
}

console.log(obj);
