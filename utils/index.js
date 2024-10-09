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


// 怪兽	人型
// 水中1	水中3
// 虫	矿物
// 飞行	不定形
// 陆上	水中2
// 妖精	百变怪
// 植物	龙
// 未发现

export const eggs = [{
    text: "未发现", value: `属于此蛋群的宝可梦都无法生蛋。换装皮卡丘、小智版甲贺忍蛙、戴着帽子的皮卡丘为特殊形态的宝可梦，不能生蛋。尼多娜和尼多后进化前的尼多兰不属于这个蛋群可以生蛋，幼年宝可梦进化后不属于这个蛋群可以生蛋。

《Ｘ／Ｙ》中，这个蛋群的野生宝可梦和礼物宝可梦至少3项能力是满个体值。《欧米伽红宝石／阿尔法蓝宝石》和《太阳／月亮》中，当特性是同步的宝可梦配置在同行宝可梦首位时，获得这个蛋群的礼物宝可梦的性格与它相同。《究极之日／究极之月》起同步的作用扩展为全蛋群。`,
}, {
    text: "人型", value: `这个蛋群的宝可梦都是直立行走的人型生物。`,
}, {
    text: "水中1", value: `这个蛋群的宝可梦大多原型基于两栖动物和水边生活的多栖动物。`,
}, {
    text: "矿物", value: `这个蛋群的宝可梦大多原型基于无机物和身上带有无机物的生物。`,
}, {
    text: "不定形", value: `这个蛋群的宝可梦大多原型基于软体动物、灵体，以及身体柔软的生物或非生物。`,
}, {
    text: "水中2", value: `这个蛋群的宝可梦大多原型基于鱼类，乌贼以及章鱼。但也有例外，例如吼鲸王原型是哺乳动物。`,
}, {
    text: "百变怪",
    value: `这个蛋群只有百变怪。处于这个蛋群的宝可梦可以与除未发现群和百变怪群外的任何蛋群的宝可梦生蛋，蛋的种类必然是另一方。`,
}, {
    text: "龙",
    value: `这个蛋群的宝可梦大多原型基于传说中的龙以及与龙有关的动物（蜥蜴、海马等）。但也有例外，例如七夕青鸟原型是鸟类但是它是龙属性，鲤鱼王、丑丑鱼原型是鱼类但是它们进化后的原型是传说中的龙。`
}, {text: "怪兽", value: `这个蛋群的宝可梦大多原型基于特摄影片中的怪兽以及爬行动物。`}, {
    text: "水中3", value: `这个蛋群的宝可梦大多原型基于非鱼类的深海水生动物。但也有例外，例如始祖小鸟原型是爬行动物。`
}, {text: "虫", value: '这个蛋群的宝可梦大多原型基于昆虫和节肢动物。但也有例外，例如小嘴蜗、壶壶原型是软体动物。'}, {
    text: "飞行", value: `这个蛋群的宝可梦原型大多基于鸟类、蝙蝠、会飞的爬行动物甚至是神话中会飞的小妖精。`
}, {
    text: "陆地",
    value: `这个蛋群的宝可梦大多原型基于哺乳动物和爬行动物，以及翅膀退化的鸟类。但也有例外，例如橡实果原型是植物。`
}, {text: "妖精", value: `这个蛋群的宝可梦大多原型基于可爱的小型动物和神话中的妖精。`}, {
    text: "植物", value: `这个蛋群的宝可梦大多原型基于植物和真菌，以及身上长有植物或真菌的动物。`
}]

export const inter = (i) => {
    if (!i) return i;
    return parseInt(i)
}

