let input = {
    "startingCapital": 500,
    "stocks": [
        [
            "Sony", 
            30, 
            400  
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
const knapSack = function(W, wt, val, n) {  
    if (n == 0 || W == 0)  
        return 0;  
    
    // If weight of the nth item is more  
    // than Knapsack capacity W, then  
    // this item cannot be included 
    // in the optimal solution  
    if (wt[n-1] > W) {
        return knapSack(W, wt, val, n-1);  
    } 
    else{ 
        let left = val[n-1] + knapSack(W-wt[n-1], wt, val, n-1);
        let right = knapSack(W, wt, val, n-1);
        let maximum =  Math.max( left,right );
        return maximum;
    } 
}  

let stocksCost = stocks.map(item => item[2]);
let stockProfit = stocks.map(item => item[1]);
const profit = knapSack(capital,stocksCost,stockProfit,stocks.length);
let output = {
    profit
};
let solution = [];
const subsetSum = function(L, n, result, m){
if(m == 0){
    solution.push(result);
    return;
}

if(n == 0){
    return;
}

if(L[n-1][1] <= m){
    subsetSum(L,n-1,[...result,L[n-1]],m-L[n-1][1]);
}

subsetSum(L,n-1,result,m);

}

subsetSum(stocks,stocks.length,[],output.profit);
let portfolio = solution[0].map(item => item[0]);
output = {
    profit,
    portfolio
}
console.log(output);