fetch("schedules")
  .then(req => req.json())
  .then(data => render(data));

const div = document.getElementById("schedules");

const render = data => {
  data.forEach(element => {
    const tr = document.createElement("tr");
    div.appendChild(tr);
    for (let ele in element) {
      const td = document.createElement("tr");
      if (ele !== "_id") {
        tr.appendChild(td);
        console.log();
        if ( typeof (element[ele]) === "object") {
          console.log( element[ele].toString());
        } else td.textContent = element[ele];
      }
    }
    console.log(element);
  });

};
