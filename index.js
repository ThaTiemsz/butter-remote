const request = require("request-promise-native")

class ButterRemote {
    constructor(options) {
        this.isConnected = true
        this.options = {
            username: "popcorn",
            password: "popcorn",
            ip: "127.0.0.1",
            port: "8008",
            debug: false
        }
        this.init(options)
    }

    init(options) {
        options = Object.assign(this.options, options)
        this.ping()
    }

    call(method, params) {
        return new Promise(async(resolve, reject) => {
            const res = await request({
                method: "POST",
                uri: `http://${this.options.ip}:${this.options.port}`,
                headers: {
                    "Authorization": Buffer.from(`${this.options.username}:${this.options.password}`).toString("base64"),
                    "Accept": "application/json"
                },
                body: {
                    id: Math.floor((Math.random()*100)+1),
                    jsonrpc: "2.0",
                    method,
                    params: params ? params : []
                },
                timeout: 3000,
                json: true,
                resolveWithFullResponse: true
            })

            if (res.statusCode === 200) {
                const data = res.body.result ? res.body.result : res.body
                this.handleData(data, method)
                return resolve(data)
            } else {
                this.log("Connection timed out: cannot reach Butter.")
                this.isConnected = false
                return reject()
            }
        })
    }

    handleData(data, method) {
        if (method === "ping") {
            if (data.error !== undefined) {
                this.log("Invalid login: check username and password.")
                this.isConnected = false
            }
        }
        this.log(data)
    }

    log(message) {
        if (this.options.debug === true)
            console.log(message)
    }

    ping() {
        return this.call("ping", false)
    }

    enter() {
        return this.call("enter")
    }

    back() {
        return this.call("back")
    }

    up() {
        return this.call("up")
    }

    down() {
        return this.call("down")
    }

    left() {
        return this.call("left")
    }

    right() {
        return this.call("right")
    }

    getViewStack() {
        return this.call("getviewstack", false)
    }

    getGenres() {
        return this.call("getgenres", false)
    }

    getSorters() {
        return this.call("getsorters", false)
    }

    getTypes() {
        return this.call("gettypes", false)
    }

    getCurrentTab() {
        return this.call("getcurrenttab", false)
    }

    getFullscreen() {
        return this.call("getfullscreen", false)
    }

    getPlayers() {
        return this.call("getplayers", false)
    }

    startStream(params) {
        return this.call("startstream", params)
    }

    setPlayer(params) {
        return this.call("setplayer", params)
    }

    listenNotifications() {
        return this.call("listennotifications", false)
    }

    nextSeason() {
        return this.call("nextseason")
    }

    previousSeason() {
        return this.call("previousseason")
    }

    selectEpisode(params) {
        return this.call("selectepisode", params)
    }

    toggleQuality() {
        return this.call("togglequality")
    }

    watchTrailer() {
        return this.call("watchtrailer")
    }

    getSelection(params) {
        return this.call("getselection", params ? params : false)
    }

    getCurrentList(params) {
        return this.call("getcurrentlist", params ? params : false)
    }

    getSubtitles() {
        return this.call("getsubtitles", false)
    }

    toggleMute() {
        return this.call("togglemute")
    }

    toggleFullscreen() {
        return this.call("togglefullscreen")
    }

    volume(params) {
        return this.call("volume", params ? params : false)
    }

    togglePlaying() {
        return this.call("toggleplaying")
    }

    getPlaying() {
        return this.call("getplaying", false)
    }

    seek(params) {
        return this.call("seek", params)
    }

    subtitleOffset(params) {
        return this.call("subtitleoffset", params)
    }

    setSubtitle(params) {
        return this.call("setsubtitle", params)
    }

    getStreamUrl() {
        return this.call("getstreamurl", false)
    }

    toggleTab() {
        return this.call("toggletab")
    }

    moviesList() {
        return this.call("movieslist")
    }

    showsList() {
        return this.call("showslist")
    }

    animeList() {
        return this.call("animelist")
    }

    showWatchList() {
        return this.call("showwatchlist")
    }

    showFavourites() {
        return this.call("showfavourites")
    }

    showAbout() {
        return this.call("showabout")
    }

    showSettings() {
        return this.call("showsettings")
    }

    toggleWatched() {
        return this.call("togglewatched")
    }

    toggleFavourite() {
        return this.call("togglefavourite")
    }

    clearSearch() {
        return this.call("clearsearch")
    }

    filterGenre(params) {
        return this.call("filtergenre", params)
    }

    filterSorter(params) {
        return this.call("filtersorter", params)
    }

    filterType(params) {
        return this.call("filtertype", params)
    }

    filterSearch(params) {
        return this.call("filtersearch", params)
    }

    setSelection(params) {
        return this.call("setselection", params)
    }

}

module.exports = ButterRemote