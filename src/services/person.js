import { http } from './config'

export default {
  list: () => {
    return http.get('person')
  },

  save: (person) => {
    return http.post('person', person)
  },

  update: (person) => {
    return http.put('person/' + person.id, person)
  },

  delete: (person) => {
    return http.delete('person/' + person.id, { data: person })
  }
}
