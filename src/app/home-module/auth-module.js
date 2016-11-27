"use strict";
var login_form_component_1 = require("./login-form/login-form.component");
var instructions_component_1 = require("./instructions/instructions.component");
exports.authRoutes = [
    { path: 'home', component: login_form_component_1.LoginFormComponent },
    { path: 'instructions', component: instructions_component_1.InstructionsComponent }
];
