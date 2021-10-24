var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
   height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var div = d3.select(".body").append("div")
     .attr("class", "tooltip-donut")
    .style("opacity", 0);
    
const svg = d3.select("body").append("svg").attr("height", height).attr("width", width);


const projection = d3.geoAlbers().center([4, 64.9]).rotate([-10.4, 0]).parallels([50, 60]).scale(4000).translate([width / 2, height / 2]);
const path = d3.geoPath(projection)

d3.json("/data/map.topojson").then(kart => {
    var fylker = topojson.feature(kart, kart.objects.collection);
    console.log(fylker)
    const g = svg.append("g");
    g.selectAll("path").data(fylker.features).enter().append("path").attr("class", "fylke").attr("d", path)
        .on("mouseover", function (d) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.5')
                .attr("class", "hoverfylker");
                div.transition()
                .duration(50)
                .style("opacity", 1);
            d3.select(".content")
            .text(properties.navn)
        }).on('mouseout', function () {
            d3.select(".content")
            .text("")
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1')
                .attr("class", "fylke");
                
        })
})