export const natures = [{
    "nature": "勤奋", "increased_stat": "无", "decreased_stat": "无", "likes_flavor": "无", "dislikes_flavor": "无"
}, {
    "nature": "怕寂寞", "increased_stat": "攻击", "decreased_stat": "防御", "likes_flavor": "辣", "dislikes_flavor": "酸"
}, {
    "nature": "勇敢", "increased_stat": "攻击", "decreased_stat": "速度", "likes_flavor": "辣", "dislikes_flavor": "甜"
}, {
    "nature": "固执", "increased_stat": "攻击", "decreased_stat": "特攻", "likes_flavor": "辣", "dislikes_flavor": "苦"
}, {
    "nature": "顽皮", "increased_stat": "攻击", "decreased_stat": "特防", "likes_flavor": "辣", "dislikes_flavor": "涩"
}, {
    "nature": "大胆", "increased_stat": "防御", "decreased_stat": "攻击", "likes_flavor": "酸", "dislikes_flavor": "辣"
}, {
    "nature": "悠闲", "increased_stat": "防御", "decreased_stat": "速度", "likes_flavor": "酸", "dislikes_flavor": "甜"
}, {
    "nature": "乐天", "increased_stat": "防御", "decreased_stat": "特攻", "likes_flavor": "酸", "dislikes_flavor": "苦"
}, {
    "nature": "淘气", "increased_stat": "防御", "decreased_stat": "特防", "likes_flavor": "酸", "dislikes_flavor": "涩"
}, {
    "nature": "内敛", "increased_stat": "特攻", "decreased_stat": "攻击", "likes_flavor": "苦", "dislikes_flavor": "辣"
}, {
    "nature": "慢吞吞", "increased_stat": "特攻", "decreased_stat": "速度", "likes_flavor": "苦", "dislikes_flavor": "甜"
}, {
    "nature": "温和", "increased_stat": "特攻", "decreased_stat": "防御", "likes_flavor": "苦", "dislikes_flavor": "酸"
}, {
    "nature": "害羞", "increased_stat": "特攻", "decreased_stat": "特防", "likes_flavor": "苦", "dislikes_flavor": "涩"
}, {
    "nature": "马虎", "increased_stat": "特防", "decreased_stat": "攻击", "likes_flavor": "涩", "dislikes_flavor": "辣"
}, {
    "nature": "温顺", "increased_stat": "特防", "decreased_stat": "防御", "likes_flavor": "涩", "dislikes_flavor": "酸"
}, {
    "nature": "慎重", "increased_stat": "特防", "decreased_stat": "特攻", "likes_flavor": "涩", "dislikes_flavor": "苦"
}, {
    "nature": "自大", "increased_stat": "特防", "decreased_stat": "速度", "likes_flavor": "涩", "dislikes_flavor": "甜"
}, {
    "nature": "胆小", "increased_stat": "速度", "decreased_stat": "攻击", "likes_flavor": "甜", "dislikes_flavor": "辣"
}, {
    "nature": "急躁", "increased_stat": "速度", "decreased_stat": "防御", "likes_flavor": "甜", "dislikes_flavor": "酸"
}, {
    "nature": "爽朗", "increased_stat": "速度", "decreased_stat": "特攻", "likes_flavor": "甜", "dislikes_flavor": "苦"
}, {
    "nature": "天真", "increased_stat": "速度", "decreased_stat": "特防", "likes_flavor": "甜", "dislikes_flavor": "涩"
}, {
    "nature": "认真", "increased_stat": "无", "decreased_stat": "无", "likes_flavor": "无", "dislikes_flavor": "无"
}
    // ,
    // {
    //     "nature": "浮躁",
    //     "increased_stat": "无",
    //     "decreased_stat": "无",
    //     "likes_flavor": "无",
    //     "dislikes_flavor": "无"
    // },
    // {
    //     "nature": "狂妄",
    //     "increased_stat": "无",
    //     "decreased_stat": "无",
    //     "likes_flavor": "无",
    //     "dislikes_flavor": "无"
    // },
    // {
    //     "nature": "义气",
    //     "increased_stat": "无",
    //     "decreased_stat": "无",
    //     "likes_flavor": "无",
    //     "dislikes_flavor": "无"
    // }
]
