console.log("OK: main.js");
//Get DOM elements
const _GREETING=document.getElementById("greeting");
let users =["Eddy","Jessica","Martha","Eduardo"]
let userId=0;
setInterval(()=>{
    _GREETING.textContent=users[userId];
    userId < users.length-1 ? userId++ : userId=0;
},2000)
