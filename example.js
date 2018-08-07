const Butter = require("./index")
const br = new Butter({ debug: false })

br.ping()
br.getCurrentTab().then(result => console.log("Current tab:", result))

async function list() {
    const { list } = await br.getCurrentList("2")
    return console.log(list[0].title)
}
list()