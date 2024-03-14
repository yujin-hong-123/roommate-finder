const server = require("./App")
const port = 3000

const listener = server.listen(port, function() {
    console.log(`Server running on port: ${port}`)
})

const close = () =>
{
    listener.close();
}

module.exports = { close: close, }