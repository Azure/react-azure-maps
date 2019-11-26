// This piece of code contains some minor bugs.
// How can you make it better and more readable?
// You can edit the code.

// For every server that has `alertsCount` greater than 100 send the alarm request.
// Sending the next request should happen ONLY after the previous one is completed.
// While sending requests is in progress we should print how many of them has been completed every second.

successCount = 0

function handleAlarms(serversList) {
  let bs = new Array() // badServers

  for (let i = 0; i < serversList.length; i++) {
    if (serversList[i]['alertsCount'] > 100) {
      bs.push(serversList[i])
    }
  }

  setInterval(function() {
    console.log('Completed ' + successCount + ' of ' + bs.length)
  }, 1000)

  bs.forEach(server => {
    fetch('http://example.com/alarm/' + server.id).then(response => {
      if (response.status == 200) {
        successCount++
      }
    })
  })

  console.log(`-- Completed ALL --`)
}
