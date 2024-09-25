export function attributeToId(attribute) {
    switch (attribute) {
        case "一般":
            return "1";
        case "格斗":
            return "2";
        case "飞行":
            return "3";
        case "毒":
            return "4";
        case "地面":
            return "5";
        case "岩石":
            return "6";
        case "虫":
            return "7";
        case "幽灵":
            return "8";
        case "钢":
            return "9";
        case "火":
            return "10";
        case "水":
            return "11";
        case "草":
            return "12";
        case "电":
            return "13";
        case "超能力":
            return "14";
        case "冰":
            return "15";
        case "龙":
            return "16";
        case "恶":
            return "17";
        case "惡":
            return "17";
        case "妖精":
            return "18";
        default:
            return attribute;
    }
}


export const century = [{
    text: "第一世代", value: 1,
}, {
    text: "第二世代", value: 2,
}, {
    text: "第三世代", value: 3,
}, {
    text: "第四世代", value: 4,
}, {
    text: "第五世代", value: 5,
}, {
    text: "第六世代", value: 6,
}, {
    text: "第七世代", value: 7,
}, {
    text: "第八世代", value: 8,
}, {
    text: "第九世代", value: 9,
}]

export const attributes = ['一般', '格斗', '飞行', '毒', '地面', '岩石', '虫', '幽灵', '钢', '火', '水', '草', '电', '超能力', '冰', '龙', '恶', '妖精'];