export function getKnowledgeColor(k){
    const knowledge = ["r8S3g", "t5V9e", "m3D1v", "s8Y2f", "k4W1c", "g7R2j", "b3C9s", "y9W5d"]
    const colors = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#b3e2cd', '#e5d8bd', '#fddaec']
    if(knowledge.indexOf(k) !== -1 ) {
        console.log("color"+knowledge.indexOf(k))
        return colors[knowledge.indexOf(k)]
    }
    else
        return "#FFFFFF"
}


export const titleColorList = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#b3e2cd', '#e5d8bd', '#fddaec']
export const circleColorList = ['red', 'blue']