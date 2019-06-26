import MockJs from 'mockjs';

const moduleList = [
    './list'
]

export default function (bool) {
    if (bool) {
        moduleList.map(url => {
            return require(url).default()
        })
    }
}