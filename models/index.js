'use strict';
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://postgres:postgres@localhost:5432/wikistack', {
    logging: true
});


var Page = db.define('page', {
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    urltitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'open'
    }
}, {
    getterMethods: {
        route: function() { return `/wiki/${this.urltitle}` }
    },
    hooks: {
        beforeValidate: function(page) {
            page.urltitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
        }
    }
});


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    Page: Page,
    User: User
};