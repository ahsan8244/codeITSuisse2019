input={
    "startingCapital": 400,
    "stocks": [
        [
            "Sony", //ticker of type string
            30, //expected profit of type int
            400  //share price of type int
        ],
        [
            "Dell",
            20,
            300
        ],
        [
            "Disney",
            15,
            100
        ],
        [
            "Apple",
            20,
            100
        ]
    ]
}

function findMinRemaining(myCosts){
    return Math.min(...myCosts);
}

function removeA(array, item) {
    var index= array.indexOf(item);
    if(index!=-1){
        array.splice(index, 1);
    }
}

function lastMove(myCosts, myMoney){
    array=[...myCosts]
    couldBe=[];
    numNegatives=0;
    for(var i=0; i<array.length; i++){
        array[i]-=myMoney;
        if(array[i]<=0){
            numNegatives++;
            couldBe.push(myCosts[i])
        }
    }
    
    if(numNegatives>2){
        return false;
    }else{;
        return couldBe;
    }
}

money=input["startingCapital"]
costs=[]

stocks=input["stocks"]

for (var i=0; i<stocks.length; i++){
    profitPercent=stocks[i][1]/stocks[i][2]
    stocks[i].push(profitPercent);
    stocks[i].push(true);
}
stocks.sort(function(a,b){
    return a[3]<b[3];
})

costMax=0;
profitMax=0;
newPortfolio=[]
for (var i=0; i<stocks.length; i++){
    costs.push(stocks[i][2])
    costMax+=stocks[i][2]
    profitMax+=stocks[i][1]
    newPortfolio.push(stocks[i][0])
}

console.log(stocks);


remainingMoney=money
profit=0;
portfolio=[]


minRemaining=findMinRemaining(costs);
console.log(remainingMoney);
console.log(minRemaining)
console.log(costs)

if(money<costMax){
    while (remainingMoney>=minRemaining){
        currentRoute=[]
        for(var i=0; i<stocks.length; i++){
            if(remainingMoney>=stocks[i][2] && stocks[i][4]){
                if(lastMove(costs, remainingMoney)){
                    lastOnes=lastMove(costs, remainingMoney);
                    for(var x=0; x<stocks.length; x++){
                        for(var m=0; m<lastOnes.length; m++){
                            if(lastOnes[m]===stocks[x][2]){
                                lastOnes[m]=stocks[x][1];
                            }
                        }
                        lastOne=Math.max(...lastOnes)
                        if(lastOne===stocks[x][1]){
                            currentRoute.push(stocks[x][1])
                            profit+=stocks[x][1];
                            portfolio.push(stocks[x][0])
                        }
                    }
                    remainingMoney=0;
                }else{
                    stocks[i][4]=false;
                    remainingMoney-=stocks[i][2];
                    removeA(costs, stocks[i][2]);
                    minRemaining=findMinRemaining(costs);
                    profit+=stocks[i][1];
                    currentRoute.push(stocks[i][1]);
                    portfolio.push(stocks[i][0])
                    console.log(remainingMoney);
                    console.log(minRemaining)
                    console.log(costs)
                }
                
            }
        }
    }
}else{
    profit=profitMax;
    portfolio=newPortfolio;
}

result={
    "profit":profit,
    "portfolio": portfolio,
}
console.log(result);



