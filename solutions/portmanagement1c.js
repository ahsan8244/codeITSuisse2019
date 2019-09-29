let input = {
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
};
  let capital = input.startingCapital;
let stocks = input.stocks;
let value = stocks.map(item => item[1]);
let cost = stocks.map(item => item[2]);
function unboundedKnapsack(W, n, val, wt){
    let dp = [];
    for(let i = 0;i < W+1 ;++i){
        dp.push(0)
    } 
  
    let ans = 0
  
    for (let i = 0; i<W+1;++i){
        for(let j = 0;j<n;++j){
            if(wt[j] <= i){
                dp[i] = Math.max(dp[i],dp[i - wt[j]] + val[j]);
            }
        }
    } 

  
    return dp[W] ;
}

const profit = unboundedKnapsack(capital,value.length,value,cost);
let portfolio = [];
const subsetSum = function(L, n, result, m){
    
    if(m == 0){
      portfolio.push(result);
      return;
    }
    
    if(n == 0){
      return;
    }
  
    if(L[n-1][2] <= m){
      subsetSum(L,n-1,[...result,L[n-1][0]],m-L[n-1][2]);
    }
  
    subsetSum(L,n-1,result,m);
  
  }
//   portfolio = portfolio[0]
let output = {
    profit,
    portfolio
};
console.log(output)