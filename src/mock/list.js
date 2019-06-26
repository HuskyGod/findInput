const queryString = require('query-string');

export default function ({mock}) {
    const findList = mock({
        'list|5': [{
            'id|+1': 0,
            type: "user",
            name: "@name",
            'project|5': [{
                type: "project",
                id: "@id",
                title: "@title",
                docs: "@sentence",
                star: "@increment(1000)",
                'language|1': ['javascript', 'php', 'react', 'vue', 'java']
            }]
        }]
    });
    mock(RegExp('/api/findList' + ".*"), 'get', function( {url} ) {
        const {find} = queryString.parse(url.split("?")[1]);
        let arr = [];
        findList.list.map((list) => {
            if (!find) {
                arr.push(list);
                return list;
            }
            if (check(list, find)) {
                arr.push(list);
            }
            list.project.map((item) => {
                if (arr.find(data => data.id === item.id)) {
                    return null;
                }
                if (check(item, find)) {
                    arr.push(item);
                }
            })
        })
        return arr;
    });
    mock(RegExp('/api/getList' + ".*"), 'get', function ({url}) {
        const {find} = queryString.parse(url.split("?")[1]);
        if (!find) return [];
        return findList.list.reduce((pave, nextOpt) => {
            const arr = [].concat(pave);
            const next = {
                ...nextOpt,
                findId: `${nextOpt.id}`
            }
            if (check(next, find)) {
                arr.push(next);
            }
            if (next.project) {
                next.project.map(item => {
                    if (check({...item, findId: `${item.id}`}, find)) {
                        arr.push(item)
                    }
                })
            }
            return arr;
        }, [])
    })
    function check (item, text) {
        console.log(item, text)
        const findText = item.findId || item.title || item.name;
        if (findText.toLocaleLowerCase().indexOf(text.toLocaleUpperCase()) !== -1 || findText.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1) {
            return true;
        } else if (findText.toLocaleUpperCase().indexOf(text.toLocaleUpperCase()) !== -1 || findText.toLocaleUpperCase().indexOf(text.toLocaleLowerCase()) !== -1) {
            return true;
        }
        return false;
    }
}