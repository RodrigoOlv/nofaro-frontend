<template>
  <div id="app" class="md-layout">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div class="container">
      <div class="d-flex flex-column justify-content-center">
        <span class="lg fa fa-group "></span>
        <h1 class="text-danger">PEOPLE</h1>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <h2 class="text-danger">Lista de pessoas</h2>
        </div>
        <div class="col-lg-6">
          <button class="btn btn-danger"><span class="fa fa-plus"> Adicionar Perfil</span></button>
        </div>
      </div>

      <table class="table table-striped table-borderless table-sm">
        <tr v-for="person of people" :key="person.id">
          <td>
            {{person.name}}
          </td>
          <td>
            {{person.email}}
          </td>
          <td>
            <button class="btn btn-outline-danger">
              <span class="fa fa-edit"></span>
            </button>
          </td>
          <td>
            <button class="btn btn-outline-danger">
              <span class="fa fa-trash"></span>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import Person from './services/person'

export default {

  data() {
    return {
      people: []
    }
  },
  
  mounted () {
    Person.list().then(response => {
      // console.log(response.data)
      this.people = response.data
    })
  }

}

</script>

<style scoped>

  .list {
    margin: 20px auto;
  }

</style>
