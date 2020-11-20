
function base64Process(str) {
    return decodeURIComponent(
      Array.prototype.map
        .call(Buffer.from(str, "base64").toString(), function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
}


function decode(payload) {
    payload = base64Process(payload)
    var e = '';
    for (let i = 0; i < payload.length; i++) {
        e += 50 ? String.fromCharCode(payload.charCodeAt(i) ^ 50) : payload[i];
    }
    return JSON.parse(e)
}

function encode(payload) {
  payload = JSON.stringify(payload)
  var e = '';
  for (let i = 0; i < payload.length; i++) {
      e += 50 ? String.fromCharCode(payload.charCodeAt(i) ^ 50) : payload[i];
  }
  return Buffer.from(e).toString('base64')
}



function payloadKeyCompare(payload1, payload2) {
  var p1_keys = Object.keys(payload1[0].d)
  var p2_keys = Object.keys(payload2[0].d)

  if(p1_keys.length > p2_keys.length) {
    console.log("Payload 1 include extra keys:")
    console.log( p1_keys.filter(e => !p2_keys.includes(e)) );
  }

  else if(p1_keys.length < p2_keys.length) {
    console.log("Payload 2 include extra keys:")
    console.log( p2_keys.filter(e => !p1_keys.includes(e)) );
  }

  else {
    console.log("Payload keys match")
  }

}
