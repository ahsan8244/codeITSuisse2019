let input = {
    "startingCapital": 405,
    "stocks": [
        [
            "Sony", 
            0.5, 
            5  
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
let capital = input.startingCapital;
let stocks = input.stocks;


let stocksSorted = stocks.sort(function(a,b){
    return (a[2]/a[3])>(b[2]/b[3]);
})
let stocksSortedCost = stocksSorted.map(item => item[2]);
let minCost = Math.min(...stocksSortedCost);
let profit = 0;
let portfolio = [];
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



