How to run project:

Type this from root folder:

- npm run client-install
- npm install
- npm run dev



Frontend is running on port: 4000
Backend is running on port: 3000


If u change backend port to another port please gp into webpack.config.js, find this code:

proxy: {
      "/api/*": {
        target: "http://localhost:3000/",
        secure: "true"
      }
    },


    Change 3000 to the port you prefer the backend to run on.


Heroku link:
[https://secret-plains-22057.herokuapp.com/](https://secret-plains-22057.herokuapp.com/)