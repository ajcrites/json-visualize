JsonVisualize = function (obj, container) {
    if (typeof obj === 'string') {
        obj = JSON.parse(obj);
    }
    this.obj = obj;
    this.title = 'objectVariableName';
    this.depth = 0;
    this.container = container;
    this.elementClass = 'object-content';
    this.startLoop = false;
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
        this.br();
        var originalTitle = this.title;
        this.depth++;
        this.elementClass = 'array-content';
        this.startLoop = false;
        for (var x = 0; x < element.length; x++) {
            this.title = originalTitle + '[' + x + ']';
            this.recur(element[x]);
            if (x !== element.length - 1) {
                this.create(',', 'comma');
            }
            this.br();
        }
        this.depth--;
        this.title = originalTitle;
        this.create(']', 'structure');
    },

    displayItem: function (element) {
        this.create(element, this.elementClass, this.title);
    },

    displayObject: function (element) {
        var originalTitle = this.title;
        this.create('{', 'structure');
        this.br();
        this.depth++;
        this.elementClass = 'object-content';
        for (var item in element) {
            if (element.hasOwnProperty(item)) {
                this.title = originalTitle + '.' + item;
                this.startLoop = true;
                this.create('"' + item + '":', 'name');
                this.recur(element[item]);
            }
            this.create(',', 'comma');
            this.br();
            this.startLoop = false;
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
        if (className === 'name' || (className === 'structure' && !this.startLoop) || className === 'array-content') {
            displayNode.style.paddingLeft = (this.depth * 20) + 'px';
        }
        this.container.appendChild(displayNode);

        return displayNode;
    },

    isArray: function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        return toString.call(obj) === '[object Array]';
    },

    br: function () {
        this.container.appendChild(document.createElement('br'));
    }
};
