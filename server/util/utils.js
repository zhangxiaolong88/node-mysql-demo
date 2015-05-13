var utils = {
    sortByName: function(ary, name, desc) {
        ary.sort(function(curt, next) {
            var c = Number.isNaN(curt[name]) ? Number(curt[name]) : curt[name],
                n = Number.isNaN(next[name]) ? Number(next[name]) : next[name];
            if (typeof c == "number" && typeof n == "number") {
                return c - n;
            }
            if (typeof c == "string" && typeof n == "string") {
                return c.localeCompare(n);
            }
        });
        if (desc === "true") {
            ary.reverse();
        }
        return ary;
    },
    getPageData: function(datas, currentPage, pageCount) {
        var start = (currentPage - 1) * pageCount;

        var end = Math.min((start + pageCount), datas.length);

        var result = [];

        for (var i = start; i < end; i++) {
            result.push(datas[i]);
        }

        return result;
    }
};

exports.utils = utils;