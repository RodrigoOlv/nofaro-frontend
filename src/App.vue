<template>
  <div id="app" class="md-layout">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div class="container">
      <header>
        <span class="h1 text-danger fa fa-group "></span>
        <h1 class="text-danger">PEOPLE</h1>
      </header>

      <div class="row justify-content-between">
        <div class="col-md-4">
          <h2 class="text-danger">Lista de pessoas</h2>
        </div>
        <div class="col-md-2 offset-md-6">
          <button
            class="btn btn-danger"
            @click="addPeople()"
          >
            <span class="fa fa-plus"> Adicionar Perfil</span>
          </button>
        </div>
      </div>

      <form
        @submit.prevent="save"
        v-if="this.showForm"
      >
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

        <button
          class="btn btn-danger"
          @click="hideForm()"
        >
          Salvar <span class="fa fa-send"></span>
        </button>
      </form>

      <div class="border border-danger rounded rounded-lg">
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
              <button
                class="btn text-danger fa fa-trash"
                @click="remove(person)"
              ></button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import Person from './services/person'

export default {

  data() {
    return {
      person: {
        id: '',
        name: '',
        email: ''
      },

      people: [],
      errors: [],

      showForm: Boolean = false
    }
  },
  
  mounted () {
    this.list()
  },

  methods:{
    list() {
      Person.list().then(response => {
        // this.people = response.data
        // this.people.sort((t1, t2) => {
        //   t1 === t1.name.charAt(0).toUpperCase() + t1.name.slice(1)
        //   t2 === t2.name.charAt(0).toUpperCase() + t2.name.slice(1)
        //   t1 < t2 ? -1 : 1
        // })
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
    },

    remove(person) {

      if(confirm('Tem certeza que você deseja excluir esse perfil?')) {

        Person.delete(person).then(response => {
          this.list();
          this.errors = []
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
      
    },
    
    addPeople() {
      this.showForm = true
    },

    hideForm() {
      this.showForm = false
    }
  }

}

</script>

<style scoped>

  body {
    font-family: Helvetica, Arial, sans-serif
  }

  header {
    margin: 15px auto;
    text-align: center;
  }

  form {
    margin: 20px auto;
  }

  div.border {
    margin: 30px auto;
  }

  table {
    margin: 30px;
  }

</style>
