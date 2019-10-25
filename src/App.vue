<template>
  <div id="app" class="md-layout">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div class="container">
      <div class="d-flex flex-column justify-content-center">
        <span class="lg fa fa-group "></span>
        <h1 class="text-danger">PEOPLE</h1>
      </div>

      <!-- <div class="row">
        <div class="col-lg-6">
          <h2 class="text-danger">Lista de pessoas</h2>
        </div>
        <div class="col-lg-6">
          <button
            class="btn btn-danger"
          >
            <span class="fa fa-plus"> Adicionar Perfil</span>
          </button>
        </div>
      </div> -->

      <form @submit.prevent="save">
        <div class="form-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome"
            v-model="person.name"
            class="form-control"
            required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input 
            type="email"
            placeholder="Email"
            v-model="person.email"
            class="form-control"
            required>
        </div>

        <button class="btn btn-danger">
          Salvar <span class="fa fa-send"></span>
        </button>
      </form>

      <table class="table table-borderless table-striped table-sm">
        <tr v-for="person of people" :key="person.id">
          <td>
            {{person.name}}
          </td>
          <td>
            {{person.email}}
          </td>
          <td>
            <button
              class="btn text-danger fa fa-edit"
              @click="edit(person)"
            ></button>
          </td>
          <td>
            <button class="btn text-danger fa fa-trash"></button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import Person from './services/person'

var showForm = false

function addPeople() {
  this.showForm = true
}

export default {

  data() {
    return {
      person: {
        id: '',
        name: '',
        email: ''
      },

      people: [],
      errors: []
    }
  },
  
  mounted () {
    this.list()
  },

  methods:{
    list() {
      Person.list().then(response => {
        this.people = response.data
      })
    },

    save() {

      if(!this.person.id) {

        Person.save(this.person).then(response => {
          this.person = {}
          alert('Salvo com sucesso!')
          this.list()
        })
      } else {
        Person.update(this.person).then(response => {
          this.person = {}
          alert('Atualizado com sucesso!')
          this.list()
        })
      }
      
    },

    edit(person) {
      this.person = person
    }
  }

}

</script>

<style scoped>

  .list {
    margin: 20px auto;
  }

</style>
