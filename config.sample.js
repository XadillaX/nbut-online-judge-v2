/**
 * Created by XadillaX on 2015/3/29.
 */
module.exports = {
    dev: true,
    session: {
        secret: "#(@&*$(*@#&(@*&(@*faksjdh"
    },
    database: {
        host: "127.0.0.1",
        port: 3306,
        database: "onlinejudge",
        username: "root",
        password: "deathmoon"
    },

    memcached: {
        servers: [ "localhost:11211" ],
        options: {}
    },

    renderData: {
        title: "宁波工程学院在线评测幻想乡"
    },

    riak: {
        prefix: "onlinejudge.",
        nodes: [{
            host: "localhost",
            port: 8087
        }]
    }
};
