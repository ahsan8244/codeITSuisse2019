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
        ]
    ]
}
let capital = input.startingCapital;
let stocks = input.stocks;

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {

    let pivot   = items[Math.floor((right + left) / 2)];
    pivot = pivot[1]/pivot[2];
    let i       = left;
    let j       = right;


    while (i <= j) {

        while (items[i][1]/items[i][2] < pivot) {
            i++;
        }

        while (items[j][1]/items[j][2] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}



function quickSort(items, left, right) {

    let index;

    if (items.length > 1) {

        index = partition(items, left, right);

        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }

    }

    return items;
}

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
        }
        profit += (numOfStocks*(stocksSorted[n][1]));
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



