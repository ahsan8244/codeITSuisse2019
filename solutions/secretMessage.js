input=[
    {
        "n": 3,
        "text": "This is a sample message."
    },
    {
        "n": 10,
        "text": "Too short"
    },
]


result=[]
route=input.length

alphabets= ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").split("")
numbers=("0123456789").split("")

for(var r=0; r<route; r++){
    key=input[r]["n"]
    text=input[r]["text"]
    res=text.split(" ")
    sentence=""
    for(var i=0; i<res.length; i++){
        sentence+=res[i];
    }
    finalSentence=sentence.replace(/[^a-zA-Z0-9]/g,'').toUpperCase();
    sum=0;
    cipheredSentence=[]
    for(var i=0; i<finalSentence.length; i++){
        cipheredSentence.push("0");
    }
    m=0
    for (var x=0;x<finalSentence.length; x++){
        for(var y=x; y<finalSentence.length; y+=key){
            if(cipheredSentence[y]==="0"){
                cipheredSentence[y]=finalSentence[m];
                m++;
            }
        }
    }
    finalAnswer="";
    for(var x=0; x<cipheredSentence.length; x++){
        finalAnswer+=cipheredSentence[x];
    }
    result.push(finalAnswer);
}
console.log(result);