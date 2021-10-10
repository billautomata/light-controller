const _ = require('underscore')

module.exports = { getMACAddress }

function getMACAddress () {
  const i = require('os').networkInterfaces()
  const p = _.flatten(Object.values(i))
  return p.filter(o=>o.address.indexOf('192.168') !== -1)[0].mac
}