//window dimensions
var width = 800;
    height = 600;

var links = [
  {source: 'node1', target: 'node2'},
  {source: 'node1', target: 'node3'},
  {source: 'node2', target: 'node4'},
  {source: 'node2', target: 'node5'},
  {source: 'node3', target: 'node6'},
  {source: 'node3', target: 'node7'},
  {source: 'node4', target: 'node8'},
  {source: 'node4', target: 'node9'},
  {source: 'node5', target: 'node10'},
  {source: 'node5', target: 'node11'},
  {source: 'node6', target: 'node12'},
  {source: 'node6', target: 'node13'},
  {source: 'node7', target: 'node14'},
  {source: 'node7', target: 'node15'}
]

var nodes ={};

// parse links to nodes
links.forEach(function(link){
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

//add svg container
// place to draw
var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);


var force = d3.layout.force()
    .size([width, height])
    .nodes(d3.values(nodes))
    .links(links)
    .on("tick", tick)
    .linkDistance(300)
    .start();

// add nodes and links to the visualization
var link = svg.selectAll('.link')
  .data(links)
  .enter().append('line')
  .attr('class', 'link');

var node = svg.selectAll('.node')
  .data(force.nodes())
  .enter().append('circle')
  .attr('class', 'node')
  .attr('r', 10); // radius

// drag around fuction
function tick(e){
  node.attr('cx', function(d) {return d.x;})
      .attr('cy', function(d) {return d.y;})
      .call(force.drag);

  link.attr('x1', function(d) {return d.source.x;})
      .attr('y1', function(d) {return d.source.y;})
      .attr('x2', function(d) {return d.source.x;})
      .attr('y2', function(d) {return d.source.y;})
}
