let input = {
    "startingCapital": 1300,
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
        ],
        
    ]
}
let capital = input.startingCapital;
let stocks = input.stocks;


// let stocksSorted = quickSort(stocks,0,stocks.length - 1);
let stocksSorted = stocks.sort(function(a,b){
    return (a[2]/a[3])>(b[2]/b[3]);
})
let stocksSortedCost = stocksSorted;
stocksSortedCost = stocksSortedCost.map(item => item[2]);
let minCost = Math.min(...stocksSortedCost);
let profit = 0;
let portfolio = [];
for(let i = 0 ; i<stocksSortedCost.length ; ++i){
    portfolio.push(stocksSorted[i][0]);
    profit += stocksSorted[i][1];
    capital -= stocksSorted[i][2];
}

function maxSum(capital,n){
    while(capital >= minCost && n >= 0){
        let numOfStocks = 0;
        let cost = 0;
        if(capital >= stocksSorted[n][2]){
            numOfStocks = Math.floor(capital/stocksSorted[n][2]);
            cost = (numOfStocks*(stocksSortedCost[n]));
            for(let i = 0; i<numOfStocks ;++i){
                portfolio.push(stocksSorted[n][0]);
            }
            profit += (numOfStocks*(stocksSorted[n][1]));
            stocksSortedCost.splice(n,1);
            stocksSorted.splice(n,1);
            minCost = Math.min(...stocksSortedCost);
        }
        n-=1;
        capital-=cost;
    }
}


maxSum(capital,stocksSorted.length - 1);
let output = {
    profit,
    portfolio
}
console.log(output);



