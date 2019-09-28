let input = {
    "startingCapital": 421,
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

let stocksSorted = quickSort(stocks,0,stocks.length - 1);
let stocksSortedCost = stocksSorted;
stocksSortedCost = stocksSortedCost.map(item => item[2]);
let minCost = Math.min([...stocksSortedCost]);
let profit = 0;
let portfolio = [];
function maxSum(stocksSorted,capital,n){
    if(capital < minCost || n < 0){
        return;
    }else if(capital >= stocksSortedCost[n]){
        let numOfStocks = Math.floor(capital/stocksSortedCost[n]);
        profit += (numOfStocks*stocksSorted[n][1]);
        let stock = stocksSorted[n][0]
        for(let i = 0;i<numOfStocks; ++i){
            portfolio.push(stock);
        }
        maxSum(stocksSorted,capital-(numOfStocks*stocksSortedCost[n]),n-1);
    }else{
        maxSum(stocksSorted,capital,n-1);
    }
}

maxSum(stocksSorted,capital,stocksSorted.length - 1);
let output = {
    profit,
    portfolio
}
console.log(output);



