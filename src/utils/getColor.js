export function getKnowledgeColor(k){
    const knowledge = ["r8S3g", "t5V9e", "m3D1v", "s8Y2f", "k4W1c", "g7R2j", "b3C9s", "y9W5d"]
    const colors = ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc']
    if(knowledge.indexOf(k) !== -1 ) {
        // console.log("color"+knowledge.indexOf(k))
        return colors[knowledge.indexOf(k)]
    }
    else
        return "#FFFFFF"
}









export const titleColorList = ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc']
export const circleColorList = ['red', 'blue']
export const clusterColorList = ['#CCB98D', '#2F474D', '#8DC1CC']
export const CommonColor = {
    HotTime: '#d95f02',
    KnowledgeEdge: 'grey',
    Correct:'green',
    PartlyCorrect:'yellow',
    Error:'red',
    Master:'#386cb0',
    Density: '#588dd5',
    CircleBorder:'#eee',
    CircleRadius:'#bbb'
}