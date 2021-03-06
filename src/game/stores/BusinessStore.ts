import * as faker from 'faker'
import { BusinessData } from '../../shared/types/Business'
import { GameLoopCallable } from '../types/GameLoopCallable'
import { get } from 'lodash'
import runBusinessActions from '../actions/runBusinessActions'

function createBusiness(): BusinessData {
  const business = {
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    founded: 0,
    employees: [],
    funds: faker.random.number(100000),
  }

  return business
}

const BusinessStore = (): GameLoopCallable => {
  function init() {
    const businesses = []
    const max = 50 // faker.random.number({ min: 5, max: 50 })

    while (businesses.length < max) {
      businesses.push(createBusiness())
    }

    return {
      businesses,
    }
  }

  function run(state) {
    return {
      businesses: runBusinessActions(state),
    }
  }

  return {
    run,
    init,
  }
}

export default BusinessStore
