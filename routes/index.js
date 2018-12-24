const homeController = require('./home');
const createController = require('./create');
const searchController = require('./search');
const editController = require('./edit');
const deleteController = require('./delete');
const loginController = require('./login');
const registerController = require('./register');
const logoutController = require('./logout');
module.exports = {
    home: homeController,
    create: createController,
    search: searchController,
    edit: editController,
    delete: deleteController,
    login: loginController,
    register: registerController,
    logout: logoutController
};