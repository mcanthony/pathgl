function parse (str, stroke) {
  var buffer = [], lb = this.buffer, pb = this.posBuffer, indices = this.indices, count = lb.count
    , pos = [xScale(0), yScale(0)], l = indices.length, i = 0

  str.match(/[a-z][^a-z]*/ig).forEach(function (segment, i, match) {
    var points = segment.slice(1).trim().split(/,| /g), c = segment[0].toLowerCase(), j = 0

    while(j < points.length) {
      var x = xScale(points[j++]), y = yScale(points[j++])
      c == 'm' ? pos = [x, y] :
        c == 'l' ? buffer.push(pos[0], pos[1], x, y) && (pos = [x, y]) :
        c == 'z' ? '' :
        console.log('malformed path:' + c)
    }
  })

  indices.forEach(function (d, i) {
    pb[3 * lb[d] + d % 3] = i < buffer.length && buffer[i]
  })

  while(indices.length < buffer.length) indices.push(lb.count + ++i)
  if (indices.length > buffer.length) indices.length = buffer.length

  lb.count += buffer.length - l
}
