JsonVisualize = function (obj) {
    if (typeof obj === 'string') {
        obj = JSON.parse(obj);
    }
    this.obj = obj;
    this.title = '';
};

JsonVisualize.prototype = {
    recur: function (element) {
        if (element.isArray()) {
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

    display: function () {
        this.recur(this.obj);
    }

    displayArray: function (element) {
        //display [
        var originalTitle = this.title;
        for (var x = 0; x < element.length; x++) {
            //attach title
            this.title = originalTitle + '[' + x + ']';
            this.recur(element[x]);
        }
        this.title = originalTitle;
        //display ]
    },

    displayItem: function (element) {
        //attach title
       //display element
    },

    displayObject: function (element) {
        var originalTitle = this.title;
        //display {
        for (var item in element) {
            if (element.hasOwnProperty(item)) {
                this.title = originalTitle + '.' + item;
                //display "item":
                this.recur(element);
            }
        }
        //display }
        this.title = originalTitle;
    }
};
