input=[{
    "test_case": 1,
    "guests": 4,
    "tables": 2,
    "friends": [[2, 4]],
    "enemies": [],
    "families": []
  }, {
    "test_case": 2,
    "guests": 4,
    "tables": 2,
    "friends": [[2, 4]],
    "enemies": [[2, 3], [1, 2]],
    "families": []
  }, {
    "test_case": 3,
    "guests": 4,
    "tables": 2,
    "friends": [[2, 4]],
    "enemies": [[2, 3], [1, 2], [1, 3]],
    "families": []
  }]
results=[]
function checkEnemies(arr1, arr2){
    for(var i=0; i<arr1.length; i++){
        if(arr2.includes(arr1[i])){
            return true;
        }
    }
    return false;
}
function checkFriends(arr1, arr2){
    for(var i=0; i<arr1.length; i++){
        if(arr2.includes(arr1[i])){
            return true;
        }
    }
    return false;
}  
testcases=input.length;
outputs=[];
for (var x= 0; x<testcases; x++){
    wedding=input[x];
    numGuests= wedding["guests"]
    numTables= wedding["tables"]
    friends=wedding["friends"]
    enemies= wedding["enemies"]
    families= wedding["families"]
    let profile={};
    for (var i =0; i<numGuests; i++){
        idNum=i+1
        id=""+idNum;
        profile[id]= [];
        good=[];
        bad=[];
        profile[id].push(good);
        profile[id].push(bad);
        for(var y=0; y<friends.length; y++){
            if(friends[y].includes(idNum)){
                if(friends[y][0]===idNum){
                    good.push(friends[y][1]);
                }else{
                    good.push(friends[y][0]);
                }
            }
        }
        for(var y=0; y<families.length; y++){
            if(families[y].includes(idNum)){
                if(families[y][0]===idNum){
                    good.push(families[y][1]);
                }else{
                    good.push(families[y][0]);
                }
            }
        }
        for(var y=0; y<enemies.length; y++){
            if(enemies[y].includes(idNum)){
                if(enemies[y][0]===idNum){
                    bad.push(enemies[y][1]);
                }else{
                    bad.push(enemies[y][0]);
                }
            }
        }        
    }
    isSatisfiable=true;
    tables=[]
    for(var i=0; i<numTables; i++){
        table=[]
        tables.push(table);
    }
    tables[0].push(1);
    pushed=[]
    pushed.push(1);
    for(var i=1; i<numGuests+1; i++){
        if(pushed.includes(i)){
            continue;
        }
        hasFriends=false;
        hasEnemies=false;
        if(checkEnemies(pushed, profile[i][1])){
            hasEnemies=true;
        }
        if(checkFriends(pushed, profile[i][0])){
            hasFriends=true;
        }
        for(var t=0; t<numTables; t++){
            if(hasFriends && hasEnemies){
                if(checkFriends(tables[t], profile[i][0]) && !(checkEnemies(tables[t], profile[i][1]))){
                    tables[t].push(i);
                    pushed.push(i);
                    break;
                }
            }
            if(hasFriends && !hasEnemies){
                if(checkFriends(tables[t], profile[i][0])){
                    tables[t].push(i);
                    pushed.push(i);
                    break;
                }
            }
            if(hasEnemies && !hasFriends){
                if(!(checkEnemies(tables[t], profile[i][1]))){
                    tables[t].push(i);
                    pushed.push(i);
                    break;
                }
            }
            if(!hasEnemies && !hasFriends){
                tables[t].push(i);
                pushed.push(i);
                break;
            }
        }
    }
    persons=0;
    for(var j=0; j<tables.length; j++){
        persons+=tables[j].length;
    }
    if(persons!=numGuests){
        isSatisfiable=false;
    }
    seating=[]
    for(var l=0; l<tables.length; l++){
        table=tables[l];

        if(table.length>0){
            for(var h=0; h<table.length; h++){
                seat=[table[h], l+1]
                seating.push(seat);
            }
            
        }
    }
    if(!isSatisfiable){
        seating=[];
    }
    result={
        "test_case": x+1,
        "satisfiable": isSatisfiable,
        "allocation": seating,
    }
    results.push(result)
}
