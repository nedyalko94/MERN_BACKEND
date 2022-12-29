# npm i express mongoose dotenv
# npm i --save-dev nodemon concurrently  -for running multiple port (server and project)
# npx create-react-app .   - creating react app in same folder
# rm -rf .git for removing git repository

# package.json / 
 "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "client": "npm start --prefix ../FullStackCommerceFrondEnd",
    "admin": "npm start --prefix ../FullStackAdminPanel",
    "all": "concurrently  \"npm run client\" \"npm run admin\" \"npm run dev\""
  },  


  // 
  Script for import date to DB
  