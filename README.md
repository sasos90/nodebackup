# nodebackup
Create backup files with node.js application

To start the app:
1. Install packages: npm install
2. Install ruby
3. Install compass (gem install compass)
4. Run grunt watch: 'grunt watch' to autocompile the scss files on change.
5. Run the server:
 - Linux: DEBUG=nodebackup:* npm start OR node_modules/nodemon/bin/nodemon.js (that's needed for autorestart of the server on file change)
 - Windows: set DEBUG=nodebackup:* & npm start OR node_modules/nodemon/bin/nodemon.js (need to test this)
