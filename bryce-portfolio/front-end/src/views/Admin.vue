<template>
<div class="admin page">
  <h1>The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Add a Project</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <p></p>
      <textarea id="objectiveBox" v-model="objective" placeholder="Objective">Description</textarea>
      <p></p>
      <textarea id="technicalBox" v-model="technicals" placeholder="Technical Description">Description</textarea>
      <p></p>
      <textarea id="resultBox" v-model="results" placeholder="Results">Description</textarea>
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addProject">
      <h2>{{addProject.title}} has been added</h2>
    </div>
  </div>
  <div class="heading">
    <div class="circle">2</div>
    <h2>Edit/Delete a Project</h2>
  </div>
  <div class="row edit">
    <div class="col form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectProject(s)">
        {{s.title}}
        </div>
      </div>
    </div>
    <div class="col upload" v-if="findProject">
      <p>Title</p>
      <input v-model="findProject.title">
      <p></p>
      <p>Objective</p>
      <textarea v-model="findProject.objective"></textarea>
      <p>Technical Description</p>
      <textarea v-model="findProject.technicals"></textarea>
      <p>Results</p>
      <textarea v-model="findProject.results"></textarea>
      <p>Additonal Photo</p>
      <input type="file" name="photo" @change="fileChanged">
      <br>
      <br>
    </div>
    <div class="col actions" v-if="findProject">
      <br><br>
      <button @click="deleteProject(findProject)">Delete</button>
      <br><br>
      <p></p>
      <button @click="editProject(findProject)">Edit</button>
      <br><br>
      <p></p>
      <button @click="addPhoto(findProject)">Add Photo</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      objective: "",
      technicals: "",
      results: "",
      file: null,
      addProject: null,
      projects: [],
      findTitle: "",
      findProject: null,
    }
  },
  computed: {
    suggestions() {
      let projects = this.projects.filter(project => project.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return projects.sort((a, b) => a.title > b.title);
    },
    user() {
      return this.$root.$data.user;
    }
  },
  created() {
    this.getProjects();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/projects', {
          title: this.title,
          paths: [r1.data.path],
          objective: this.objective,
          technicals: this.technicals,
          results: this.results,
          });
          this.addProject = r2.data;
        } catch (error) {
          console.log(error);
        }
    },
    async addPhoto(project) {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let newPath = [r1.data.path];
        let newPaths = this.findProject.paths.concat(newPath);
        console.log(this.findProject.paths);
        console.log(newPaths);
        await axios.put("/api/projects/" + project._id, {
          title: this.findProject.title,
          paths: newPaths,
          objective: this.findProject.objective,
          technicals: this.findProject.technicals,
          results: this.findProject.results
        });
        this.findProject = null;
        this.getProjects();
        return true;
        } catch (error) {
          console.log(error);
        }
    },
    async getProjects() {
      try {
        let response = await axios.get("/api/projects");
        this.projects = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectProject(project) {
      this.findTitle = "";
      this.findProject = project;
    },
    async deleteProject(project) {
      try {
        await axios.delete("/api/projects/" + project._id);
        this.findProject = null;
        this.getProjects();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editProject(project) {
      try {
        await axios.put("/api/projects/" + project._id, {
          title: this.findProject.title,
          paths: this.findProject.paths,
          objective: this.findProject.objective,
          technicals: this.findProject.technicals,
          results: this.findProject.results
        });
        this.findProject = null;
        this.getProjects();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
/* Suggestions */
.page {
  height: 100vh;
  padding: 1em;
}
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 2em;
  height: 2em;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}
textarea{
  font-family: 'Montserrat', sans-serif;
  width: 100%;
}
.form {
  margin-left: 1em;
  margin-right: 50px;
  width: 100%;
}
.actions{

}
/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>
