import { getKnowledgeColor } from "./getColor"


import mitt from 'mitt'

const emitter = new mitt()
export default {
    getKnowledgeColor: getKnowledgeColor,
    emitter
}