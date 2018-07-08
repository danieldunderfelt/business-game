import * as faker from 'faker'
const delay = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))

async function eventLoop(gameStore) {
  async function* events() {
    let i = 0
    const max = faker.random.number({ min: 5, max: 50 })

    while (i < max) {
      yield async function doEvent() {
        await delay(faker.random.number({ min: 0.1, max: 1 }))
        console.log('Do event!')
      }
      i++
    }
  }

  for await (const event of events()) {
    await event()
  }
}

export default eventLoop
