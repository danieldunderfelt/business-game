import * as faker from 'faker'

const runBusinessActions = state => {
  state.businesses.forEach(biz => {
    biz.funds = biz.funds + faker.random.number({ min: -100, max: 100 })
  })

  return state.businesses
}

export default runBusinessActions
