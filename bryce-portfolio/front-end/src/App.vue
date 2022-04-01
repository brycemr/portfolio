<template>
  <div id="app">
  <div class="container-fluid" id="menu">
    <div class="row align-items-center">
      <div class="col-3" id="brand">
        <router-link to="/">
          Bryce Richard's Portfolio
        </router-link>
      </div>
      <div class="col">
        <div class="row align-items-center" id="menu-item">
          <div class="col" id="link1">
            <router-link to="/projects">PROJECTS</router-link>
          </div>
          <div class="col" id="link2">
           <router-link to="/about">ABOUT ME</router-link>
          </div>
          <div class="col">
            385-233-7360<br>
            brycerichard26@gmail.com <br>
          </div>
        </div>
      </div>
    </div>
  </div>
    <router-view/>
    <div class="row" id="footer">
      <div class="col">
        <a href="https://github.com/brycemr/portfolio/tree/master/bryce-portfolio">My Website's Github</a>
      </div>
      <div class="col">
        <router-link to="/admin">Admin Page</router-link>
      </div>
    </div>
  </div>
</template>

<style>
html, body{
  margin: 0;
  min-height: 100vh;
  background: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d8f0ee;
  background: #010426;
}

.signIn p{
  justify-content: center;
  text-align: center;
  margin: 0;
}

#menu {
  background-color: #111422;
  margin: 0;
  padding-bottom: 1em;
  width: 100%;
}

.bg-light{
  background-color: #edeaea;
}
#menu a {
  color: #03989e;
}

#spacer{
	padding:  2em 0em 2em 0em;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 5em;
}
.icon{
  height: 3em;
}
#link1 {
  grid-area: link1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  margin: 0.5em;
}

#link2 {
  grid-area: link2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
}

#link3 {
  grid-area: link3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
}

#signIn {
  grid-area: signIn;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0;
}

.box {
  border: 3px solid black;
}
#footer{
  background-color: #2e2e33;
  padding: 1em;
  margin: 0;
  width: 100%;
}
button {
  background-color: #2c3e50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  test-decoration: none;
  display: inline-block;
}
#button {
  background-color: #2c3e50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  test-decoration: none;
  display: inline-block;
}
</style>
