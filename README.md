# nodebackup
Create backup files with node.js application

To start the app:
1. Install packages: npm install
2. Install ruby
3. Install compass (gem install compass)
4. Run 'grunt' command first to generate the folders properly.
5. Run grunt watch: 'grunt watch' to autocompile the scss files on change. OR 6.
6. Install nodemon npm package for server auto-restart. "npm install -g nodemon"
7. Run the server:
 - Linux: DEBUG=nodebackup:* npm start OR node_modules/nodemon/bin/nodemon.js (that's needed for autorestart of the server on file change)
 - Windows: set DEBUG=nodebackup:* & npm start OR node_modules/nodemon/bin/nodemon.js (need to test this)
