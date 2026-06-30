let create_grid = (function(){
    let container = document.querySelector(".container");
    for(let i = 0;i<9;i++)
    {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.unqid = i.toString();
        container.append(card);
    }

    document.querySelector(".st").addEventListener("click",()=>{
        let p1 = document.querySelector("#p1");
        let p2 = document.querySelector("#p2");
        gameobj.playgame();
        gameobj.names = p1.value+" "+p2.value;
        p1.textContent = "";
        p2.textContent = "";
    })

    document.querySelector(".again").addEventListener("click",()=>{
        let dc = 0;
        for(let i = 0;i<9;i++)
        {
            if(gameobj.a[i] == '$') dc++;
        }
        if(dc == 9) return;
        gameobj.a = ['$','$','$','$','$','$','$','$','$'];
        let p1 = document.querySelector("#p1");
        let p2 = document.querySelector("#p2");
        gameobj.playgame();
        gameobj.names = p1.value+" "+p2.value;
        p1.textContent = "";
        p2.textContent = "";
    })

})();


function display(a){
    let container = document.querySelector(".container");
    let cards = container.querySelectorAll(".card");
    let msg = document.querySelector(".msg");

    for(let i = 0;i<9;i++)
    {
        cards[i].textContent = a[i];
        if(cards[i].textContent == "$") cards[i].style.color = "red";
        else    cards[i].style.color = "white";
    }

    if(gameobj.condition1(a) != 1)
    {
        if(gameobj.condition1(a) == 0) msg.textContent = "Game Tie";
        else if(gameobj.condition1(a) == 2)
        {
            if(gameobj.p2last)  msg.textContent = `${gameobj.p2name} Wins!`;
            else msg.textContent = `${gameobj.p1name} Wins!`;
        }
        container.removeEventListener("click",gameobj.handleclick);
    }
    
}



let gameobj = {
    a:['$','$','$','$','$','$','$','$','$'],
    container : document.querySelector(".container"),
    msg : document.querySelector(".msg"),
    p2last : true,
    p1name : '"X"',
    p2name : '"O"',

    set names(p1){
        let arr = p1.split(" ");
        if(arr[0].length > 0)   this.p1name = arr[0];
        if(arr[1].length > 0)   this.p2name = arr[1];
    },

    condition1 : function(a){
        function equal(a,a1,b1,c1){
            if(a[a1] == a[b1] && a[a1] == a[c1] && a[a1] != '$')    return true;
            else return false;
        };
        let n = this.a.length;
        let dcount = 0;
        for(let i = 0;i<n;i++){
            if(a[i] == '$') {
                dcount++;
            }
        }
        if(equal(this.a,0,1,2) || equal(this.a,3,4,5) ||equal(this.a,6,7,8) ||equal(this.a,0,3,6) ||equal(this.a,4,1,7) ||equal(this.a,5,8,2)||
           equal(this.a,0,4,8) ||equal(this.a,4,6,2)) {
            return 2;
        }
        if(dcount == 0) return 0;
        return 1; 
    },

    handleclick : function(e){
        let card = e.target.classList.contains("card");
        if(!card)   return;
        let currcard = e.target;
        let currid = currcard.dataset.unqid;

        if(gameobj.a[currid] == '$')
        {
            gameobj.msg.textContent = "";
            if(gameobj.p2last)  gameobj.a[currid] = "X";
            else    gameobj.a[currid] = "O";
            gameobj.p2last = !gameobj.p2last;
            display(gameobj.a,gameobj.p2last);
        }
        else
        {
            gameobj.msg.textContent = "Already Chosen!";
            return;
        }
    },

    playgame : function(){
        this.container.addEventListener("click",this.handleclick);
        display(this.a);
    }
};
