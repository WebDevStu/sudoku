var _ = {

    /**
     * get element by id short hand
     *
     * @param identifier {string}
     * @returns {Element}
     */
    $: function (identifier) {
        return document.getElementById(identifier);
    },


    /**
     * clone array
     * @param array {array}
     * @returns {array}
     */
    clone: function (array) {
        return array.slice(0);
    },


    /**
     * extend
     * @param object
     * @param extend
     */
    extend: function (object, extend) {

        var prop;

        for (prop in extend) {
            if (extend.hasOwnProperty(prop)) {
                object[prop] = object[prop] || extend[prop];
            }
        }
    },


    /**
     * padding for clock display
     *
     * @param number {number}
     * @returns {number|string}
     */
    padding: function (number) {

        if (+number < 10) {
            return '0' + number;
        }

        return number;
    }
};