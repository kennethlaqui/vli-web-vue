import { Server } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    // models: {
    //   user: Model,
    // },

    // seeds(server) {
    //   server.create('user', { name: 'Bob' })
    //   server.create('user', { name: 'Alice' })
    // },

    routes () {
      this.namespace = 'storage'

      this.post('/primekey', (schema, request) => {
        let primekey = JSON.parse(request.requestBody).data
        return schema.db.storage.insert(primekey)
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
      // this.get('/users', schema => {
      //   return schema.users.all()
      // })
    }
  })

  return server
}
