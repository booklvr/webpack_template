import { testUI as UI } from './UI.js';


var controller = (function(UI) {

    return {
        init: function () {
            UI.sendTestMessage('this is a test message');
        }
    }

})(UI);

controller.init();