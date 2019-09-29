input=[
    "laziest",
    "busiest",
    "easiest",
]
stringsOriginal=input;
strings=[...input];

function findNext(current, strings, newStrings){
    size=strings.length;
    for(var i=0; i<strings.length; i++){
        if (newStrings.includes(strings[i])){
            strings[i]=false;
            size--;
        }
    }
    differences=[]
    for(var i=0; i<size+1;i++){
        difference=[];
        if(!strings[i]){
            continue;
        }
        diff=0;
        for (var x=0; x<current.length; x++){
            if (current[x]!=strings[i][x]){
                diff++;
            }
        }
        difference=[strings[i], diff];
        differences.push(difference);
    }
    differences.sort(
        function(a,b){
            return(a[1]>b[1]);
        }
    )
    return differences[0];
}

cost=0;
count=0;
reach=strings.length;
newStrings=[]
steps=[]
current="laziest"
for(var i=0; i<reach; i++){
    newObj={}
    if(i===0){
        newObj["type"]="INPUT";
        newObj["value"]=strings[0];
        cost+=strings[0].length;
        steps.push(newObj);
        newStrings.push(strings[0]);
        continue;
    }else{
        current=newStrings[i-1];
        console.log(current);
        newObj={};
        newObj["type"]="COPY";
        newObj["value"]=current;
        steps.push(newObj)
        cost+=1;
        nextStringHam=findNext(current, strings, newStrings)
        newObj={};
        newObj["type"]="TRANSFORM";
        newObj["value"]=nextStringHam[0];
        steps.push(newObj);
        newStrings.push(nextStringHam[0]);
        cost+=nextStringHam[1];
    }
}

res={
    "cost": cost,
    "steps": steps,
}

console.log(res);