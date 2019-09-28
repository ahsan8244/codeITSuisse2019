const composition = "abcde";
const patterns = ["ac", "ab", "de"];
let output = [];

const compositionFinder = (composition,patterns,count) => {
    if(patterns.length <= 0 || composition.length <= 0) {
        output.push(count);
        return;
    }else{
        const first = patterns[0][0];
        const second = patterns[0][1];
        if(composition.firstIndexOf(first+second) != -1){
            const removals = composition.match(/first+second/g).length;
            compositionFinder(composition.replace(first, ""),patterns.slice(1,), count + removals);
            compositionFinder(composition.replace(second, ""),patterns.slice(1,),count + removals);
        }
        
    }
}

compositionFinder(composition, patterns, 0);