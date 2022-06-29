//Install express server
const express = require('express') ;
const path = require('path') ;


const app = express();
app.use(express.static('./dist/soft-chaos'));

app.get('/*', (req, res) => {
res.sendFile('index.html', {root: 'dist/soft-chaos/'})
})

// Start the app by listening on the default Heroku
app.listen(process.env.PORT || 8080);