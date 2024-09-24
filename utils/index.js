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