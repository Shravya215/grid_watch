function generateBlockTable(){

  const count =
    document.getElementById(
      "blockCount"
    ).value;

  let html = `

    <table class="memTable">

      <tr>
        <th>Block</th>
        <th>Size (KB)</th>
      </tr>

  `;

  for(let i=1; i<=count; i++){

    html += `

      <tr>

        <td>B${i}</td>

        <td>

          <input
            type="number"
            class="blockInput"
            placeholder="Enter Size">

        </td>

      </tr>

    `;
  }

  html += `</table>`;

  document.getElementById(
    "blockTable"
  ).innerHTML = html;
}



function generateProcessTable(){

  const count =
    document.getElementById(
      "processCount"
    ).value;

  let html = `

    <table class="memTable">

      <tr>
        <th>Process</th>
        <th>Size (KB)</th>
      </tr>

  `;

  for(let i=1; i<=count; i++){

    html += `

      <tr>

        <td>P${i}</td>

        <td>

          <input
            type="number"
            class="processInput"
            placeholder="Enter Size">

        </td>

      </tr>

    `;
  }

  html += `</table>`;

  document.getElementById(
    "processTable"
  ).innerHTML = html;
}



function getBlocks(){

  return Array.from(
    document.querySelectorAll(".blockInput")
  ).map(input => Number(input.value));

}



function getProcesses(){

  return Array.from(
    document.querySelectorAll(".processInput")
  ).map(input => Number(input.value));

}



function runFirstFit(){

  allocateMemory("FIRST FIT");

}



function runBestFit(){

  allocateMemory("BEST FIT");

}



function runWorstFit(){

  allocateMemory("WORST FIT");

}



let allocatedBlocks = [];



function allocateMemory(type){

  allocatedBlocks = [];

  let blocks = getBlocks();

  let processes = getProcesses();

  let output =
    document.getElementById("output");



  output.innerHTML =
    `<h2>${type} Allocation</h2>`;


  let totalInternal = 0;



  processes.forEach((process,index)=>{

    let chosen = -1;



    // FIRST FIT
    if(type === "FIRST FIT"){

      for(let i=0;i<blocks.length;i++){

        if(blocks[i] >= process){

          chosen = i;
          break;
        }
      }
    }



    // BEST FIT
    else if(type === "BEST FIT"){

      let best = Infinity;

      for(let i=0;i<blocks.length;i++){

        if(
          blocks[i] >= process
          &&
          blocks[i] < best
        ){

          best = blocks[i];

          chosen = i;
        }
      }
    }



    // WORST FIT
    else if(type === "WORST FIT"){

      let worst = -1;

      for(let i=0;i<blocks.length;i++){

        if(
          blocks[i] >= process
          &&
          blocks[i] > worst
        ){

          worst = blocks[i];

          chosen = i;
        }
      }
    }



    // ALLOCATED
    if(chosen !== -1){

      const remaining =
        blocks[chosen] - process;

      totalInternal += remaining;



      allocatedBlocks.push({

        process:index+1,

        block:chosen+1,

        freed:false

      });



      output.innerHTML += `

        <div class="success">

          ✅ Process P${index+1}
          (${process}KB)

          allocated to

          Block B${chosen+1}

          <br><br>

          Remaining Memory:
          ${remaining}KB

          <br><br>

          Internal Fragmentation:
          ${remaining}KB

        </div>

      `;



      blocks[chosen] -= process;

    }



    // NOT ALLOCATED
    else{

      output.innerHTML += `

        <div class="fault">

          ❌ Process P${index+1}
          (${process}KB)

          cannot be allocated

        </div>

      `;
    }

  });



  // EXTERNAL FRAGMENTATION

  let external =
    blocks.reduce(
      (sum,val)=>sum+val,
      0
    );



  output.innerHTML += `

    <div class="resultBox">

      <h2>
        Fragmentation Analysis
      </h2>

      <p>

        Total Internal Fragmentation:
        ${totalInternal}KB

      </p>

      <p>

        Total External Fragmentation:
        ${external}KB

      </p>

    </div>

  `;

}
function deallocateMemory(){

  let output =
    document.getElementById("output");



  if(allocatedBlocks.length === 0){

    alert("No allocated processes");

    return;
  }



  output.innerHTML += `

    <div class="resultBox">

      <h2>
        Deallocation
      </h2>

  `;



  allocatedBlocks.forEach(item => {

    if(!item.freed){

      output.innerHTML += `

        <p>

          ✅ Process P${item.process}

          removed from

          Block B${item.block}

        </p>

      `;

      item.freed = true;

    }

  });



  output.innerHTML += `

      <h3>

        Memory successfully freed

      </h3>

    </div>

  `;
}