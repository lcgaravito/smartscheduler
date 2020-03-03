const stunde = [
  "5:00-5:30",
  "5:30-6:00",
  "6:00-6:30",
  "6:30-7:00",
  "7:00-7:30",
  "7:30-8:00",
  "8:00-8:30",
  "8:30-9:00",
  "9:00-9:30",
  "9:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "12:00-12:30",
  "12:30-13:00",
  "13:00-13:30",
  "13:30-14:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
  "16:30-17:00",
  "17:00-17:30",
  "17:30-18:00",
  "18:00-18:30",
  "18:30-19:00",
  "19:00-19:30",
  "19:30-20:00",
  "20:00-20:30",
  "20:30-21:00",
  "21:00-21:30",
  "21:30-22:00" ];

// Table which will display schedules information 
const tbody = document.getElementById("schedulesBody");

function cleanTbody() {
  var child = tbody.lastElementChild;  
    while (child) { 
        tbody.removeChild(child); 
        child = tbody.lastElementChild; 
    } 
}

// Generates table elements for display information
const render = (registers, usuario) => {
  var i = 1;
  cleanTbody();
  document.getElementById("schedules").style.visibility = "visible";
  registers.forEach(register => {
    
    register.schedule.forEach( block => {
      if( register.user === usuario ) {
        const startEndHours = stunde[block].split("-");

        // Creates row
        const tr = document.createElement("tr");
        
        // Creates first column
        const th = document.createElement("th");
        th.scope = "row";
        th.textContent = i;

        // Creates second column
        const td1 = document.createElement("td");
        td1.textContent = register.day;

        // Creates third column
        const td2 = document.createElement("td");
        td2.textContent = startEndHours[0];

        // Creates third column
        const td3 = document.createElement("td");
        td3.textContent = startEndHours[1];

        // Creates fourth column
        const a = document.createElement("a");
        a.href="#";
        a.textContent="Delete";
        const td4 = document.createElement("td");

        // Appends all created objects
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td4.appendChild(a);
        tr.appendChild(td4);

        tbody.appendChild(tr);

        i++;
      }
    })
  }
)};

function aux(){
  viewUserHours();
}


function viewUserHours() {
  const usuario = document.getElementById("viewUserHours").value;
  console.log( "Entró a viewUserHours con el usuario ", usuario );
  fetch("schedules")
    .then(req => req.json())
    .then(data => render(data, usuario));
}