'use strict';
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://postgres:postgres@localhost:5432/wikistack', {
    logging: true
});

// function generateUrlTitle(page, options) {
//     if (page.title) {
//         // Removes all non-alphanumeric characters from title
//         // And make whitespace underscore
//         page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
//     } else {
//         // Generates random 5 letter string
//         page.urlTitle = Math.random().toString(36).substring(2, 7);
//     }
// }



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
            page.urltitle = page.title.replace(/\s+/g, 'xxx').replace(/\W/g, '');
        }
    }
});

// ,
//     hooks: {
//         beforeValidate: generateUrlTitle(page)
//     }

// Page.hook('beforeValidate', generateUrlTitle(page))


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