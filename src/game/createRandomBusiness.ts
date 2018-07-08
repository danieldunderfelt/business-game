import * as faker from 'faker'

const createRandomBusiness = () => {
  return {
    name: faker.fake('{{ company.companyName }} {{ company.companySuffix }}'),
    location: faker.fake('{{ address.city }}, {{ address.country }}'),
  }
}

export default createRandomBusiness
