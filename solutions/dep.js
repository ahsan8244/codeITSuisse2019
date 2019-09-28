let input={
    "modules": ["m1","m27","m18","m31"],
    "dependencyPairs": [
                           {"dependee":"m1","dependentOn":"m18"},
                           {"dependee":"m27","dependentOn":"m18"},
                           {"dependee":"m31","dependentOn":"m1"},
                           {"dependee":"m31","dependentOn":"m27"}
                          ]
}

let modulesArr=input["modules"];
let depenPairs=input["dependencyPairs"];
let dependees=[];
let dependents=[];
let mainObj={};
let main=[];

// Start off and create a moduleName to emptyList


function check(arr1, arr2){
    for (var i=0, len=arr1.length; i<len; i++){
        if (!(arr2.includes(arr1[i]))){
            console.log("false")
            return false;
        }
    }
    return true;
}

for(var i=0, len=depenPairs.length;i<len; i++){
    dependee1=depenPairs[i]["dependee"];
    dependent1=depenPairs[i]["dependentOn"];
    dependees.push(dependee1);
    dependents.push(dependent1);
}

for (var i=0, len=modulesArr.length; i<len; i++){
    if (!(dependees.includes(modulesArr[i]))){
        main.push(modulesArr[i]);
    }else{
        mainObj[modulesArr[i]]=[]
    }
}
if(main.length!=0){
    for(var i=0, len=depenPairs.length;i<len; i++){
        dependee1=depenPairs[i]["dependee"];
        dependent1=depenPairs[i]["dependentOn"];
        mainObj[dependee1].push(dependent1);
    }
    
    for (var x=0, len=Object.keys(mainObj).length; x<len; x++){
        for(var i=0, len=Object.keys(mainObj).length; i<len; i++){
            if (check(mainObj[Object.keys(mainObj)[i]], main)){
                if(!(main.includes(Object.keys(mainObj)[i]))){
                    main.push(Object.keys(mainObj)[i]);
                }
            }
        }
    }
}



console.log(dependees);
console.log(dependents);
console.log(mainObj);

console.log(main);
