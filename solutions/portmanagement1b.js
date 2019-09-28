let input = {
    "startingCapital": 1300,
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
let maxStock = stocks[0][1]/stocks[0][2];
let stock = {name : stocks[0][0], value : stocks[0][1], cost : stocks[0][2]};

capital -= stocks[0][2];
let portfolio = [stock];
for(let i = 1;i<stocks.length ;++i){
    portfolio.push(stocks[i][0]);
    let pivotStock = stocks[i][1]/stocks[i][2];
    capital -= stocks[i][2];
    if(pivotStock > maxStock){
        axStock = pivotStock;
        stock = {name : stocks[i][0], value : stocks[i][1], cost : stocks[i][2]};
    }
}
console.log(capital);
let profit = Math.floor(capital/stock.cost) * stock.value;

for(let i = 0 ; i < Math.floor(capital/stock.cost); ++i){
    portfolio.push(stock.name);
}
let output = {
    profit ,
    portfolio 
}
console.log(output);