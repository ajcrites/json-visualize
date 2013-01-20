JsonVisualize = function (obj, container) {
    if (typeof obj === 'string') {
        obj = JSON.parse(obj);
    }
    this.obj = obj;
    this.title = 'objectVariableName';
    this.depth = 0;
    this.container = container;
};

JsonVisualize.prototype = {
    display: function () {
        this.recur(this.obj);
    },

    recur: function (element) {
        if (this.isArray(element)) {
            this.displayArray(element);
        }
        else if (element === null) {
            this.displayItem(element);
        }
        else if (typeof element === 'object') {
            this.displayObject(element);
        }
        else {
            this.displayItem(element);
        }
    },

    displayArray: function (element) {
        this.create('[', 'structure');
        var originalTitle = this.title;
        this.depth++;
        for (var x = 0; x < element.length; x++) {
            this.title = originalTitle + '[' + x + ']';
            this.create(element[x] + (x === element.length - 1) ? '' : ',', 'content', this.title);
            this.recur(element[x]);
        }
        this.depth--;
        this.title = originalTitle;
        this.create(']', 'structure');
    },

    displayItem: function (element) {
        this.create(element, 'content', this.title);
    },

    displayObject: function (element) {
        var originalTitle = this.title;
        this.create('{', 'structure');
        this.depth++;
        for (var item in element) {
            if (element.hasOwnProperty(item)) {
                this.title = originalTitle + '.' + item;
                this.create('"' + item + '":', 'name');
                this.recur(element[item]);
            }
        }
        this.depth--;
        this.create('}', 'structure');
        this.title = originalTitle;
    },

    create: function (content, className, title) {
        var displayText = document.createTextNode(content);
        var displayNode = document.createElement('div');
        displayNode.appendChild(displayText);
        displayNode.className = className;

        if (typeof title !== 'undefined') {
            displayNode.setAttribute('title', title);
        }
        this.container.appendChild(displayNode);
    },

    isArray: function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        return toString.call(obj) === '[object Array]';
    }
};
