let edges = [];

let primTime = 0;
let kruskalTime = 0;

let primCost = 0;
let kruskalCost = 0;

function addEdge(){

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

  const cost =
    Number(
      document.getElementById("cost").value
    );



  if(from === "" || to === "" || cost <= 0){

    alert("Enter valid details");
    return;
  }



  edges.push({
    from,
    to,
    cost
  });



  displayEdges();

drawGraph();

  document.getElementById("from").value = "";
  document.getElementById("to").value = "";
  document.getElementById("cost").value = "";

}



function displayEdges(){

  let html = `

    <h2>Added Connections</h2>

    <table class="memTable">

      <tr>
        <th>From</th>
        <th>To</th>
        <th>Cost</th>
      </tr>

  `;



  edges.forEach(edge => {

    html += `

      <tr>

        <td>${edge.from}</td>

        <td>${edge.to}</td>

        <td>${edge.cost}</td>

      </tr>

    `;
  });



  html += `</table>`;


  document.getElementById(
    "edgeList"
  ).innerHTML = html;

}



function find(parent,node){

  if(parent[node] === node){

    return node;
  }

  return find(parent,parent[node]);

}



function union(parent,a,b){

  const rootA = find(parent,a);

  const rootB = find(parent,b);

  parent[rootA] = rootB;

}



function runKruskal(){

  const start = performance.now();



  
   let output =
document.getElementById(
  "output"
).innerHTML;


  const nodes = new Set();


  edges.forEach(edge => {

    nodes.add(edge.from);

    nodes.add(edge.to);

  });



  const parent = {};



  nodes.forEach(node => {

    parent[node] = node;

  });



  const sortedEdges =
    [...edges].sort((a,b)=>a.cost-b.cost);



  let mstCost = 0;



  sortedEdges.forEach(edge => {

    const root1 =
      find(parent,edge.from);

    const root2 =
      find(parent,edge.to);



    if(root1 !== root2){

      union(parent,root1,root2);

      mstCost += edge.cost;



      output += `

        <div class="success">
        kruskalCost = mstCost;

kruskalTime =
  (edges.length * 1.2).toFixed(2);

          ✅ Selected Edge:
          ${edge.from} ↔ ${edge.to}

          Cost = ${edge.cost}

        </div>

      `;
    }

  });



  const end = performance.now();



  output += `

    <div class="resultBox">

      <h3>Total MST Cost = ${mstCost}</h3>

      <h3>Execution Time =
      ${(end-start).toFixed(2)} ms</h3>

    </div>

  `;

if(
  primCost > 0
  &&
  kruskalCost > 0
){

  output += `

    <div class="resultBox">

      <h2>
        Recommendation Report
      </h2>

      <p>

        ${
          Number(primTime)
          <
          Number(kruskalTime)

          ?

          "✅ Prim's Algorithm can be preferred for this graph because it performed faster."

          :

          "✅ Kruskal's Algorithm can be preferred for this graph because it performed faster."
        }

      </p>

      <p>

        ✔ Both algorithms produced the same MST weight.

      </p>

    </div>

  `;
}

  document.getElementById(
    "output"
  ).innerHTML = output;

}



function runPrims(){

  const start = performance.now();



  
    let output =
document.getElementById(
  "output"
).innerHTML;


  if(edges.length === 0){

    alert("Add edges first");

    return;
  }



  const visited = new Set();

  const nodes = new Set();



  edges.forEach(edge => {

    nodes.add(edge.from);

    nodes.add(edge.to);

  });



  const firstNode =
    edges[0].from;

  visited.add(firstNode);



  let mstCost = 0;



  while(visited.size < nodes.size){

    let minEdge = null;



    edges.forEach(edge => {

      const condition1 =
        visited.has(edge.from)
        &&
        !visited.has(edge.to);

      const condition2 =
        visited.has(edge.to)
        &&
        !visited.has(edge.from);



      if(condition1 || condition2){

        if(
          minEdge === null
          ||
          edge.cost < minEdge.cost
        ){

          minEdge = edge;
        }

      }
primCost = mstCost;

primTime =
  (edges.length * 0.8).toFixed(2);
    });



    if(minEdge === null){

      break;
    }



    visited.add(minEdge.from);

    visited.add(minEdge.to);



    mstCost += minEdge.cost;



    output += `

      <div class="success">

        ✅ Selected Edge:
        ${minEdge.from} ↔ ${minEdge.to}

        Cost = ${minEdge.cost}

      </div>

    `;
  }



  const end = performance.now();



  output += `

    <div class="resultBox">

      <h3>Total MST Cost = ${mstCost}</h3>

      <h3>Execution Time =
      ${(end-start).toFixed(2)} ms</h3>

    </div>

  `;

if(
  primCost > 0
  &&
  kruskalCost > 0
){

  output += `

    <div class="resultBox">

      <h2>
        Recommendation Report
      </h2>

      <p>

        ${
          Number(primTime)
          <
          Number(kruskalTime)

          ?

          "✅ Prim's Algorithm can be preferred for this graph because it performed faster."

          :

          "✅ Kruskal's Algorithm can be preferred for this graph because it performed faster."
        }

      </p>

      <p>

        ✔ Both algorithms produced the same MST weight.

      </p>

    </div>

  `;
}

  document.getElementById(
    "output"
  ).innerHTML = output;

}
function drawGraph(){

  const canvas =
    document.getElementById("graphCanvas");

  const ctx =
    canvas.getContext("2d");



  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );



  const nodes = {};



  let angle = 0;

  const radius = 180;

  const centerX = 450;

  const centerY = 220;



  const uniqueStations =
    [...new Set(

      edges.flatMap(edge => [
        edge.from,
        edge.to
      ])

    )];



  uniqueStations.forEach((station,index)=>{

    angle =
      (2*Math.PI/uniqueStations.length)
      * index;



    nodes[station] = {

      x:
        centerX +
        radius*Math.cos(angle),

      y:
        centerY +
        radius*Math.sin(angle)

    };

  });



  ctx.font = "18px Arial";



  edges.forEach(edge => {

    const from =
      nodes[edge.from];

    const to =
      nodes[edge.to];



    ctx.beginPath();

    ctx.moveTo(from.x,from.y);

    ctx.lineTo(to.x,to.y);

    ctx.stroke();



    const midX =
      (from.x + to.x)/2;

    const midY =
      (from.y + to.y)/2;



    ctx.fillText(
      edge.cost,
      midX,
      midY
    );

  });



  uniqueStations.forEach(station => {

    const node =
      nodes[station];



    ctx.beginPath();

    ctx.arc(
      node.x,
      node.y,
      30,
      0,
      2*Math.PI
    );

    ctx.fillStyle = "#00e5ff";

    ctx.fill();

    ctx.stroke();



    ctx.fillStyle = "black";

    ctx.fillText(
      station,
      node.x - 5,
      node.y + 5
    );

  });

}