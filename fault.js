const connections = [

  { from:"A", to:"B" },

  { from:"B", to:"C" },

  { from:"C", to:"D" },

  { from:"D", to:"E" }

];



function detectFault(){

  const from =
    document.getElementById("from")
    .value
    .trim()
    .toUpperCase();

  const to =
    document.getElementById("to")
    .value
    .trim()
    .toUpperCase();



  if(from === "" || to === ""){

    alert("Please enter stations");
    return;
  }



  let found = false;


  connections.forEach(connection => {

    if(

      (connection.from === from
      && connection.to === to)

      ||

      (connection.from === to
      && connection.to === from)

    ){

      found = true;

    }

  });



  const output =
    document.getElementById("output");



  if(found){

    output.innerHTML = `

      <div class="success">

        ✅ Transmission Line Working

        <br><br>

        ${from} ↔ ${to}

      </div>

    `;

  }

  else{

    output.innerHTML = `

      <div class="fault">

        ⚠ Fault Detected

        <br><br>

        No active connection between

        ${from} ↔ ${to}

      </div>

    `;
  }

}