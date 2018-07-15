const timer = function(fn, delay) {
  const requestAnimFrame = window.requestAnimationFrame
  let start = new Date().getTime()
  const handle = { value: 0 }

  function loop() {
    const current = new Date().getTime()
    const delta = current - start

    if (delta >= delay) {
      fn()
      start = new Date().getTime()
    }

    // @ts-ignore
    handle.value = requestAnimFrame(loop)
  }

  loop()

  return handle
}

export default timer
