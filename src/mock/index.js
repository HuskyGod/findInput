import Mock from 'mockjs';

const moduleList = [
    './list'
]

export default function (bool) {
    if (bool) {
        Mock.setup({
            timeout: 400
        })
        moduleList.map(url => {
            return require(`${url}.js`).default(Mock)
        })
    }
}