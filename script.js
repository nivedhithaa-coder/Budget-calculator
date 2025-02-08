let data = [];
let netbal=0,income=0;expense=0;

const createData=document.getElementById("create");
const updateData=document.getElementById("update");
const filterData=document.getElementById("filter");
const listContainer=document.getElementById("list_container");
const resetAll=document.getElementById("reset");

if(localStorage.getItem("list")) {
    data = JSON.parse(localStorage.getItem("list"));
    createList(data);
}

createData.addEventListener("submit",function(e){
    e.preventDefault();

    const descriptionEl=e.target[0];
    const flowEl=e.target[1];
    const amtEl=e.target[2];
    
    if(descriptionEl.value==""||flowEl.value==""||amtEl.value=="")
    {
        alert("Input cannot be empty!!!");
        return
    }

    const newData={
        id:data.length+1,
        description:descriptionEl.value,
        cashflow:flowEl.value,
        amount:amtEl.value
    };

    data.push(newData);
    createList(data);
    displayBar(newData);
    updateLocalStorage();
    /* clear the form */
    descriptionEl.value="";
    flowEl.value="";
    amtEl.value="";
    var dropDown = document.getElementById("mySelect");  
        dropDown.selectedIndex = 0; 
    
    ["incomeFilter", "expenseFilter", "all"].forEach(function(id) {
        document.getElementById(id).checked = false;
      })
      
})

resetAll.addEventListener("click", function(e){
    e.preventDefault();

    /* Clearing data and all elements */
    income=0;
    expense=0;
    netbal=0;
    listContainer.innerHTML="";
    document.getElementById("balance").innerText=netbal;
    document.getElementById("income").innerText=income;
    document.getElementById("expense").innerText=expense;
    data=[];
    updateLocalStorage();
    ["incomeFilter", "expenseFilter", "all"].forEach(function(id) {
        document.getElementById(id).checked = false;
      })
})

filterData.addEventListener("click",function(e){
    console.log(e.target.id);
    if(e.target.id=="incomeFilter"){
        const incomeData=data.filter((d)=>d.cashflow=="income"  );
        createList(incomeData);
        console.log(incomeData);
    }
    else if(e.target.id=="expenseFilter")
    {
        const expenseData=data.filter((d)=>d.cashflow=="expense");
        createList(expenseData);
        console.log(expenseData);
    }
    else if(e.target.id=="all")
    {
        createList(data);
    }
})

updateData.addEventListener("submit",function(e){
    e.preventDefault();

    const descriptionEl=e.target[0];
    const flowEl=e.target[1];
    const amtEl=e.target[2];
    const idEl=e.target[3];
    console.log(idEl.value);
    if(descriptionEl.value==""||flowEl.value==""||idEl.value=="")
    {
        alert("Form is invalid!!!");
        return;
    }

    data=data.filter((d) => d.id!==Number(idEl.value));

    const Dataupdate={
        id:idEl.value,
        description:descriptionEl.value,
        cashflow:flowEl.value,
        amount:amtEl.value,
    };

    data.push(Dataupdate);
    console.log(data);
    createList(data);
    updateLocalStorage();
    /* clear the form */
    descriptionEl.value="";
    flowEl.value="";
    amtEl.value="";
    ["incomeFilter", "expenseFilter", "all"].forEach(function(id) {
        document.getElementById(id).checked = false;
      })

})
/* Functions */
function createList(data){
    listContainer.innerHTML="";
    data.forEach(element => {
        const card=document.createElement("div");
        card.setAttribute("class","mr-2 bg-white border-black border-2 text-center w-60 h-32 p-1 rounded");
        card.innerHTML=`
            <p>${element.description}</p>
            <p>${element.cashflow}</p>
            <p class="mb-2">${element.amount}</p>
            <button type="button" data-id="${element.id}" class="w-20 h-8 bg-black text-white mr-2">EDIT</button>
            <button type="button" data-id="${element.id}" class="w-20 h-8 bg-black text-white mr-2">DELETE</button>
        `;
        listContainer.appendChild(card);
        
        const action=card.querySelectorAll("button");
        action[0].addEventListener("click",handleEditClick)
            
        action[1].addEventListener("click",handleDeleteClick)
        
    });
    
}

function displayBar(data = {})
{
    if(data.cashflow=="income")
    {
        netbal=netbal+Number(data.amount);
        income+=Number(data.amount);
    }
    else if(data.cashflow=="expense")
    {
        netbal-=Number(data.amount);
        expense+=Number(data.amount);
    }
    else{
        alert("invalid input")
    }
    document.getElementById("balance").innerText=netbal;
    document.getElementById("income").innerText=income;
    document.getElementById("expense").innerText=expense;
}

function handleEditClick(e){
    console.log("Edit button clicked")

    const matchingData=data.find((d)=>d.id===Number(e.target.dataset.id))
    console.log(matchingData)

    updateData[0].value=matchingData.description;
    updateData[1].value=matchingData.cashflow;
    updateData[2].value=matchingData.amount;
    updateData[3].value=matchingData.id;
}
function handleDeleteClick(e){
    console.log("Delete Button clicked")
    data=data.filter((d)=>d.id!==Number(e.target.dataset.id));
    console.log(data);
    createList(data);
}    

var select = document.getElementById('mySelect');
select.onchange = function () {
    select.className = 'text-black dropdown mb-2 rounded-full px-3 py-1 mb-4 bg-white';
}
function updateLocalStorage() {
    try {
        localStorage.setItem("list", JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}
