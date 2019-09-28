export const chessboard = (chessboard) => {
    let queen = []

    for (let i = 0;i<chessboard.length;++i){
        for(let j = 0;j<chessboard.length;++j){
            if(chessboard[i][j] === "K"){
                queen.push(i+1);
                queen.push(j+1)
            }
        }
    }
    let output = 0;
    let i = queen[1];
    let j = 0;
    while(i<chessboard.length && chessboard[queen[0]-1][i] != "X" ){
        output+=1
        i+=1
    }
    i = queen[1] - 2
    while(i>=0 && chessboard[queen[0]-1][i] != "X" ){
        output+=1
        i-=1
    }
    i = queen[0]
    while(i<chessboard.length && chessboard[i][queen[1]-1] != "X" ){
        output+=1
        i+=1
    }
    i = queen[0] - 2
    while(i>=0 && chessboard[i][queen[1]-1] != "X" ){
        output+=1
        i-=1
    }
    i = queen[0]
    j = queen[1]
    while(i<chessboard.length && j<chessboard.length && chessboard[i][j] != 'X'){
        output+=1
        i+=1
        j+=1
    }
    i = queen[0] - 2
    j = queen[1] - 2
    while(i>=0 && j>=0 && chessboard[i][j] != 'X'){
        output+=1
        i-=1
        j-=1
    }
    i = queen[0]
    j = queen[1] - 2
    while(i<chessboard.length && j>=0 && chessboard[i][j] != 'X'){
        output+=1
        i+=1
        j-=1
    }
    i = queen[0] - 2
    j = queen[1]
    while(i>=0 && j<chessboard.length && chessboard[i][j] != 'X'){
        output+=1
        i-=1
        j+=1
    }

    return output
}
