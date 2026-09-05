(() => {
  "use strict";
  const data = window.HIPHOP_MAP_DATA;
  const svg = document.getElementById("graph");
  const edgeLayer = document.getElementById("edges");
  const nodeLayer = document.getElementById("nodes");
  const details = document.getElementById("details");
  const defaultDetails = details.innerHTML;
  const filters = document.getElementById("filters");
  const ns = "http://www.w3.org/2000/svg";
  const nodeById = new Map(data.nodes.map(node => [node.id,node]));
  const neighbors = new Map(data.nodes.map(node => [node.id,new Set()]));
  let view = {x:0,y:0,w:1800,h:1050};
  let selected = null;
  let dragging = false;
  let start = null;

  const setView = () => svg.setAttribute("viewBox",`${view.x} ${view.y} ${view.w} ${view.h}`);
  setView();

  data.edges.forEach((edge,index) => {
    const source = nodeById.get(edge.source), target = nodeById.get(edge.target);
    neighbors.get(edge.source).add(edge.target); neighbors.get(edge.target).add(edge.source);
    const line = document.createElementNS(ns,"line");
    line.setAttribute("x1",source.x); line.setAttribute("y1",source.y); line.setAttribute("x2",target.x); line.setAttribute("y2",target.y);
    line.classList.add("edge"); line.dataset.source=edge.source; line.dataset.target=edge.target; line.id=`edge-${index}`;
    edgeLayer.appendChild(line);
  });

  data.nodes.forEach(node => {
    const group = document.createElementNS(ns,"g");
    group.classList.add("node",node.group); group.dataset.id=node.id; group.setAttribute("transform",`translate(${node.x} ${node.y})`); group.setAttribute("tabindex","0"); group.setAttribute("role","button"); group.setAttribute("aria-label",node.label);
    const circle = document.createElementNS(ns,"circle"); circle.setAttribute("r",node.group === "era" ? 9 : 7);
    const label = document.createElementNS(ns,"text"); label.setAttribute("x",node.group === "era" ? 15 : 12); label.setAttribute("y","4"); label.textContent=node.label;
    group.append(circle,label); nodeLayer.appendChild(group);
    group.addEventListener("click",event => {event.stopPropagation(); selectNode(node.id);});
    group.addEventListener("keydown",event => {if(event.key === "Enter" || event.key === " "){event.preventDefault();selectNode(node.id);}});
  });

  const groupLabels = {era:"historical blocks",scene:"scenes",production:"production grammars",practice:"MC and social practices",circulation:"circulation systems",context:"routes beyond this edition"};
  Object.entries(groupLabels).forEach(([group,label]) => {
    const wrapper=document.createElement("label"), input=document.createElement("input"); input.type="checkbox"; input.checked=true; input.value=group;
    input.addEventListener("change",applyVisibility); wrapper.append(input,document.createTextNode(` ${label}`)); filters.appendChild(wrapper);
  });

  function applyVisibility(){
    const active=new Set([...filters.querySelectorAll("input:checked")].map(input=>input.value));
    document.querySelectorAll(".node").forEach(element=>element.classList.toggle("hidden",!active.has(nodeById.get(element.dataset.id).group)));
    document.querySelectorAll(".edge").forEach(element=>element.classList.toggle("hidden",!active.has(nodeById.get(element.dataset.source).group)||!active.has(nodeById.get(element.dataset.target).group)));
    selected=null; clearFocus(); fitVisible();
  }

  function selectNode(id){
    selected=id; const adjacent=neighbors.get(id);
    document.querySelectorAll(".node").forEach(element=>{const nodeId=element.dataset.id;element.classList.toggle("selected",nodeId===id);element.classList.toggle("dim",nodeId!==id&&!adjacent.has(nodeId));});
    document.querySelectorAll(".edge").forEach(element=>{const active=element.dataset.source===id||element.dataset.target===id;element.classList.toggle("active",active);element.classList.toggle("dim",!active);});
    const node=nodeById.get(id);
    details.innerHTML=`<div class="kind">${groupLabels[node.group]}</div><h2>${escapeHtml(node.label)}</h2><p>${escapeHtml(node.description)}</p><h3>Guide examples</h3><ul>${node.examples.map(example=>`<li><a href="${encodeURI(example.href)}">${escapeHtml(example.label)}</a></li>`).join("")}</ul><p><button id="clear-selection" type="button">Clear selection</button></p>`;
    document.getElementById("clear-selection").addEventListener("click",clearFocus);
  }

  function clearFocus(){selected=null;document.querySelectorAll(".dim,.selected,.active").forEach(element=>element.classList.remove("dim","selected","active"));details.innerHTML=defaultDetails;}
  function escapeHtml(value){const span=document.createElement("span");span.textContent=value;return span.innerHTML;}
  function fitVisible(){
    const visible=data.nodes.filter(node=>!nodeLayer.querySelector(`[data-id="${CSS.escape(node.id)}"]`).classList.contains("hidden"));
    if(!visible.length)return;
    const minX=Math.min(...visible.map(node=>node.x))-120,maxX=Math.max(...visible.map(node=>node.x))+250,minY=Math.min(...visible.map(node=>node.y))-70,maxY=Math.max(...visible.map(node=>node.y))+70;
    view={x:minX,y:minY,w:Math.max(maxX-minX,500),h:Math.max(maxY-minY,350)};setView();
  }
  function zoom(factor,cx=view.x+view.w/2,cy=view.y+view.h/2){const newW=Math.min(3600,Math.max(320,view.w*factor)),newH=newW*(svg.clientHeight/svg.clientWidth);view={x:cx-(cx-view.x)*(newW/view.w),y:cy-(cy-view.y)*(newH/view.h),w:newW,h:newH};setView();}
  svg.addEventListener("wheel",event=>{event.preventDefault();const rect=svg.getBoundingClientRect(),cx=view.x+(event.clientX-rect.left)/rect.width*view.w,cy=view.y+(event.clientY-rect.top)/rect.height*view.h;zoom(event.deltaY>0?1.12:.89,cx,cy);},{passive:false});
  svg.addEventListener("pointerdown",event=>{if(event.target.closest(".node"))return;dragging=true;start={x:event.clientX,y:event.clientY,view:{...view}};svg.setPointerCapture(event.pointerId);});
  svg.addEventListener("pointermove",event=>{if(!dragging)return;const rect=svg.getBoundingClientRect();view.x=start.view.x-(event.clientX-start.x)/rect.width*start.view.w;view.y=start.view.y-(event.clientY-start.y)/rect.height*start.view.h;setView();});
  svg.addEventListener("pointerup",()=>{dragging=false;});
  svg.addEventListener("click",event=>{if(event.target===svg||event.target.id==="viewport")clearFocus();});
  document.getElementById("fit").addEventListener("click",fitVisible);
  document.getElementById("reset").addEventListener("click",()=>{filters.querySelectorAll("input").forEach(input=>input.checked=true);applyVisibility();});
  document.getElementById("zoom-in").addEventListener("click",()=>zoom(.82));
  document.getElementById("zoom-out").addEventListener("click",()=>zoom(1.22));
  document.addEventListener("keydown",event=>{if(event.key==="Escape")clearFocus();});
  fitVisible();
})();
