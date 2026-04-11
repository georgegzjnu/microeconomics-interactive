// Interactive Components Prototype - Bilingual Quiz and Flashcards

// ================ Bilingual Text Dictionary ================
const translations = {
    en: {
        tab_quiz: "Knowledge Quiz",
        tab_flashcards: "Concept Flashcards",
        quiz_title: "Supply & Demand Quiz",
        quiz_desc: "Test your understanding of basic microeconomics concepts. 10 multiple‑choice questions, bilingual support.",
        quiz_time: "Time limit: 15 min",
        quiz_score: "Score: 0/100",
        prev: "Previous",
        next: "Next",
        submit: "Submit Quiz",
        result_title: "Quiz Results",
        score_default: "Complete the quiz to see your score.",
        retry: "Try Again",
        flashcards_title: "Core Concepts Flashcards",
        flashcards_desc: "Flip cards to learn 20 key microeconomics terms. Bilingual definitions and real‑life examples.",
        flashcards_count: "20 cards total",
        flashcards_mastered: "0 mastered",
        prev_card: "← Previous",
        next_card: "Next →",
        card_flip: "Click to flip",
        definition: "Definition",
        example: "Example",
        mark_mastered: "Mark as Mastered",
        mark_review: "Needs Review",
        progress: "Progress",
        mastered_cards: "Mastered",
        footer: "Microeconomics Teaching Agent - Interactive Components Prototype. © 2026",
        category_all: "All",
        category_supply: "Supply & Demand",
        category_elasticity: "Elasticity",
        category_market_failure: "Market Failure",
        category_imperfect_competition: "Imperfect Competition",
        category_market_efficiency: "Market Efficiency",
        correct: "Correct",
        incorrect: "Incorrect",
        your_answer: "Your answer",
        correct_answer: "Correct answer",
        explanation: "Explanation",
        feedback_title: "How was this material for you?",
        feedback_desc: "Your anonymous feedback helps us improve the learning experience.",
        feedback_too_easy: "Too Easy",
        feedback_just_right: "Just Right",
        feedback_too_hard: "Too Hard",
        feedback_thankyou: "Thank you for your feedback! Your input has been recorded anonymously.",
        feedback_stats: "Feedback recorded:",
        tab_analyzer: "Market Efficiency Analyzer",
        analyzer_title: "Market Efficiency Analyzer",
        analyzer_desc: "Interactive tool to explore consumer surplus, producer surplus, deadweight loss, and market efficiency under different policy scenarios."
    },
    cn: {
        tab_quiz: "知识测验",
        tab_flashcards: "概念闪卡",
        quiz_title: "供需理论测验",
        quiz_desc: "测试你对微观经济学基础概念的理解。10道选择题，支持双语。",
        quiz_time: "时间限制: 15分钟",
        quiz_score: "得分: 0/100",
        prev: "上一题",
        next: "下一题",
        submit: "提交测验",
        result_title: "测验结果",
        score_default: "完成测验查看得分。",
        retry: "再试一次",
        flashcards_title: "核心概念闪卡",
        flashcards_desc: "翻转卡片学习20个关键微观经济学术语。双语定义与生活实例。",
        flashcards_count: "共20张卡片",
        flashcards_mastered: "已掌握",
        prev_card: "← 上一张",
        next_card: "下一张 →",
        card_flip: "点击翻转",
        definition: "定义",
        example: "示例",
        mark_mastered: "标记为已掌握",
        mark_review: "需要复习",
        progress: "进度",
        mastered_cards: "已掌握",
        footer: "微观经济学教学智能体 - 互动组件原型。© 2026",
        category_all: "全部",
        category_supply: "供需理论",
        category_elasticity: "弹性",
        category_market_failure: "市场失灵",
        category_imperfect_competition: "不完全竞争市场",
        correct: "正确",
        incorrect: "错误",
        your_answer: "你的答案",
        correct_answer: "正确答案",
        explanation: "解析",
        feedback_title: "这个学习材料对你来说怎么样？",
        feedback_desc: "你的匿名反馈帮助我们改进学习体验。",
        feedback_too_easy: "太简单",
        feedback_just_right: "刚刚好",
        feedback_too_hard: "太难",
        feedback_thankyou: "感谢你的反馈！你的意见已被匿名记录。",
        feedback_stats: "已记录反馈：",
        tab_analyzer: "市场效率分析仪",
        analyzer_title: "市场效率分析仪",
        analyzer_desc: "交互式工具，探索不同政策场景下的消费者剩余、生产者剩余、无谓损失和市场效率。"
    }
};

// ================ Data Collection Module ================

// LocalStorage keys
const STORAGE_KEYS = {
    QUIZ_SESSIONS: 'microeconomics_quiz_sessions',
    FLASHCARD_SESSIONS: 'microeconomics_flashcard_sessions',
    FEEDBACKS: 'microeconomics_feedbacks',
    LAST_SESSION_ID: 'microeconomics_last_session_id'
};

// Generate unique session ID
function generateSessionId() {
    let lastId = localStorage.getItem(STORAGE_KEYS.LAST_SESSION_ID) || '0';
    let newId = parseInt(lastId) + 1;
    localStorage.setItem(STORAGE_KEYS.LAST_SESSION_ID, newId.toString());
    return `session_${newId}`;
}

// Get stored data
function getStoredData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(`Error reading ${key}:`, e);
        return [];
    }
}

// Save data
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Error saving ${key}:`, e);
    }
}

// ================ Quiz Data Recording ================

let quizSession = null;
let quizStartTime = null;
let quizAnswers = [];

function startQuizSession(category) {
    quizSession = {
        sessionId: generateSessionId(),
        category: category || 'all',
        startTime: Date.now(),
        answers: []
    };
    quizStartTime = Date.now();
    quizAnswers = [];
    console.log('Quiz session started:', quizSession.sessionId);
}

function recordQuizAnswer(questionId, selectedOptionIndex, isCorrect) {
    if (!quizSession) return;
    
    const answerRecord = {
        questionId,
        selectedOptionIndex,
        isCorrect,
        timestamp: Date.now()
    };
    
    quizAnswers.push(answerRecord);
    quizSession.answers = quizAnswers;
    console.log('Quiz answer recorded:', answerRecord);
}

function endQuizSession(score) {
    if (!quizSession) return null;
    
    const endTime = Date.now();
    const duration = endTime - quizStartTime;
    
    const completedSession = {
        ...quizSession,
        endTime,
        duration,
        score: score || 0,
        answers: [...quizAnswers]
    };
    
    // Save to localStorage
    const sessions = getStoredData(STORAGE_KEYS.QUIZ_SESSIONS);
    sessions.push(completedSession);
    saveData(STORAGE_KEYS.QUIZ_SESSIONS, sessions);
    
    console.log('Quiz session ended:', completedSession);
    
    // Reset
    quizSession = null;
    quizStartTime = null;
    quizAnswers = [];
    
    return completedSession;
}

// ================ Flashcards Data Recording ================

let flashcardSession = null;
let flashcardStartTime = null;
let cardViewRecords = new Map(); // cardId -> {startTime, endTime, flips}

function startFlashcardSession() {
    flashcardSession = {
        sessionId: generateSessionId(),
        startTime: Date.now(),
        cardsViewed: []
    };
    flashcardStartTime = Date.now();
    cardViewRecords.clear();
    console.log('Flashcard session started:', flashcardSession.sessionId);
}

function startCardView(cardId) {
    if (!flashcardSession) return;
    
    if (!cardViewRecords.has(cardId)) {
        cardViewRecords.set(cardId, {
            cardId,
            startTime: Date.now(),
            endTime: null,
            flips: 0
        });
        console.log('Card view started:', cardId);
    }
}

function recordCardFlip(cardId) {
    if (!flashcardSession) return;
    
    const record = cardViewRecords.get(cardId);
    if (record) {
        record.flips++;
        console.log('Card flip recorded:', cardId, 'flips:', record.flips);
    }
}

function endCardView(cardId) {
    if (!flashcardSession) return;
    
    const record = cardViewRecords.get(cardId);
    if (record) {
        record.endTime = Date.now();
        console.log('Card view ended:', cardId, 'duration:', record.endTime - record.startTime);
    }
}

function endFlashcardSession() {
    if (!flashcardSession) return null;
    
    const endTime = Date.now();
    const duration = endTime - flashcardStartTime;
    
    // Convert map to array
    const cardsViewed = Array.from(cardViewRecords.values()).map(record => ({
        cardId: record.cardId,
        viewDuration: record.endTime ? record.endTime - record.startTime : 0,
        flips: record.flips
    }));
    
    const completedSession = {
        ...flashcardSession,
        endTime,
        duration,
        cardsViewed
    };
    
    // Save to localStorage
    const sessions = getStoredData(STORAGE_KEYS.FLASHCARD_SESSIONS);
    sessions.push(completedSession);
    saveData(STORAGE_KEYS.FLASHCARD_SESSIONS, sessions);
    
    console.log('Flashcard session ended:', completedSession);
    
    // Reset
    flashcardSession = null;
    flashcardStartTime = null;
    cardViewRecords.clear();
    
    return completedSession;
}

// ================ Anonymous Feedback ================

function recordFeedback(difficulty, comments) {
    const feedback = {
        id: generateSessionId(),
        timestamp: Date.now(),
        difficulty: difficulty || 'unknown',
        comments: comments || ''
    };
    
    const feedbacks = getStoredData(STORAGE_KEYS.FEEDBACKS);
    feedbacks.push(feedback);
    saveData(STORAGE_KEYS.FEEDBACKS, feedbacks);
    
    console.log('Feedback recorded:', feedback);
    return feedback;
}

// ================ Quiz Data ================
const quizData = [
    {
        id: 1,
        question_en: "According to the law of demand, when the price of a good increases:",
        question_cn: "根据需求定律，当商品价格上涨时：",
        options_en: ["Quantity demanded increases", "Quantity demanded decreases", "Quantity supplied increases", "Quantity supplied decreases"],
        options_cn: ["需求量增加", "需求量减少", "供给量增加", "供给量减少"],
        answer: 1, // index 1 = "Quantity demanded decreases"
        explanation_en: "The law of demand states an inverse relationship between price and quantity demanded.",
        explanation_cn: "需求定律表明价格与需求量之间存在反向关系。"
    },
    {
        id: 2,
        question_en: "The point where the demand and supply curves intersect is called:",
        question_cn: "需求曲线与供给曲线相交的点称为：",
        options_en: ["Shortage point", "Surplus point", "Equilibrium point", "Price ceiling"],
        options_cn: ["短缺点", "过剩点", "均衡点", "价格上限"],
        answer: 2,
        explanation_en: "Equilibrium occurs at the intersection of demand and supply curves.",
        explanation_cn: "均衡出现在需求曲线与供给曲线的交点。"
    },
    {
        id: 3,
        question_en: "If the price of coffee beans rises, what happens to the supply curve for coffee?",
        question_cn: "如果咖啡豆价格上涨，咖啡的供给曲线会发生什么变化？",
        options_en: ["Shifts left (decrease in supply)", "Shifts right (increase in supply)", "Movement along the curve", "No change"],
        options_cn: ["向左移动（供给减少）", "向右移动（供给增加）", "沿曲线移动", "没有变化"],
        answer: 0,
        explanation_en: "Higher input costs reduce producers' willingness to supply at each price → supply decreases, curve shifts left.",
        explanation_cn: "更高的投入成本降低了生产者在每个价格下的供给意愿 → 供给减少，曲线左移。"
    },
    {
        id: 4,
        question_en: "Which of the following would cause a rightward shift of the demand curve for movie tickets?",
        question_cn: "以下哪项会导致电影票需求曲线向右移动？",
        options_en: ["Increase in ticket prices", "Decrease in consumer income", "Popular new movie release", "Higher prices of popcorn"],
        options_cn: ["票价上涨", "消费者收入减少", "热门新电影上映", "爆米花价格上涨"],
        answer: 2,
        explanation_en: "A popular movie increases consumers' desire to watch at any given price, shifting demand rightward.",
        explanation_cn: "热门电影增加了消费者在任何给定价格下观看的欲望，使需求曲线向右移动。"
    },
    {
        id: 5,
        question_en: "At the equilibrium price, the quantity demanded equals:",
        question_cn: "在均衡价格下，需求量等于：",
        options_en: ["Quantity supplied", "Zero", "Maximum possible output", "Shortage amount"],
        options_cn: ["供给量", "零", "最大可能产出", "短缺量"],
        answer: 0,
        explanation_en: "Equilibrium is defined as the price where quantity demanded equals quantity supplied.",
        explanation_cn: "均衡定义为需求量等于供给量时的价格。"
    },
    {
        id: 6,
        question_en: "A price ceiling set below the equilibrium price leads to:",
        question_cn: "设定在均衡价格以下的价格上限会导致：",
        options_en: ["Surplus", "Shortage", "No effect", "Increase in quality"],
        options_cn: ["过剩", "短缺", "没有影响", "质量提高"],
        answer: 1,
        explanation_en: "Price ceiling below equilibrium makes quantity demanded exceed quantity supplied, creating a shortage.",
        explanation_cn: "低于均衡价格的价格上限使需求量超过供给量，造成短缺。"
    },
    {
        id: 7,
        question_en: "The law of supply describes a ________ relationship between price and quantity supplied.",
        question_cn: "供给定律描述了价格和供给量之间的 ________ 关系。",
        options_en: ["Direct", "Inverse", "No", "Random"],
        options_cn: ["正向", "反向", "没有", "随机"],
        answer: 0,
        explanation_en: "Law of supply: as price increases, quantity supplied increases (direct relationship).",
        explanation_cn: "供给定律：价格上升，供给量增加（正向关系）。"
    },
    {
        id: 8,
        question_en: "If demand increases while supply remains constant, the equilibrium price will:",
        question_cn: "如果需求增加而供给保持不变，均衡价格将：",
        options_en: ["Increase", "Decrease", "Remain unchanged", "Be indeterminate"],
        options_cn: ["上升", "下降", "保持不变", "无法确定"],
        answer: 0,
        explanation_en: "Rightward shift of demand curve leads to higher equilibrium price and quantity.",
        explanation_cn: "需求曲线右移导致均衡价格和数量上升。"
    },
    {
        id: 9,
        question_en: "A movement along the demand curve is caused by:",
        question_cn: "沿需求曲线的移动是由以下哪项引起的：",
        options_en: ["Change in consumer preferences", "Change in price of the good", "Change in income", "Change in price of related goods"],
        options_cn: ["消费者偏好的改变", "商品价格的改变", "收入的改变", "相关商品价格的改变"],
        answer: 1,
        explanation_en: "Movement along the curve reflects change in quantity demanded due to price change, not shift factors.",
        explanation_cn: "沿曲线的移动反映了由价格变化引起的需求量变化，而非导致曲线移动的因素。"
    },
    {
        id: 10,
        question_en: "Which of the following is NOT a determinant of supply?",
        question_cn: "以下哪项不是供给的决定因素？",
        options_en: ["Technology", "Input prices", "Consumer tastes", "Number of sellers"],
        options_cn: ["技术", "投入品价格", "消费者品味", "卖家数量"],
        answer: 2,
        explanation_en: "Consumer tastes affect demand, not supply. Supply determinants include technology, input prices, expectations, and number of sellers.",
        explanation_cn: "消费者品味影响需求，而非供给。供给的决定因素包括技术、投入品价格、预期和卖家数量。"
    }
];

// ================ Flashcards Data ================
const flashcardsData = [
    {
        id: 1,
        term_en: "Demand",
        definition_cn: "需求 - 消费者愿意且能够购买的商品数量",
        definition_en: "Quantity consumers are willing/able to buy at various prices",
        example_en: "When it's hot, you want more iced tea at every price",
        example_cn: "天气热时，你在每个价格下都想喝更多冰茶"
    },
    {
        id: 2,
        term_en: "Supply",
        definition_cn: "供给 - 生产者在不同价格下愿意且能够出售的商品数量",
        definition_en: "Quantity producers are willing/able to sell at various prices",
        example_en: "If milk prices rise, farmers supply more milk",
        example_cn: "如果牛奶价格上涨，农民会供给更多牛奶"
    },
    {
        id: 3,
        term_en: "Equilibrium",
        definition_cn: "均衡 - 需求量等于供给量时的状态",
        definition_en: "Point where quantity demanded equals quantity supplied",
        example_en: "The price where bubble tea shops sell exactly what customers want to buy",
        example_cn: "奶茶店恰好卖出顾客想买的数量时的价格"
    },
    {
        id: 4,
        term_en: "Law of Demand",
        definition_cn: "需求定律 - 价格与需求量之间的反向关系",
        definition_en: "Inverse relationship between price and quantity demanded",
        example_en: "As movie tickets get cheaper, more people go to the cinema",
        example_cn: "电影票越便宜，看电影的人越多"
    },
    {
        id: 5,
        term_en: "Law of Supply",
        definition_cn: "供给定律 - 价格与供给量之间的正向关系",
        definition_en: "Direct relationship between price and quantity supplied",
        example_en: "When smartphone prices rise, companies produce more phones",
        example_cn: "智能手机价格上涨时，公司会生产更多手机"
    },
    {
        id: 6,
        term_en: "Demand Curve",
        definition_cn: "需求曲线 - 表示价格与需求量关系的图形，向右下方倾斜",
        definition_en: "Graph showing relationship between price and quantity demanded",
        example_en: "The downward‑sloping line in supply‑demand diagrams",
        example_cn: "供需图中向右下方倾斜的线"
    },
    {
        id: 7,
        term_en: "Supply Curve",
        definition_cn: "供给曲线 - 表示价格与供给量关系的图形，向右上方倾斜",
        definition_en: "Graph showing relationship between price and quantity supplied",
        example_en: "The upward‑sloping line in supply‑demand diagrams",
        example_cn: "供需图中向右上方倾斜的线"
    },
    {
        id: 8,
        term_en: "Shortage",
        definition_cn: "短缺 - 在当前价格下，需求量超过供给量的情况",
        definition_en: "Quantity demanded exceeds quantity supplied at current price",
        example_en: "Long queues when concert tickets are priced too low",
        example_cn: "演唱会票价太低时排长队"
    },
    {
        id: 9,
        term_en: "Surplus",
        definition_cn: "过剩 - 在当前价格下，供给量超过需求量的情况",
        definition_en: "Quantity supplied exceeds quantity demanded at current price",
        example_en: "Unsold inventory when a product is overpriced",
        example_cn: "产品定价过高时库存积压"
    },
    {
        id: 10,
        term_en: "Price Ceiling",
        definition_cn: "价格上限 - 政府设定的低于均衡价格的价格限制",
        definition_en: "Government‑imposed maximum price below equilibrium",
        example_en: "Rent control creating housing shortages",
        example_cn: "租金管制导致住房短缺"
    },
    {
        id: 11,
        term_en: "Price Floor",
        definition_cn: "价格下限 - 政府设定的高于均衡价格的价格限制",
        definition_en: "Government‑imposed minimum price above equilibrium",
        example_en: "Minimum wage laws",
        example_cn: "最低工资法"
    },
    {
        id: 12,
        term_en: "Substitute Goods",
        definition_cn: "替代品 - 一种商品价格的上升会导致另一种商品需求增加的商品",
        definition_en: "Goods that can replace each other; price increase of one raises demand for the other",
        example_en: "Tea and coffee; butter and margarine",
        example_cn: "茶和咖啡；黄油和人造黄油"
    },
    {
        id: 13,
        term_en: "Complementary Goods",
        definition_cn: "互补品 - 一种商品价格的上升会导致另一种商品需求减少的商品",
        definition_en: "Goods used together; price increase of one reduces demand for the other",
        example_en: "Cars and gasoline; printers and ink",
        example_cn: "汽车和汽油；打印机和墨盒"
    },
    {
        id: 14,
        term_en: "Normal Good",
        definition_cn: "正常品 - 收入增加时需求增加的商品",
        definition_en: "Good for which demand increases when income rises",
        example_en: "Organic food, travel, education",
        example_cn: "有机食品、旅游、教育"
    },
    {
        id: 15,
        term_en: "Inferior Good",
        definition_cn: "低档品 - 收入增加时需求减少的商品",
        definition_en: "Good for which demand decreases when income rises",
        example_en: "Instant noodles, used cars, public transport",
        example_cn: "方便面、二手车、公共交通"
    },
    {
        id: 16,
        term_en: "Elasticity",
        definition_cn: "弹性 - 衡量一个变量对另一个变量变化的反应程度",
        definition_en: "Measure of how responsive one variable is to changes in another",
        example_en: "Price elasticity of demand = % change in quantity demanded / % change in price",
        example_cn: "需求价格弹性 = 需求量变化百分比 / 价格变化百分比"
    },
    {
        id: 17,
        term_en: "Market Clearing",
        definition_cn: "市场出清 - 供给量等于需求量，市场达到均衡的状态",
        definition_en: "Situation where quantity supplied equals quantity demanded",
        example_en: "No unsold goods, no unmet demand at equilibrium price",
        example_cn: "在均衡价格下没有未售出的商品，也没有未满足的需求"
    },
    {
        id: 18,
        term_en: "Opportunity Cost",
        definition_cn: "机会成本 - 为获得某种东西而放弃的次优选择的价值",
        definition_en: "Value of the next‑best alternative foregone when making a decision",
        example_en: "Choosing to study instead of working → opportunity cost is the wages you could have earned",
        example_cn: "选择学习而非工作 → 机会成本是你本可以赚取的工资"
    },
    {
        id: 19,
        term_en: "Marginal Analysis",
        definition_cn: "边际分析 - 比较额外一单位成本与额外一单位收益的决策方法",
        definition_en: "Comparing additional costs and benefits of a decision",
        example_en: "Should I produce one more unit? Compare marginal cost and marginal revenue.",
        example_cn: "我应该多生产一单位吗？比较边际成本和边际收益。"
    },
    {
        id: 20,
        term_en: "Utility",
        definition_cn: "效用 - 消费者从商品或服务中获得的满足感",
        definition_en: "Satisfaction or happiness derived from consuming goods/services",
        example_en: "Eating ice cream on a hot day gives high utility",
        example_cn: "热天吃冰淇淋带来高效用"
    }
];
// ================ Elasticity Quiz Data ================
const elasticityQuizData = [
    {
        id: 21,
        question_en: "When the price of gasoline rises from $3.00/gallon to $3.60/gallon (20% increase), the quantity demanded decreases by 4%. What is the price elasticity of demand?",
        question_cn: "当汽油价格从3.00美元/加仑上涨到3.60美元/加仑（上涨20%），需求量下降4%。需求价格弹性是多少？",
        options_en: ["0.2", "0.5", "1.0", "2.0"],
        options_cn: ["0.2", "0.5", "1.0", "2.0"],
        answer: 0,
        explanation_en: "Price elasticity = (% change in quantity demanded) / (% change in price) = -4% / 20% = -0.2. Absolute value 0.2 indicates highly inelastic demand (essential good, few short‑term substitutes).",
        explanation_cn: "价格弹性 = (需求量变化百分比) / (价格变化百分比) = -4% / 20% = -0.2。绝对值0.2表明极度缺乏弹性（必需品，短期替代品少）。"
    },
    {
        id: 22,
        question_en: "A product has a price elasticity of demand of 1.5. How would you classify its demand?",
        question_cn: "某商品的需求价格弹性为1.5。你如何分类其需求？",
        options_en: ["Perfectly inelastic", "Inelastic", "Unit elastic", "Elastic"],
        options_cn: ["完全无弹性", "缺乏弹性", "单位弹性", "富有弹性"],
        answer: 3,
        explanation_en: "When the absolute value of price elasticity is greater than 1, demand is elastic (consumers are relatively sensitive to price changes).",
        explanation_cn: "当价格弹性的绝对值大于1时，需求是富有弹性的（消费者对价格变化相对敏感）。"
    },
    {
        id: 23,
        question_en: "When household income increases by 15%, demand for organic vegetables rises by 30%. What is the income elasticity of demand?",
        question_cn: "当家庭收入增加15%时，有机蔬菜的需求增加30%。需求的收入弹性是多少？",
        options_en: ["0.5", "1.0", "2.0", "3.0"],
        options_cn: ["0.5", "1.0", "2.0", "3.0"],
        answer: 2,
        explanation_en: "Income elasticity = (% change in quantity demanded) / (% change in income) = 30% / 15% = 2.0. Positive and greater than 1 indicates a luxury good.",
        explanation_cn: "收入弹性 = (需求量变化百分比) / (收入变化百分比) = 30% / 15% = 2.0。正值且大于1表明是奢侈品。"
    },
    {
        id: 24,
        question_en: "If the price of coffee increases by 10% and the demand for tea increases by 5%, what is the relationship between coffee and tea?",
        question_cn: "如果咖啡价格上涨10%，茶的需求增加5%，咖啡和茶之间的关系是什么？",
        options_en: ["Complements (cross‑elasticity negative)", "Substitutes (cross‑elasticity positive)", "Independent goods (cross‑elasticity zero)", "Inferior goods"],
        options_cn: ["互补品（交叉弹性为负）", "替代品（交叉弹性为正）", "独立商品（交叉弹性为零）", "低档品"],
        answer: 1,
        explanation_en: "Positive cross‑price elasticity means the two goods are substitutes: when the price of one rises, demand for the other increases.",
        explanation_cn: "正的交叉价格弹性意味着两种商品是替代品：一种商品价格上涨时，另一种商品的需求增加。"
    },
    {
        id: 25,
        question_en: "In the storage chip case, why is AI server demand considered inelastic compared to consumer electronics demand?",
        question_cn: "在存储芯片案例中，为什么AI服务器需求相比消费电子需求被认为是缺乏弹性的？",
        options_en: ["AI servers have more substitute products", "Consumer electronics buyers are less price‑sensitive", "AI servers are essential for technology infrastructure with few short‑term alternatives", "Storage chips are cheaper for AI servers"],
        options_cn: ["AI服务器有更多替代产品", "消费电子购买者对价格不敏感", "AI服务器是技术基础设施的必需品，短期替代品少", "存储芯片对AI服务器更便宜"],
        answer: 2,
        explanation_en: "AI server demand is relatively inelastic because it's a critical input for technology infrastructure; companies cannot easily postpone or replace these purchases when prices rise.",
        explanation_cn: "AI服务器需求相对缺乏弹性，因为它是技术基础设施的关键投入；当价格上涨时，企业不容易推迟或替换这些购买。"
    },
    {
        id: 26,
        question_en: "If demand for a product is elastic, a price decrease will lead to:",
        question_cn: "如果某商品的需求富有弹性，价格下降将导致：",
        options_en: ["Decrease in total revenue", "Increase in total revenue", "No change in total revenue", "Uncertain effect"],
        options_cn: ["总收入减少", "总收入增加", "总收入不变", "效果不确定"],
        answer: 1,
        explanation_en: "When demand is elastic, the percentage increase in quantity demanded outweighs the percentage decrease in price, raising total revenue.",
        explanation_cn: "当需求富有弹性时，需求量增加的百分比超过价格下降的百分比，从而提高总收入。"
    },
    {
        id: 27,
        question_en: "Why is the demand for gasoline more elastic in the long run than in the short run?",
        question_cn: "为什么汽油的长期需求弹性比短期需求弹性更大？",
        options_en: ["Consumers can find more substitutes over time (e.g., electric vehicles)", "Gasoline becomes more essential over time", "Short‑run demand is always more elastic", "Income effects are stronger in the long run"],
        options_cn: ["消费者随时间可以找到更多替代品（如电动汽车）", "汽油随时间变得更加必需", "短期需求总是更有弹性", "长期收入效应更强"],
        answer: 0,
        explanation_en: "Elasticity tends to be higher in the long run because consumers have more time to adjust their consumption patterns, find substitutes, or change technologies.",
        explanation_cn: "长期弹性往往更高，因为消费者有更多时间调整消费模式、寻找替代品或改变技术。"
    },
    {
        id: 28,
        question_en: "Which factor makes demand for a product more elastic?",
        question_cn: "哪个因素使商品的需求更有弹性？",
        options_en: ["The product is a necessity", "There are many close substitutes", "The product represents a small portion of consumer budget", "The time horizon is very short"],
        options_cn: ["该商品是必需品", "有许多相近的替代品", "该商品占消费者预算的一小部分", "时间跨度很短"],
        answer: 1,
        explanation_en: "The more substitutes available, the easier it is for consumers to switch when prices change, making demand more elastic.",
        explanation_cn: "可获得的替代品越多，消费者在价格变化时越容易转换，使得需求更有弹性。"
    },
    {
        id: 29,
        question_en: "If producers can quickly increase output when price rises, supply is:",
        question_cn: "如果生产者在价格上涨时能迅速增加产出，供给是：",
        options_en: ["Inelastic", "Elastic", "Unit elastic", "Perfectly inelastic"],
        options_cn: ["缺乏弹性", "富有弹性", "单位弹性", "完全无弹性"],
        answer: 1,
        explanation_en: "Elastic supply means producers can adjust quantity supplied significantly in response to price changes, often due to flexible production capacity or available inputs.",
        explanation_cn: "富有弹性的供给意味着生产者可以根据价格变化大幅调整供给量，通常由于灵活的生产能力或可获得的投入。"
    },
    {
        id: 30,
        question_en: "When demand is inelastic and supply is elastic, who bears most of the burden of a tax?",
        question_cn: "当需求缺乏弹性而供给富有弹性时，谁承担大部分税收负担？",
        options_en: ["Consumers", "Producers", "Shared equally", "Government"],
        options_cn: ["消费者", "生产者", "平均分担", "政府"],
        answer: 0,
        explanation_en: "Tax incidence depends on relative elasticities: the less elastic side (here demand) bears more of the tax burden.",
        explanation_cn: "税收归宿取决于相对弹性：弹性较小的一方（这里是需求）承担更多的税收负担。"
    }
];

// ================ Elasticity Flashcards Data ================
const elasticityFlashcardsData = [
    {
        id: 21,
        term_en: "Price Elasticity of Demand",
        definition_cn: "需求价格弹性 - 衡量需求量对价格变化的反应程度",
        definition_en: "Measures responsiveness of quantity demanded to price changes",
        example_en: "If price rises 10% and quantity demanded falls 20%, elasticity = -2.0 (elastic)",
        example_cn: "如果价格上涨10%，需求量下降20%，弹性 = -2.0（富有弹性）"
    },
    {
        id: 22,
        term_en: "Price Elasticity of Supply",
        definition_cn: "供给价格弹性 - 衡量供给量对价格变化的反应程度",
        definition_en: "Measures responsiveness of quantity supplied to price changes",
        example_en: "Farmers quickly planting more soybeans when soybean prices rise → elastic supply",
        example_cn: "大豆价格上涨时农民迅速种植更多大豆 → 富有弹性的供给"
    },
    {
        id: 23,
        term_en: "Income Elasticity of Demand",
        definition_cn: "需求的收入弹性 - 衡量需求量对收入变化的反应程度",
        definition_en: "Measures responsiveness of quantity demanded to income changes",
        example_en: "Luxury cars have high positive income elasticity (>1); instant noodles have negative elasticity (inferior good)",
        example_cn: "豪华汽车具有高的正收入弹性（>1）；方便面具有负弹性（低档品）"
    },
    {
        id: 24,
        term_en: "Cross‑Price Elasticity of Demand",
        definition_cn: "需求的交叉价格弹性 - 衡量一种商品需求量对另一种商品价格变化的反应程度",
        definition_en: "Measures responsiveness of quantity demanded for one good to price changes of another good",
        example_en: "Coffee price up → tea demand up (positive cross‑elasticity, substitutes)",
        example_cn: "咖啡价格上涨 → 茶需求上升（正交叉弹性，替代品）"
    },
    {
        id: 25,
        term_en: "Elastic Demand",
        definition_cn: "富有弹性的需求 - 需求量的变化百分比大于价格变化百分比（|Ed| > 1）",
        definition_en: "Quantity demanded changes proportionally more than price (|Ed| > 1)",
        example_en: "Movie tickets: price up 10%, quantity demanded down 30% → |Ed| = 3.0 (elastic)",
        example_cn: "电影票：价格上涨10%，需求量下降30% → |Ed| = 3.0（富有弹性）"
    },
    {
        id: 26,
        term_en: "Inelastic Demand",
        definition_cn: "缺乏弹性的需求 - 需求量的变化百分比小于价格变化百分比（|Ed| < 1）",
        definition_en: "Quantity demanded changes proportionally less than price (|Ed| < 1)",
        example_en: "Gasoline: price up 20%, quantity demanded down 4% → |Ed| = 0.2 (inelastic)",
        example_cn: "汽油：价格上涨20%，需求量下降4% → |Ed| = 0.2（缺乏弹性）"
    },
    {
        id: 27,
        term_en: "Unit Elastic Demand",
        definition_cn: "单位弹性需求 - 需求量的变化百分比等于价格变化百分比（|Ed| = 1）",
        definition_en: "Quantity demanded changes proportionally equal to price (|Ed| = 1)",
        example_en: "Price rises 5%, quantity demanded falls exactly 5% → |Ed| = 1.0 (unit elastic)",
        example_cn: "价格上涨5%，需求量恰好下降5% → |Ed| = 1.0（单位弹性）"
    },
    {
        id: 28,
        term_en: "Perfectly Inelastic Demand",
        definition_cn: "完全无弹性需求 - 需求量对价格变化完全没有反应（|Ed| = 0）",
        definition_en: "Quantity demanded does not change at all when price changes (|Ed| = 0)",
        example_en: "Life‑saving medication: patients will pay any price → demand curve vertical",
        example_cn: "救生药物：患者愿意支付任何价格 → 需求曲线垂直"
    },
    {
        id: 29,
        term_en: "Perfectly Elastic Demand",
        definition_cn: "完全弹性需求 - 价格微小变化导致需求量无限变化（|Ed| = ∞）",
        definition_en: "Tiny price change leads to infinite quantity change (|Ed| = ∞)",
        example_en: "Perfectly competitive market: firms are price takers, demand curve horizontal",
        example_cn: "完全竞争市场：企业是价格接受者，需求曲线水平"
    },
    {
        id: 30,
        term_en: "Total Revenue Test",
        definition_cn: "总收入检验 - 通过价格变化对总收入的影响判断需求弹性",
        definition_en: "Determining elasticity by observing how total revenue changes when price changes",
        example_en: "Price cut increases total revenue → demand is elastic (|Ed| > 1)",
        example_cn: "降价使总收入增加 → 需求富有弹性（|Ed| > 1）"
    },
    {
        id: 31,
        term_en: "Luxury Good",
        definition_cn: "奢侈品 - 收入弹性大于1的商品（需求量增长快于收入增长）",
        definition_en: "Good with income elasticity >1 (demand grows faster than income)",
        example_en: "Designer handbags, international travel, fine dining restaurants",
        example_cn: "设计师手袋、国际旅行、高档餐厅"
    },
    {
        id: 32,
        term_en: "Necessity Good",
        definition_cn: "必需品 - 收入弹性在0到1之间的商品（需求量增长慢于收入增长）",
        definition_en: "Good with income elasticity between 0 and 1 (demand grows slower than income)",
        example_en: "Basic food items, utilities, public transportation",
        example_cn: "基本食品、公用事业、公共交通"
    },
    {
        id: 33,
        term_en: "Inferior Good",
        definition_cn: "低档品 - 收入弹性为负的商品（收入增加时需求量减少）",
        definition_en: "Good with negative income elasticity (demand decreases when income increases)",
        example_en: "Instant noodles, used clothing, low‑cost fast food",
        example_cn: "方便面、二手衣服、低价快餐"
    },
    {
        id: 34,
        term_en: "Substitute Goods",
        definition_cn: "替代品 - 交叉价格弹性为正的两种商品（一种涨价导致另一种需求增加）",
        definition_en: "Goods with positive cross‑price elasticity (price increase of one raises demand for the other)",
        example_en: "Tea and coffee, butter and margarine, Uber and Lyft",
        example_cn: "茶和咖啡、黄油和人造黄油、Uber和Lyft"
    },
    {
        id: 35,
        term_en: "Complementary Goods",
        definition_cn: "互补品 - 交叉价格弹性为负的两种商品（一种涨价导致另一种需求减少）",
        definition_en: "Goods with negative cross‑price elasticity (price increase of one reduces demand for the other)",
        example_en: "Printers and ink cartridges, smartphones and cases, cars and gasoline",
        example_cn: "打印机和墨盒、智能手机和保护壳、汽车和汽油"
    },
    {
        id: 36,
        term_en: "Short‑Run Elasticity",
        definition_cn: "短期弹性 - 消费者或生产者短期内对价格变化的反应程度",
        definition_en: "Responsiveness to price changes within a short time horizon",
        example_en: "Gasoline demand is inelastic in the short run (consumers can't quickly change driving habits)",
        example_cn: "汽油需求在短期内缺乏弹性（消费者不能快速改变驾驶习惯）"
    },
    {
        id: 37,
        term_en: "Long‑Run Elasticity",
        definition_cn: "长期弹性 - 消费者或生产者长期内对价格变化的反应程度",
        definition_en: "Responsiveness to price changes over a longer time horizon",
        example_en: "Gasoline demand becomes more elastic in the long run (consumers can switch to electric vehicles)",
        example_cn: "汽油需求在长期内变得更有弹性（消费者可以转向电动汽车）"
    },
    {
        id: 38,
        term_en: "Elasticity Determinants",
        definition_cn: "弹性决定因素 - 影响需求或供给弹性的因素（替代品、时间、预算份额等）",
        definition_en: "Factors affecting elasticity of demand or supply (substitutes, time, budget share, etc.)",
        example_en: "More substitutes → more elastic demand; longer time → more elastic supply",
        example_cn: "替代品越多 → 需求越有弹性；时间越长 → 供给越有弹性"
    },
    {
        id: 39,
        term_en: "Tax Incidence",
        definition_cn: "税收归宿 - 税收负担在买方和卖方之间的分配，取决于相对弹性",
        definition_en: "Distribution of tax burden between buyers and sellers, depends on relative elasticities",
        example_en: "When demand is inelastic, consumers bear most of the tax burden (e.g., cigarettes)",
        example_cn: "当需求缺乏弹性时，消费者承担大部分税收负担（如香烟）"
    },
    {
        id: 40,
        term_en: "Elasticity and Decision Making",
        definition_cn: "弹性与决策 - 利用弹性概念制定定价、税收和政策决策",
        definition_en: "Using elasticity concepts for pricing, taxation, and policy decisions",
        example_en: "Airlines use price discrimination based on different elasticities of business vs leisure travelers",
        example_cn: "航空公司根据商务旅客和休闲旅客的不同弹性进行价格歧视"
    }
];

// ================ Market Failure Quiz Data ================
const marketFailureQuizData = [
    {
        id: 31,
        question_en: "Which of the following best describes market failure?",
        question_cn: "以下哪项最好地描述了市场失灵？",
        options_en: ["A. Government intervention causing market inefficiency", "B. Free market's inability to allocate resources efficiently", "C. Excessive competition reducing corporate profits", "D. Insufficient consumer demand causing recession"],
        options_cn: ["A. 政府干预导致市场效率低下", "B. 自由市场无法有效配置资源", "C. 过度竞争降低企业利润", "D. 消费者需求不足导致经济衰退"],
        answer: 1,
        explanation_en: "Market failure occurs when the free market fails to allocate resources efficiently, resulting in outcomes that are not Pareto optimal. This is the core definition.",
        explanation_cn: "市场失灵是指自由市场无法有效配置资源，导致非帕累托最优的结果。这是核心定义。",
    },
    {
        id: 32,
        question_en: "A factory emitting pollutants that harm nearby residents is an example of:",
        question_cn: "工厂排放污染物损害附近居民是以下哪种情况的例子？",
        options_en: ["A. Positive externality", "B. Negative externality", "C. Public good", "D. Information asymmetry"],
        options_cn: ["A. 正外部性", "B. 负外部性", "C. 公共物品", "D. 信息不对称"],
        answer: 1,
        explanation_en: "Negative externality occurs when an economic activity imposes costs on third parties not involved in the transaction. Pollution is a classic negative externality.",
        explanation_cn: "负外部性发生在经济活动给未参与交易的第三方带来成本时。污染是典型的负外部性。",
    },
    {
        id: 33,
        question_en: "Which of the following is a characteristic of public goods?",
        question_cn: "以下哪项是公共物品的特征？",
        options_en: ["A. Excludability and rivalry", "B. Non-excludability and non-rivalry", "C. Excludability and non-rivalry", "D. Non-excludability and rivalry"],
        options_cn: ["A. 排他性和竞争性", "B. 非排他性和非竞争性", "C. 排他性和非竞争性", "D. 非排他性和竞争性"],
        answer: 1,
        explanation_en: "Public goods are both non-excludable (cannot prevent people from using) and non-rivalrous (one person's use doesn't reduce availability to others). Examples: street lighting, national defense.",
        explanation_cn: "公共物品具有非排他性（无法阻止人们使用）和非竞争性（一个人的使用不会减少他人的可用性）。例如：路灯、国防。",
    },
    {
        id: 34,
        question_en: "In the used car market, sellers know more about car quality than buyers. This leads to 'lemons problem', which is an example of:",
        question_cn: "二手车市场中，卖家比买家更了解车况，导致'柠檬问题'，这是以下哪种情况的例子？",
        options_en: ["A. Moral hazard", "B. Adverse selection", "C. Negative externality", "D. Monopoly power"],
        options_cn: ["A. 道德风险", "B. 逆向选择", "C. 负外部性", "D. 垄断权力"],
        answer: 1,
        explanation_en: "Adverse selection occurs when asymmetric information leads to bad risks driving out good ones. In used car markets, poor quality cars (lemons) dominate because buyers can't distinguish quality.",
        explanation_cn: "逆向选择发生在信息不对称导致劣质风险驱逐优质风险时。二手车市场中，劣质车（柠檬）占主导，因为买家无法区分质量。",
    },
    {
        id: 35,
        question_en: "Monopoly creates deadweight loss because:",
        question_cn: "垄断造成无谓损失，因为：",
        options_en: ["A. Monopolists produce too much output", "B. Monopoly prices are lower than competitive prices", "C. Some mutually beneficial transactions do not occur", "D. Monopolists have higher production costs"],
        options_cn: ["A. 垄断者生产过多产出", "B. 垄断价格低于竞争价格", "C. 一些互利交易没有发生", "D. 垄断者生产成本更高"],
        answer: 2,
        explanation_en: "Deadweight loss represents the loss of total surplus that occurs when the monopoly restricts output and raises price above marginal cost, preventing some transactions that would benefit both buyers and sellers.",
        explanation_cn: "无谓损失表示当垄断者限制产出并将价格提高到边际成本以上时，导致总剩余损失，阻止了一些对买卖双方都有利的交易。",
    },
    {
        id: 36,
        question_en: "A common government intervention to correct negative externalities is:",
        question_cn: "纠正负外部性的常见政府干预措施是：",
        options_en: ["A. Price ceiling", "B. Pigouvian tax", "C. Subsidy to producers", "D. Deregulation"],
        options_cn: ["A. 价格上限", "B. 庇古税", "C. 生产者补贴", "D. 放松管制"],
        answer: 1,
        explanation_en: "Pigouvian tax (named after economist Arthur Pigou) internalizes the externality by imposing a tax equal to the external cost, making producers bear the full social cost.",
        explanation_cn: "庇古税（以经济学家阿瑟·庇古命名）通过征收等于外部成本的税来内部化外部性，使生产者承担全部社会成本。",
    },
    {
        id: 37,
        question_en: "During marathon events, hotel prices surge over 500%. This case primarily involves:",
        question_cn: "马拉松赛事期间，酒店价格暴涨超500%。这个案例主要涉及：",
        options_en: ["A. Public goods and free rider problem", "B. Information asymmetry and negative externality", "C. Monopoly and deadweight loss", "D. Positive externality and subsidies"],
        options_cn: ["A. 公共物品和搭便车问题", "B. 信息不对称和负外部性", "C. 垄断和无谓损失", "D. 正外部性和补贴"],
        answer: 1,
        explanation_en: "Hotels exploit information asymmetry (knowing participants have limited alternatives) and create negative externalities (imposing high costs on marathon attendees). Government price investigation is a corrective intervention.",
        explanation_cn: "酒店利用信息不对称（知道参与者选择有限）并产生负外部性（给马拉松参与者带来高成本）。政府价格调查是一种纠正干预。",
    },
    {
        id: 38,
        question_en: "The wholesale-retail inversion in Anhui electricity market, where wholesale prices exceed retail prices, is mainly caused by:",
        question_cn: "安徽电力市场批零倒挂（批发价高于零售价）主要是由以下哪种情况引起的？",
        options_en: ["A. Perfect competition", "B. Oligopoly collusion", "C. Positive externality", "D. Public good provision"],
        options_cn: ["A. 完全竞争", "B. 寡头勾结", "C. 正外部性", "D. 公共物品提供"],
        answer: 1,
        explanation_en: "Three major power plants controlling over 70% of coal-fired capacity engaged in collusive pricing, artificially inflating wholesale prices. This is a market failure due to imperfect competition (oligopoly).",
        explanation_cn: "三大发电企业控制着超70%的煤电产能，进行串通定价，人为抬高批发价格。这是由不完全竞争（寡头垄断）导致的市场失灵。",
    },
    {
        id: 39,
        question_en: "The sugarcane glut in Guangzhou Nansha, where farmers held onto produce expecting price increases but faced huge losses, illustrates:",
        question_cn: "广州南沙甘蔗滞销，蔗农囤积甘蔗期望价格上涨却面临巨大损失，说明了：",
        options_en: ["A. Efficient market adjustment", "B. Information asymmetry and coordination failure", "C. Positive externality from farming", "D. Monopoly power of farmers"],
        options_cn: ["A. 有效的市场调节", "B. 信息不对称和协调失败", "C. 农业的正外部性", "D. 农民的垄断权力"],
        answer: 1,
        explanation_en: "Farmers had imperfect information about market conditions and made speculative decisions. Individual rationality led to collective losses—a classic coordination failure in markets.",
        explanation_cn: "蔗农对市场状况的信息不完全，并做出投机决策。个体理性导致集体损失——市场中典型的协调失败。",
    },
    {
        id: 40,
        question_en: "Pareto optimality is achieved when:",
        question_cn: "帕累托最优在以下情况下实现：",
        options_en: ["A. Everyone has equal income", "B. No one can be made better off without making someone else worse off", "C. Total output is maximized", "D. Government intervention is minimized"],
        options_cn: ["A. 每个人收入相等", "B. 在不使任何人境况变差的前提下，不可能再使某些人境况变得更好", "C. 总产出最大化", "D. 政府干预最小化"],
        answer: 1,
        explanation_en: "Pareto optimality (or Pareto efficiency) is a state where resources are allocated such that no individual can be made better off without making at least one individual worse off.",
        explanation_cn: "帕累托最优（或帕累托效率）是一种资源分配状态，在不使至少一个人境况变差的前提下，不可能再使任何人的境况变得更好。",
    },
];

// ================ Market Failure Flashcards Data ================
const marketFailureFlashcardsData = [
    {
        id: 41,
        term_en: "Market Failure",
        definition_cn: "市场失灵 - 自由市场无法有效配置资源，导致非帕累托最优的结果",
        definition_en: "The free market's inability to allocate resources efficiently, resulting in outcomes that are not Pareto optimal",
        example_en: "Marathon hotel price surges (500% increase) exploit participants' inelastic demand",
        example_cn: "马拉松酒店价格暴涨（500%涨幅）利用参与者的刚性需求",
    },
    {
        id: 42,
        term_en: "Externality",
        definition_cn: "外部性 - 经济活动对未参与交易的第三方产生的成本或收益",
        definition_en: "Costs or benefits of an economic activity that affect third parties not directly involved",
        example_en: "Factory pollution harms local residents (negative externality)",
        example_cn: "工厂污染损害当地居民（负外部性）",
    },
    {
        id: 43,
        term_en: "Negative Externality",
        definition_cn: "负外部性 - 经济活动给第三方带来成本（如污染、噪音）",
        definition_en: "When an economic activity imposes costs on third parties (e.g., pollution, noise)",
        example_en: "Cigarette smoking causing health problems for non-smokers",
        example_cn: "吸烟导致非吸烟者的健康问题",
    },
    {
        id: 44,
        term_en: "Positive Externality",
        definition_cn: "正外部性 - 经济活动给第三方带来收益（如教育、疫苗接种）",
        definition_en: "When an economic activity provides benefits to third parties (e.g., education, vaccination)",
        example_en: "Beekeeper's bees pollinate neighboring farms' crops",
        example_cn: "养蜂人的蜜蜂为邻近农场的作物授粉",
    },
    {
        id: 45,
        term_en: "Public Good",
        definition_cn: "公共物品 - 具有非排他性和非竞争性的物品（如国防、路灯）",
        definition_en: "Goods that are non-excludable and non-rivalrous (e.g., national defense, street lighting)",
        example_en: "Public fireworks display: everyone can watch without reducing others' enjoyment",
        example_cn: "公共烟花表演：每个人都可以观看，不会减少他人的享受",
    },
    {
        id: 46,
        term_en: "Free Rider Problem",
        definition_cn: "搭便车问题 - 个人享受公共物品收益而不承担成本的行为",
        definition_en: "When individuals benefit from public goods without paying for them",
        example_en: "Some countries rely on others' COVID-19 vaccine research without contributing",
        example_cn: "一些国家依赖其他国家的COVID-19疫苗研究而不做出贡献",
    },
    {
        id: 47,
        term_en: "Information Asymmetry",
        definition_cn: "信息不对称 - 交易中一方比另一方拥有更多或更好的信息",
        definition_en: "When one party in a transaction has more or better information than the other",
        example_en: "Used car sellers know more about vehicle quality than buyers",
        example_cn: "二手车卖家比买家更了解车况",
    },
    {
        id: 48,
        term_en: "Adverse Selection",
        definition_cn: "逆向选择 - 信息不对称导致劣质产品驱逐优质产品",
        definition_en: "When asymmetric information causes bad risks to drive out good ones",
        example_en: "In health insurance, high-risk individuals are more likely to purchase coverage",
        example_cn: "在健康保险中，高风险个体更可能购买保险",
    },
    {
        id: 49,
        term_en: "Moral Hazard",
        definition_cn: "道德风险 - 一方在协议后采取风险行为的倾向（因为成本由另一方承担）",
        definition_en: "The tendency to take greater risks when protected from the consequences",
        example_en: "After purchasing car insurance, drivers may be less cautious",
        example_cn: "购买汽车保险后，驾驶员可能不那么谨慎",
    },
    {
        id: 50,
        term_en: "Monopoly",
        definition_cn: "垄断 - 市场中只有一个卖者，具有价格控制能力",
        definition_en: "A market structure with a single seller who has price-setting power",
        example_en: "Local utility companies often have monopoly over water/electricity supply",
        example_cn: "地方公用事业公司通常对水/电供应具有垄断地位",
    },
    {
        id: 51,
        term_en: "Deadweight Loss",
        definition_cn: "无谓损失 - 由于市场扭曲（如垄断、税收）导致的总剩余损失",
        definition_en: "Loss of total surplus due to market distortion (e.g., monopoly, tax)",
        example_en: "Monopoly restricts output, preventing mutually beneficial transactions",
        example_cn: "垄断限制产出，阻止了互利交易",
    },
    {
        id: 52,
        term_en: "Pareto Optimality",
        definition_cn: "帕累托最优 - 在不使任何人境况变差的前提下，不可能再使某些人境况变得更好的状态",
        definition_en: "A state where no individual can be made better off without making someone else worse off",
        example_en: "Competitive market equilibrium is typically Pareto optimal",
        example_cn: "竞争性市场均衡通常是帕累托最优的",
    },
    {
        id: 53,
        term_en: "Government Intervention",
        definition_cn: "政府干预 - 政府通过政策纠正市场失灵（如税收、管制、公共提供）",
        definition_en: "Government policies to correct market failures (e.g., taxes, regulation, public provision)",
        example_en: "Pigouvian tax on carbon emissions to reduce pollution",
        example_cn: "对碳排放征收庇古税以减少污染",
    },
    {
        id: 54,
        term_en: "Pigouvian Tax",
        definition_cn: "庇古税 - 旨在纠正负外部性的税收，使外部成本内部化",
        definition_en: "A tax designed to correct negative externalities by internalizing external costs",
        example_en: "Carbon tax on fossil fuel consumption",
        example_cn: "对化石燃料消费征收碳税",
    },
    {
        id: 55,
        term_en: "Coase Theorem",
        definition_cn: "科斯定理 - 如果交易成本为零，产权明确，市场可以自行解决外部性问题",
        definition_en: "If transaction costs are zero and property rights are clearly defined, markets can solve externality problems on their own",
        example_en: "Factory and residents negotiate compensation for pollution",
        example_cn: "工厂和居民就污染补偿进行谈判",
    },
    {
        id: 56,
        term_en: "Regulation",
        definition_cn: "管制 - 政府通过规则限制经济活动（如排放标准、价格控制）",
        definition_en: "Government rules that restrict economic activities (e.g., emission standards, price controls)",
        example_en: "Clean Air Act limits industrial pollutant emissions",
        example_cn: "《清洁空气法》限制工业污染物排放",
    },
    {
        id: 57,
        term_en: "Public Provision",
        definition_cn: "公共提供 - 政府直接提供公共物品或服务（如国防、基础教育）",
        definition_en: "Government directly provides public goods or services (e.g., national defense, basic education)",
        example_en: "Public schools funded by tax revenue",
        example_cn: "由税收资助的公立学校",
    },
    {
        id: 58,
        term_en: "Market Power",
        definition_cn: "市场权力 - 企业影响市场价格的能力（如垄断、寡头）",
        definition_en: "A firm's ability to influence market prices (e.g., monopoly, oligopoly)",
        example_en: "Tech giants setting prices above competitive levels",
        example_cn: "科技巨头将价格设定在竞争水平之上",
    },
    {
        id: 59,
        term_en: "Imperfect Competition",
        definition_cn: "不完全竞争 - 企业具有一定程度市场权力的市场结构（如垄断竞争、寡头）",
        definition_en: "Market structures where firms have some degree of market power (e.g., monopolistic competition, oligopoly)",
        example_en: "Smartphone market with few dominant brands",
        example_cn: "智能手机市场由少数主导品牌控制",
    },
    {
        id: 60,
        term_en: "Tragedy of the Commons",
        definition_cn: "公地悲剧 - 共享资源因个体理性使用而导致资源耗竭",
        definition_en: "Depletion of shared resources due to individual rational use",
        example_en: "Overfishing in international waters",
        example_cn: "国际水域的过度捕捞",
    },
];

// ================ Imperfect Competition Quiz Data ================
const imperfectCompetitionQuizData = [
    {
        id: 41,
        type: "multiple_choice",
        question_en: "Which market structure has the largest number of firms?",
        question_cn: "以下哪种市场结构的企业数量最多？",
        options_en: ["Perfect competition", "Monopolistic competition", "Oligopoly", "Monopoly"],
        options_cn: ["完全竞争", "垄断竞争", "寡头垄断", "垄断"],
        answer: 0,
        explanation_en: "Perfect competition assumes many small firms, each with no market power.",
        explanation_cn: "完全竞争假设有许多小企业，每个企业都没有市场权力。"
    },
    {
        id: 42,
        type: "true_false",
        question_en: "Monopoly firms always earn economic profit.",
        question_cn: "垄断企业总是能获得经济利润。",
        options_en: ["True", "False"],
        options_cn: ["正确", "错误"],
        answer: 1,
        explanation_en: "While monopolies can earn economic profit in the short run, they may face regulation, competition, or fixed costs that eliminate profits in the long run.",
        explanation_cn: "虽然垄断企业短期内可以获得经济利润，但长期可能面临监管、竞争或固定成本，从而消除利润。"
    },
    {
        id: 43,
        type: "multiple_choice",
        question_en: "Which condition is NOT required for price discrimination to be effective?",
        question_cn: "价格歧视要有效实施，不需要以下哪个条件？",
        options_en: ["Market segmentation", "Prevention of arbitrage", "Different demand elasticities", "Government approval"],
        options_cn: ["市场分割", "防止套利", "不同需求弹性", "政府批准"],
        answer: 3,
        explanation_en: "Price discrimination requires: 1) market power, 2) ability to segment markets, 3) prevention of resale/arbitrage, and 4) different demand elasticities. Government approval is not inherently required.",
        explanation_cn: "价格歧视需要：1) 市场权力，2) 分割市场的能力，3) 防止转售/套利，4) 不同需求弹性。政府批准并非固有要求。"
    },
    {
        id: 44,
        type: "multiple_choice",
        question_en: "What does the Herfindahl-Hirschman Index (HHI) measure?",
        question_cn: "赫芬达尔-赫希曼指数（HHI）衡量什么？",
        options_en: ["Market concentration", "Price elasticity", "Consumer surplus", "Production efficiency"],
        options_cn: ["市场集中度", "价格弹性", "消费者剩余", "生产效率"],
        answer: 0,
        explanation_en: "HHI is calculated as the sum of squares of market shares of all firms in the market. Higher HHI indicates more concentration (less competition).",
        explanation_cn: "HHI计算为市场中所有企业市场份额的平方和。HHI越高表明集中度越高（竞争越少）。"
    },
    {
        id: 45,
        type: "true_false",
        question_en: "In oligopoly markets, firms make decisions independently.",
        question_cn: "寡头市场中企业决策相互独立。",
        options_en: ["True", "False"],
        options_cn: ["正确", "错误"],
        answer: 1,
        explanation_en: "Oligopoly is characterized by strategic interdependence: each firm's decisions affect others and must consider competitors' likely responses.",
        explanation_cn: "寡头垄断的特征是战略相互依赖：每家企业的决策都会影响其他企业，并且必须考虑竞争对手的可能反应。"
    },
    {
        id: 46,
        type: "ordering",
        question_en: "Rank the following antitrust policy tools from weakest to strongest intervention intensity:",
        question_cn: "将以下反垄断政策工具按干预强度从弱到强排序：",
        options_en: ["Information disclosure", "Behavioral regulation", "Structural breakup", "Nationalization"],
        options_cn: ["信息公开", "行为监管", "结构拆分", "国有化"],
        answer: [0, 1, 2, 3],
        explanation_en: "Information disclosure is the lightest intervention, followed by behavioral regulation (rules on conduct), structural breakup (forcing divestiture), and nationalization (state ownership) as the strongest.",
        explanation_cn: "信息公开是最轻的干预，其次是行为监管（行为规则），结构拆分（强制剥离），国有化（国家所有权）是最强的。"
    },
    {
        id: 47,
        type: "matching",
        question_en: "Match each real-world case with the most relevant market structure:",
        question_cn: "将每个现实案例与最相关的市场结构类型匹配：",
        options_en: ["Concrete association price fixing", "Memory chip price surge", "Food delivery platform investigation", "Big data price discrimination"],
        options_cn: ["混凝土协会价格垄断", "内存条价格暴涨", "外卖平台竞争调查", "大数据价格歧视"],
        matching_pairs: [
            {"case": 0, "market_structure": 1},
            {"case": 1, "market_structure": 1},
            {"case": 2, "market_structure": 1},
            {"case": 3, "market_structure": 2}
        ],
        market_structure_options_en: ["Perfect competition", "Oligopoly", "Monopolistic competition", "Monopoly"],
        market_structure_options_cn: ["完全竞争", "寡头垄断", "垄断竞争", "垄断"],
        explanation_en: "Concrete association price fixing, memory chip markets, and food delivery platforms are classic oligopolies (few dominant firms). Big data price discrimination is often practiced by firms with market power, typically in monopolistic competition or monopoly settings.",
        explanation_cn: "混凝土协会价格垄断、内存条市场和外卖平台是典型的寡头垄断（少数主导企业）。大数据价格歧视通常由具有市场权力的企业实施，多见于垄断竞争或垄断环境。"
    },
    {
        id: 48,
        type: "multiple_choice",
        question_en: "In the Cournot model of oligopoly, total industry output compared to perfect competition is:",
        question_cn: "在寡头垄断的古诺模型中，行业总产出与完全竞争相比：",
        options_en: ["Higher than perfect competition", "Lower than perfect competition but higher than monopoly", "Equal to monopoly output", "Unpredictable"],
        options_cn: ["高于完全竞争", "低于完全竞争但高于垄断", "等于垄断产出", "不可预测"],
        answer: 1,
        explanation_en: "Cournot oligopoly produces more than a monopoly (due to competition between firms) but less than perfect competition (due to market power).",
        explanation_cn: "古诺寡头垄断产出高于垄断（由于企业间竞争），但低于完全竞争（由于市场权力）。"
    },
    {
        id: 49,
        type: "multiple_choice",
        question_en: "Which of the following is a characteristic of monopolistic competition?",
        question_cn: "以下哪项是垄断竞争市场的特征？",
        options_en: ["Many firms with identical products", "Significant barriers to entry", "Product differentiation", "Single firm dominates market"],
        options_cn: ["许多企业生产相同产品", "显著的进入壁垒", "产品差异化", "单一企业主导市场"],
        answer: 2,
        explanation_en: "Monopolistic competition features many firms, free entry/exit, and product differentiation (each firm's product is slightly different).",
        explanation_cn: "垄断竞争的特征是许多企业、自由进出和产品差异化（每家企业的产品略有不同）。"
    },
    {
        id: 50,
        type: "multiple_choice",
        question_en: "What is the primary goal of antitrust policy?",
        question_cn: "反垄断政策的主要目标是什么？",
        options_en: ["To protect small businesses from competition", "To maximize government revenue", "To promote competition and prevent market power abuse", "To ensure equal prices for all consumers"],
        options_cn: ["保护小企业免受竞争", "最大化政府收入", "促进竞争和防止市场权力滥用", "确保所有消费者价格平等"],
        answer: 2,
        explanation_en: "Antitrust policy aims to maintain competitive markets, prevent monopolization, and protect consumer welfare from anti-competitive practices.",
        explanation_cn: "反垄断政策旨在维持竞争性市场，防止垄断化，保护消费者福利免受反竞争行为侵害。"
    },
    {
        id: 51,
        type: "multiple_choice",
        question_en: "In the Broadcom-VMware case, the primary market failure was:",
        question_cn: "在博通-VMware案例中，主要的市场失灵是：",
        options_en: ["Monopoly power abuse through price discrimination", "Cartel formation through price fixing", "Negative externality from pollution", "Public good underprovision"],
        options_cn: ["通过价格歧视滥用垄断权力", "通过价格垄断形成卡特尔", "污染造成的负外部性", "公共物品供应不足"],
        answer: 0,
        explanation_en: "Broadcom's 1000% price increase for VMware subscriptions after acquisition is a classic example of monopoly power abuse through price discrimination and bundling.",
        explanation_cn: "博通在收购后将VMware订阅价格提高1000%，是通过价格歧视和捆绑销售滥用垄断权力的典型案例。"
    },
    {
        id: 52,
        type: "multiple_choice",
        question_en: "Which model of oligopoly assumes firms compete by setting quantities rather than prices?",
        question_cn: "哪种寡头垄断模型假设企业通过设定产量而非价格来竞争？",
        options_en: ["Bertrand model", "Cournot model", "Stackelberg model", "Hotelling model"],
        options_cn: ["伯川德模型", "古诺模型", "斯塔克尔伯格模型", "霍特林模型"],
        answer: 1,
        explanation_en: "The Cournot model assumes firms choose quantities simultaneously; market price then adjusts to clear the market.",
        explanation_cn: "古诺模型假设企业同时选择产量；然后市场价格调整以出清市场。"
    }
];

// ================ Imperfect Competition Flashcards Data ================
const imperfectCompetitionFlashcardsData = [
    {
        id: 61,
        term_en: "Perfect Competition",
        term_cn: "完全竞争",
        definition_en: "A market structure characterized by many small firms, identical products, perfect information, free entry and exit, and firms as price takers.",
        definition_cn: "一种市场结构，其特征是许多小企业、产品同质、信息完全、自由进出、企业是价格接受者。",
        example_en: "Agricultural markets for staple crops like wheat or corn, where numerous farmers sell homogeneous products and have no control over market price.",
        example_cn: "小麦或玉米等主要农产品的农业市场，众多农民销售同质产品，无法控制市场价格。",
        policy_implications_en: "No antitrust intervention needed; market is self‑regulating. Government role limited to ensuring conditions (information, mobility) are maintained.",
        policy_implications_cn: "无需反垄断干预；市场自我调节。政府角色仅限于确保维持条件（信息、流动性）。",
        historical_context_en: "Concept developed by classical economists (Adam Smith) and refined by neoclassical economics as an ideal benchmark for efficiency.",
        historical_context_cn: "由古典经济学家（亚当·斯密）提出，经新古典经济学完善，作为效率的理想基准。",
        common_mistakes_en: "Confusing perfect competition with 'many firms' alone; ignoring the requirements of identical products, perfect information, and free entry/exit.",
        common_mistakes_cn: "将完全竞争与单纯的'许多企业'混淆；忽略产品同质、信息完全和自由进出的要求。"
    },
    {
        id: 62,
        term_en: "Monopolistic Competition",
        term_cn: "垄断竞争",
        definition_en: "Market structure with many firms, free entry/exit, and product differentiation (each firm's product is perceived as slightly different).",
        definition_cn: "一种市场结构，具有许多企业、自由进出和产品差异化（每家企业的产品被认为略有不同）。",
        example_en: "Restaurants, clothing brands, coffee shops—each offers a unique style, location, or experience while competing for similar customers.",
        example_cn: "餐厅、服装品牌、咖啡店——每家都提供独特的风格、位置或体验，同时争夺相似的顾客。",
        policy_implications_en: "Limited antitrust concern; focus on preventing false advertising and ensuring truthful product information for consumer choice.",
        policy_implications_cn: "反垄断关注有限；重点是防止虚假广告，确保产品信息真实，以保障消费者选择权。",
        historical_context_en: "Formalized by Edward Chamberlin and Joan Robinson in the 1930s, blending elements of monopoly and competition.",
        historical_context_cn: "由爱德华·张伯伦和琼·罗宾逊在20世纪30年代形式化，融合了垄断和竞争的元素。",
        common_mistakes_en: "Assuming monopolistic competition means firms have no market power; in fact, each faces a downward‑sloping demand curve due to differentiation.",
        common_mistakes_cn: "认为垄断竞争意味着企业没有市场权力；实际上，由于产品差异化，每家企业都面临向下倾斜的需求曲线。"
    },
    {
        id: 63,
        term_en: "Oligopoly",
        term_cn: "寡头垄断",
        definition_en: "Market structure dominated by a small number of large firms, with strategic interdependence (each firm's decisions affect others).",
        definition_cn: "由少数大型企业主导的市场结构，具有战略相互依赖性（每家企业的决策都会影响其他企业）。",
        example_en: "Commercial aircraft manufacturing (Boeing, Airbus), smartphone operating systems (iOS, Android), global credit‑card networks (Visa, Mastercard).",
        example_cn: "商用飞机制造（波音、空客）、智能手机操作系统（iOS、Android）、全球信用卡网络（Visa、Mastercard）。",
        policy_implications_en: "High antitrust priority; monitor collusion (price‑fixing, market‑sharing), assess mergers, and prevent abuse of collective market power.",
        policy_implications_cn: "高优先级反垄断；监控合谋（价格垄断、市场分割）、评估并购，防止集体市场权力滥用。",
        historical_context_en: "The term originates from Greek (oligos = few, polein = to sell). Formal game‑theory models developed in mid‑20th century.",
        historical_context_cn: "该术语源于希腊语（oligos = 少数，polein = 销售）。正式的博弈论模型在20世纪中期发展起来。",
        common_mistakes_en: "Treating oligopoly as merely 'few firms' without considering strategic interaction, game theory, and the possibility of collusive outcomes.",
        common_mistakes_cn: "将寡头垄断视为仅仅是'少数企业'，而不考虑战略互动、博弈论以及合谋结果的可能性。"
    },
    {
        id: 64,
        term_en: "Monopoly",
        term_cn: "垄断",
        definition_en: "Market structure with a single firm producing a good with no close substitutes, facing the entire market demand curve.",
        definition_cn: "由单一企业生产没有近似替代品的商品的市场结构，面临整个市场需求曲线。",
        example_en: "Local water utility, patented pharmaceutical drug (during patent period), operating system of a closed ecosystem (e.g., PlayStation OS).",
        example_cn: "地方水务公司、专利药品（专利期内）、封闭生态系统的操作系统（如PlayStation OS）。",
        policy_implications_en: "Core antitrust target; regulate natural monopolies, prevent anti‑competitive practices, consider breaking up firms with excessive market power.",
        policy_implications_cn: "核心反垄断目标；监管自然垄断，防止反竞争行为，考虑拆分市场权力过大的企业。",
        historical_context_en: "Monopoly power has been debated since ancient times; modern antitrust law emerged with the Sherman Act (1890) in the United States.",
        historical_context_cn: "垄断权力自古以来就备受争议；现代反垄断法随着美国《谢尔曼法案》（1890年）而出现。",
        common_mistakes_en: "Assuming monopoly always leads to high prices; in regulated industries or with threat of entry, prices may be kept near competitive levels.",
        common_mistakes_cn: "认为垄断总是导致高价；在受监管行业或面临进入威胁时，价格可能保持在接近竞争水平。"
    },
    {
        id: 65,
        term_en: "Price Discrimination",
        term_cn: "价格歧视",
        definition_en: "Selling the same product to different buyers at different prices, based on willingness‑to‑pay rather than cost differences.",
        definition_cn: "根据支付意愿而非成本差异，向不同买家以不同价格销售相同产品。",
        example_en: "Airline tickets (business vs. leisure fares), movie tickets (student/senior discounts), software (educational vs. commercial licenses).",
        example_cn: "机票（商务舱 vs. 经济舱票价）、电影票（学生/老年人折扣）、软件（教育版 vs. 商业许可）。",
        policy_implications_en: "Antitrust scrutiny when used to exclude competitors or exploit monopoly power; consumer‑protection laws address unfair discrimination.",
        policy_implications_cn: "当用于排除竞争对手或利用垄断权力时，受到反垄断审查；消费者保护法解决不公平歧视问题。",
        historical_context_en: "First analyzed by economist Arthur Pigou (1920) who classified three degrees of price discrimination.",
        historical_context_cn: "由经济学家阿瑟·庇古（1920年）首次分析，他将价格歧视分为三级。",
        common_mistakes_en: "Confusing price discrimination with price differentiation based on cost (e.g., shipping to remote areas); true discrimination relies on demand‑side factors.",
        common_mistakes_cn: "将价格歧视与基于成本的价格差异化（如运送到偏远地区）混淆；真正的歧视依赖于需求侧因素。"
    },
    {
        id: 66,
        term_en: "First‑Degree Price Discrimination",
        term_cn: "一级价格歧视",
        definition_en: "Charging each customer their maximum willingness‑to‑pay (perfect discrimination), capturing all consumer surplus.",
        definition_cn: "向每位顾客收取其最高支付意愿（完全歧视），攫取全部消费者剩余。",
        example_en: "Negotiated car sales, bespoke tailoring, personalized pricing in online markets with extensive data on individual customers.",
        example_cn: "汽车议价销售、定制裁缝、拥有大量个人客户数据的在线市场中的个性化定价。",
        policy_implications_en: "Raises equity concerns but may increase total output; hard to regulate due to information requirements.",
        policy_implications_cn: "引发公平性问题，但可能增加总产出；由于信息需求，难以监管。",
        historical_context_en: "Theoretical extreme case; real‑world approximations have increased with big data and algorithmic pricing.",
        historical_context_cn: "理论极端案例；随着大数据和算法定价的发展，现实世界的近似案例有所增加。",
        common_mistakes_en: "Thinking first‑degree discrimination requires knowing exact willingness‑to‑pay; in practice, firms use segmentation and auctions to approximate it.",
        common_mistakes_cn: "认为一级歧视需要知道确切的支付意愿；实际上，企业使用细分市场和拍卖来近似实现。"
    },
    {
        id: 67,
        term_en: "Second‑Degree Price Discrimination",
        term_cn: "二级价格歧视",
        definition_en: "Offering different price tiers based on quantity or quality purchased (e.g., bulk discounts, versioning).",
        definition_cn: "根据购买数量或质量提供不同的价格层级（如批量折扣、版本差异化）。",
        example_en: "Electricity pricing (lower per‑kWh rate for high‑volume users), software editions (basic, pro, enterprise), amusement‑park season passes.",
        example_cn: "电力定价（高用量用户每千瓦时费率较低）、软件版本（基础版、专业版、企业版）、游乐园季票。",
        policy_implications_en: "Generally tolerated if it increases output; antitrust may intervene if used to exclude competitors (e.g., predatory pricing through deep discounts).",
        policy_implications_cn: "如果增加产出，通常被容忍；如果用于排除竞争对手（如通过深度折扣进行掠夺性定价），反垄断可能干预。",
        historical_context_en: "Common in utility and software industries; economic analysis expanded with nonlinear pricing theory in the 1970s‑80s.",
        historical_context_cn: "在公用事业和软件行业中常见；20世纪70-80年代，随着非线性定价理论的发展，经济分析得到扩展。",
        common_mistakes_en: "Confusing second‑degree with third‑degree discrimination; second‑degree relies on self‑selection into different quantity/quality bundles.",
        common_mistakes_cn: "将二级歧视与三级歧视混淆；二级歧视依赖于消费者自主选择不同的数量/质量组合。"
    },
    {
        id: 68,
        term_en: "Third‑Degree Price Discrimination",
        term_cn: "三级价格歧视",
        definition_en: "Segmenting market by observable characteristics (age, location, time) and charging different prices to each segment.",
        definition_cn: "按可观察特征（年龄、地点、时间）分割市场，并向每个细分市场收取不同价格。",
        example_en: "Student/senior discounts, matinee vs. evening movie tickets, peak/off‑peak electricity rates, regional pricing for digital goods.",
        example_cn: "学生/老年人折扣、日场 vs. 晚场电影票、高峰/非高峰电价、数字商品的区域定价。",
        policy_implications_en: "Common and often legal; antitrust may challenge if it reinforces monopoly power or excludes disadvantaged groups.",
        policy_implications_cn: "常见且通常合法；如果它强化垄断权力或排除弱势群体，反垄断可能提出挑战。",
        historical_context_en: "Most frequently observed form; widespread in transportation, entertainment, and utility industries.",
        historical_context_cn: "最常观察到的形式；在交通、娱乐和公用事业行业中广泛存在。",
        common_mistakes_en: "Assuming third‑degree discrimination always harms consumers; it can expand market access (e.g., student discounts) and increase total output.",
        common_mistakes_cn: "认为三级歧视总是损害消费者；它可以扩大市场准入（如学生折扣）并增加总产出。"
    },
    {
        id: 69,
        term_en: "Nash Equilibrium",
        term_cn: "纳什均衡",
        definition_en: "In game theory, a set of strategies where no player can improve their outcome by unilaterally changing strategy, given others' strategies.",
        definition_cn: "博弈论中，给定其他参与者的策略，没有参与者可以通过单方面改变策略来改善结果的一组策略。",
        example_en: "In the prisoner's dilemma, both confessing is a Nash equilibrium (neither can benefit by changing to silence if the other confesses).",
        example_cn: "在囚徒困境中，两人都认罪是纳什均衡（如果对方认罪，任何一方都不能通过改为沉默而获益）。",
        policy_implications_en: "Helps predict outcomes in oligopoly markets; antitrust uses equilibrium analysis to assess likelihood of collusion.",
        policy_implications_cn: "有助于预测寡头垄断市场的结果；反垄断使用均衡分析来评估合谋的可能性。",
        historical_context_en: "Named after mathematician John Nash (1950); foundational concept in non‑cooperative game theory.",
        historical_context_cn: "以数学家约翰·纳什（1950年）命名；非合作博弈论的基础概念。",
        common_mistakes_en: "Assuming Nash equilibrium is socially optimal; many equilibria are inefficient (e.g., prisoner's dilemma).",
        common_mistakes_cn: "认为纳什均衡是社会最优的；许多均衡是低效的（如囚徒困境）。"
    },
    {
        id: 70,
        term_en: "Game Theory",
        term_cn: "博弈论",
        definition_en: "Mathematical study of strategic interaction among rational decision‑makers, used to analyze competition, cooperation, and conflict.",
        definition_cn: "对理性决策者之间战略互动的数学研究，用于分析竞争、合作和冲突。",
        example_en: "Analyzing pricing decisions in duopoly, bargaining between unions and management, auction design, international trade negotiations.",
        example_cn: "分析双寡头定价决策、工会与管理层之间的谈判、拍卖设计、国际贸易谈判。",
        policy_implications_en: "Informs antitrust enforcement, regulation design, and policy evaluation; helps predict firm behavior in concentrated markets.",
        policy_implications_cn: "为反垄断执法、监管设计和政策评估提供信息；有助于预测集中市场中的企业行为。",
        historical_context_en: "Pioneered by John von Neumann and Oskar Morgenstern (1944); expanded by John Nash (1950) and later researchers.",
        historical_context_cn: "由约翰·冯·诺依曼和奥斯卡·摩根斯特恩（1944年）开创；由约翰·纳什（1950年）及后来的研究者扩展。",
        common_mistakes_en: "Viewing game theory as purely competitive; it also studies cooperative solutions, repeated interaction, and credible commitments.",
        common_mistakes_cn: "将博弈论视为纯粹竞争性的；它也研究合作解决方案、重复互动和可信承诺。"
    },
    {
        id: 71,
        term_en: "Prisoner's Dilemma",
        term_cn: "囚徒困境",
        definition_en: "Classic game where individual rationality leads to a collectively worse outcome; used to illustrate why cooperation can be difficult.",
        definition_cn: "经典博弈，个体理性导致集体更差的结果；用来说明为什么合作可能很困难。",
        example_en: "Two suspects interrogated separately: each has incentive to confess (defect), even though both would be better off staying silent (cooperate).",
        example_cn: "两名嫌疑人被分开审讯：每人都有认罪（背叛）的动机，尽管两人都保持沉默（合作）会更好。",
        policy_implications_en: "Explains why cartels are unstable without enforcement mechanisms; informs antitrust leniency programs.",
        policy_implications_cn: "解释了为什么没有执行机制，卡特尔就不稳定；为反垄断宽大处理计划提供依据。",
        historical_context_en: "Formulated by mathematicians Merrill Flood and Melvin Dresher (1950); named by Albert Tucker.",
        historical_context_cn: "由数学家梅里尔·弗勒德和梅尔文·德雷舍（1950年）提出；由阿尔伯特·塔克命名。",
        common_mistakes_en: "Assuming prisoner's dilemma always produces defection; in repeated games, cooperation can emerge through tit‑for‑tat strategies.",
        common_mistakes_cn: "认为囚徒困境总是导致背叛；在重复博弈中，合作可以通过以牙还牙策略出现。"
    },
    {
        id: 72,
        term_en: "Cournot Model",
        term_cn: "古诺模型",
        definition_en: "Oligopoly model where firms choose quantities simultaneously; market price adjusts to clear total output.",
        definition_cn: "寡头垄断模型，企业同时选择产量；市场价格调整以出清总产出。",
        example_en: "Two bottled‑water producers deciding how many bottles to produce; each assumes the other's output is fixed when making its decision.",
        example_cn: "两家瓶装水生产商决定生产多少瓶水；每家企业在做决策时都假设对方的产出是固定的。",
        policy_implications_en: "Predicts higher price than perfect competition but lower than monopoly; used to assess market power in quantity‑setting industries.",
        policy_implications_cn: "预测价格高于完全竞争但低于垄断；用于评估产量设定行业中的市场权力。",
        historical_context_en: "Developed by French economist Antoine Augustin Cournot (1838); one of the earliest formal models of imperfect competition.",
        historical_context_cn: "由法国经济学家安东尼·奥古斯丁·古诺（1838年）提出；最早的不完全竞争形式化模型之一。",
        common_mistakes_en: "Confusing Cournot with Bertrand competition; Cournot assumes quantity competition, Bertrand assumes price competition.",
        common_mistakes_cn: "将古诺模型与伯川德竞争混淆；古诺假设产量竞争，伯川德假设价格竞争。"
    },
    {
        id: 73,
        term_en: "Bertrand Model",
        term_cn: "伯川德模型",
        definition_en: "Oligopoly model where firms choose prices simultaneously; consumers buy from the lowest‑price firm.",
        definition_cn: "寡头垄断模型，企业同时选择价格；消费者从价格最低的企业购买。",
        example_en: "Two gas stations on opposite corners setting daily gasoline prices; each expects to capture the entire market if it undercuts the other.",
        example_cn: "两个对角加油站设定每日汽油价格；每家企业都期望如果价格低于对方，就能占领整个市场。",
        policy_implications_en: "Predicts competitive pricing even with few firms; antitrust may still intervene if firms have capacity constraints or differentiated products.",
        policy_implications_cn: "预测即使企业很少，价格也具有竞争性；如果企业有产能约束或产品差异化，反垄断仍可能干预。",
        historical_context_en: "Proposed by French economist Joseph Bertrand (1883) as a critique of Cournot's quantity‑competition model.",
        historical_context_cn: "由法国经济学家约瑟夫·伯川德（1883年）提出，作为对古诺产量竞争模型的批判。",
        common_mistakes_en: "Assuming Bertrand competition always leads to marginal‑cost pricing; with capacity limits or product differentiation, prices may remain above marginal cost.",
        common_mistakes_cn: "认为伯川德竞争总是导致边际成本定价；在有产能限制或产品差异化的情况下，价格可能保持在边际成本以上。"
    },
    {
        id: 74,
        term_en: "Stackelberg Model",
        term_cn: "斯塔克尔伯格模型",
        definition_en: "Oligopoly model with a leader firm that sets quantity first, followed by follower firms that observe the leader's output.",
        definition_cn: "寡头垄断模型，领导者企业首先设定产量，随后跟随者企业观察领导者的产出后做出决策。",
        example_en: "A dominant smartphone manufacturer announces its production plan for the year; smaller competitors then adjust their own output accordingly.",
        example_cn: "一家主导的智能手机制造商宣布其年度生产计划；较小的竞争对手随后相应调整自己的产出。",
        policy_implications_en: "Highlights first‑mover advantages; antitrust may examine whether market dominance stems from superior efficiency or strategic pre‑emption.",
        policy_implications_cn: "凸显先发优势；反垄断可能审查市场主导地位是源于卓越效率还是战略先占。",
        historical_context_en: "Developed by German economist Heinrich von Stackelberg (1934); extends Cournot by introducing sequential moves.",
        historical_context_cn: "由德国经济学家海因里希·冯·斯塔克尔伯格（1934年）提出；通过引入顺序行动扩展了古诺模型。",
        common_mistakes_en: "Treating Stackelberg as simply Cournot with a leader; the sequential nature fundamentally changes strategic incentives and equilibrium outcomes.",
        common_mistakes_cn: "将斯塔克尔伯格模型视为简单的带领导者的古诺模型；顺序性质从根本上改变了战略激励和均衡结果。"
    },
    {
        id: 75,
        term_en: "Antitrust Policy",
        term_cn: "反垄断政策",
        definition_en: "Government laws and regulations designed to promote competition, prevent monopolization, and curb anti‑competitive practices.",
        definition_cn: "旨在促进竞争、防止垄断和遏制反竞争行为的政府法律和法规。",
        example_en: "The Sherman Act (1890) in the US, the Competition Act (2002) in India, and the Anti‑Monopoly Law (2008) in China.",
        example_cn: "美国的《谢尔曼法案》（1890年）、印度的《竞争法》（2002年）和中国的《反垄断法》（2008年）。",
        policy_implications_en: "Core tool for correcting market failures from imperfect competition; balances efficiency gains from scale against harms from market power.",
        policy_implications_cn: "纠正不完全竞争导致的市场失灵的核心工具；平衡规模带来的效率收益与市场权力造成的损害。",
        historical_context_en: "Modern antitrust emerged in late‑19th‑century America in response to industrial trusts; has since spread globally with varying approaches.",
        historical_context_cn: "现代反垄断法于19世纪末在美国出现，以应对工业托拉斯；此后在全球传播，方法各异。",
        common_mistakes_en: "Equating antitrust with protecting small firms; its primary goal is consumer welfare through competitive markets, not firm size.",
        common_mistakes_cn: "将反垄断等同于保护小企业；其主要目标是通过竞争性市场实现消费者福利，而非企业规模。"
    },
    {
        id: 76,
        term_en: "Market Concentration",
        term_cn: "市场集中度",
        definition_en: "The extent to which a small number of firms account for a large share of total market sales or output.",
        definition_cn: "少数企业占总市场销售额或产出的很大一部分的程度。",
        example_en: "CR4 = 80% means the top four firms control 80% of the market; HHI > 2500 indicates a highly concentrated market.",
        example_cn: "CR4 = 80% 意味着前四家企业控制80%的市场；HHI > 2500 表示市场高度集中。",
        policy_implications_en: "Key screening tool for antitrust enforcement; high concentration often triggers merger review and investigation of collusive behavior.",
        policy_implications_cn: "反垄断执法的关键筛选工具；高集中度通常引发并购审查和合谋行为调查。",
        historical_context_en: "Systematic measurement began in mid‑20th century with industrial organization economics; HHI adopted by US DOJ/FTC in 1982 merger guidelines.",
        historical_context_cn: "系统的测量始于20世纪中叶的产业组织经济学；HHI被美国司法部/联邦贸易委员会在1982年并购指南中采用。",
        common_mistakes_en: "Assuming concentration always correlates with market power; contestable markets or potential entry can discipline even highly concentrated industries.",
        common_mistakes_cn: "认为集中度总是与市场权力相关；可竞争市场或潜在进入可以约束甚至高度集中的行业。"
    },
    {
        id: 77,
        term_en: "Herfindahl‑Hirschman Index (HHI)",
        term_cn: "赫芬达尔-赫希曼指数（HHI）",
        definition_en: "A measure of market concentration calculated by summing the squares of the market shares of all firms in the market.",
        definition_cn: "一种市场集中度的测量方法，通过计算市场中所有企业市场份额的平方和得出。",
        example_en: "If a market has four firms with shares 40%, 30%, 20%, 10%, HHI = 1600 + 900 + 400 + 100 = 3000.",
        example_cn: "如果一个市场有四家企业，份额分别为40%、30%、20%、10%，则HHI = 1600 + 900 + 400 + 100 = 3000。",
        policy_implications_en: "Used in merger review: HHI < 1500 = unconcentrated; 1500‑2500 = moderately concentrated; >2500 = highly concentrated.",
        policy_implications_cn: "用于并购审查：HHI < 1500 = 非集中；1500‑2500 = 中度集中；>2500 = 高度集中。",
        historical_context_en: "Named after economists Orris Herfindahl (1950) and Albert Hirschman (1945); formally adopted in US antitrust guidelines in 1982.",
        historical_context_cn: "以经济学家奥里斯·赫芬达尔（1950年）和阿尔伯特·赫希曼（1945年）命名；于1982年在美国反垄断指南中正式采用。",
        common_mistakes_en: "Using HHI without defining the relevant market; the index is sensitive to market‑definition boundaries.",
        common_mistakes_cn: "未定义相关市场就使用HHI；该指数对市场界定边界敏感。"
    },
    {
        id: 78,
        term_en: "Barriers to Entry",
        term_cn: "进入壁垒",
        definition_en: "Factors that prevent or deter new competitors from entering a market, allowing existing firms to maintain market power.",
        definition_cn: "阻止或威慑新竞争者进入市场的因素，使现有企业能够维持市场权力。",
        example_en: "High capital requirements (aircraft manufacturing), patents (pharmaceuticals), network effects (social media), control of essential inputs (rare‑earth minerals).",
        example_cn: "高资本要求（飞机制造）、专利（制药）、网络效应（社交媒体）、对关键投入的控制（稀土矿物）。",
        policy_implications_en: "Antitrust scrutinizes artificial barriers (exclusive contracts, predatory pricing) more than natural ones (economies of scale, technology).",
        policy_implications_cn: "反垄断更关注人为壁垒（排他性合同、掠夺性定价），而非自然壁垒（规模经济、技术）。",
        historical_context_en: "Classified by Joe Bain (1956) into structural, strategic, and regulatory barriers; central to industrial‑organization theory.",
        historical_context_cn: "由乔·贝恩（1956年）分类为结构性、战略性和监管性壁垒；产业组织理论的核心。",
        common_mistakes_en: "Confusing entry barriers with mere cost disadvantages; true barriers refer to asymmetric conditions between incumbents and potential entrants.",
        common_mistakes_cn: "将进入壁垒与单纯的成本劣势混淆；真正的壁垒指的是在位者与潜在进入者之间的不对称条件。"
    },
    {
        id: 79,
        term_en: "Product Differentiation",
        term_cn: "产品差异化",
        definition_en: "Strategy where firms make their products distinct from competitors' (through features, branding, location) to gain market power.",
        definition_cn: "企业使其产品区别于竞争对手（通过特性、品牌、位置）以获得市场权力的策略。",
        example_en: "Smartphone brands emphasizing camera quality, battery life, or ecosystem integration; restaurants offering unique ambiance or cuisine.",
        example_cn: "智能手机品牌强调相机质量、电池寿命或生态系统集成；餐厅提供独特的氛围或美食。",
        policy_implications_en: "Can soften price competition but also spur innovation; antitrust generally tolerates differentiation unless it creates insurmountable barriers.",
        policy_implications_cn: "可以缓和价格竞争，但也刺激创新；除非造成难以克服的壁垒，反垄断通常容忍差异化。",
        historical_context_en: "Key feature of monopolistic competition theory (Chamberlin, 1933); became central to modern marketing and industrial organization.",
        historical_context_cn: "垄断竞争理论（张伯伦，1933年）的关键特征；成为现代营销和产业组织的核心。",
        common_mistakes_en: "Equating differentiation with quality; even minor perceived differences can create market power without improving actual performance.",
        common_mistakes_cn: "将差异化等同于质量；即使微小的感知差异也可能在不提高实际性能的情况下创造市场权力。"
    },
    {
        id: 80,
        term_en: "Predatory Pricing",
        term_cn: "掠夺性定价",
        definition_en: "Setting prices below cost to drive out competitors, with the intent to raise prices later and recoup losses.",
        definition_cn: "将价格设定在成本以下以驱逐竞争对手，意图在以后提高价格并弥补损失。",
        example_en: "A large retailer temporarily selling milk below wholesale price to force local grocery stores out of business.",
        example_cn: "一家大型零售商暂时以低于批发价的价格销售牛奶，迫使当地杂货店倒闭。",
        policy_implications_en: "Illegal under antitrust laws if proven; difficult to distinguish from legitimate price competition, requiring evidence of recoupment possibility.",
        policy_implications_cn: "如果得到证实，则根据反垄断法属于非法；难以与正当的价格竞争区分，需要证明弥补损失的可能性。",
        historical_context_en: "Formally analyzed by John McGee (1958); modern tests focus on whether predation is a rational strategy given market conditions.",
        historical_context_cn: "由约翰·麦吉（1958年）正式分析；现代测试侧重于根据市场条件，掠夺是否是一种理性策略。",
        common_mistakes_en: "Labeling any aggressive price cut as predatory; true predation requires below‑cost pricing, exclusionary intent, and a credible recoupment plan.",
        common_mistakes_cn: "将任何激进降价都标记为掠夺性；真正的掠夺需要低于成本定价、排他意图和可信的弥补损失计划。"
    },
    {
        id: 81,
        term_en: "Bundling",
        term_cn: "捆绑销售",
        definition_en: "Selling two or more products together as a package, often at a discount compared to buying separately.",
        definition_cn: "将两种或更多产品作为一个套餐一起销售，通常比单独购买有折扣。",
        example_en: "Microsoft Office suite (Word, Excel, PowerPoint), cable TV packages (sports, movies, news channels), fast‑food combo meals.",
        example_cn: "Microsoft Office套件（Word、Excel、PowerPoint）、有线电视套餐（体育、电影、新闻频道）、快餐套餐。",
        policy_implications_en: "Can be pro‑competitive (cost savings) or anti‑competitive (leveraging monopoly power); antitrust examines whether it forecloses competitors.",
        policy_implications_cn: "可能是促进竞争的（节省成本）或反竞争的（利用垄断权力）；反垄断审查它是否排除了竞争对手。",
        historical_context_en: "Economic analysis advanced with work on tying and leverage theories; modern cases involve software, telecommunications, and media.",
        historical_context_cn: "随着捆绑和杠杆理论的研究，经济分析得到推进；现代案例涉及软件、电信和媒体。",
        common_mistakes_en: "Assuming all bundling harms competition; mixed bundling can benefit consumers by offering choice and lowering transaction costs.",
        common_mistakes_cn: "认为所有捆绑都损害竞争；混合捆绑可以通过提供选择和降低交易成本使消费者受益。"
    },
    {
        id: 82,
        term_en: "Vertical Integration",
        term_cn: "纵向一体化",
        definition_en: "When a firm controls multiple stages of production or distribution (e.g., manufacturer also owns retail outlets).",
        definition_cn: "当一家企业控制多个生产或分销阶段时（例如，制造商也拥有零售店）。",
        example_en: "Apple designing chips, manufacturing devices, and operating retail stores; Netflix producing content and distributing it through its platform.",
        example_cn: "苹果设计芯片、制造设备并运营零售店；Netflix制作内容并通过其平台分发。",
        policy_implications_en: "Can improve efficiency but may raise foreclosure concerns; antitrust examines whether it creates barriers or facilitates collusion.",
        policy_implications_cn: "可以提高效率，但可能引发市场封锁担忧；反垄断审查是否造成壁垒或促进合谋。",
        historical_context_en: "A central theme in industrial‑organization economics; Ronald Coase (1937) explained firms' boundaries through transaction‑cost theory.",
        historical_context_cn: "产业组织经济学的中心主题；罗纳德·科斯（1937年）通过交易成本理论解释了企业的边界。",
        common_mistakes_en: "Assuming vertical integration is always anti‑competitive; often it reduces costs, improves coordination, and benefits consumers.",
        common_mistakes_cn: "认为纵向一体化总是反竞争的；通常它降低成本、改善协调并使消费者受益。"
    },
    {
        id: 83,
        term_en: "Horizontal Merger",
        term_cn: "横向合并",
        definition_en: "Merger between firms that operate at the same stage of production and sell competing products.",
        definition_cn: "在同一生产阶段运营并销售竞争产品的企业之间的合并。",
        example_en: "Two airlines merging (e.g., Delta and Northwest), two banks consolidating, two smartphone manufacturers combining.",
        example_cn: "两家航空公司合并（如达美航空和西北航空）、两家银行合并、两家智能手机制造商合并。",
        policy_implications_en: "Primary antitrust concern: increased market concentration may lead to higher prices, reduced output, or less innovation.",
        policy_implications_cn: "主要反垄断关切：市场集中度增加可能导致价格上涨、产出减少或创新减少。",
        historical_context_en: "Most heavily scrutinized merger type; modern guidelines require assessment of market definition, concentration, and competitive effects.",
        historical_context_cn: "受到最严格审查的合并类型；现代指南要求评估市场界定、集中度和竞争效应。",
        common_mistakes_en: "Equating horizontal mergers with monopoly creation; many mergers generate efficiencies that offset potential anti‑competitive effects.",
        common_mistakes_cn: "将横向合并等同于垄断形成；许多合并产生效率，抵消潜在的反竞争效应。"
    },
    {
        id: 84,
        term_en: "Cartel",
        term_cn: "卡特尔",
        definition_en: "A group of firms that collude to restrict output, raise prices, or divide markets, acting as a collective monopoly.",
        definition_cn: "一组企业合谋限制产出、提高价格或分割市场，作为集体垄断者行动。",
        example_en: "OPEC (oil‑producing countries coordinating production), concrete‑association price‑fixing case, vitamin‑manufacturer cartels of the 1990s.",
        example_cn: "欧佩克（石油生产国协调产量）、混凝土协会价格垄断案例、20世纪90年代的维生素制造商卡特尔。",
        policy_implications_en: "Illegal in most jurisdictions; antitrust authorities impose heavy fines, and leniency programs encourage self‑reporting.",
        policy_implications_cn: "在大多数司法管辖区非法；反垄断当局处以重罚，宽大处理计划鼓励自首。",
        historical_context_en: "Cartels have existed since ancient times; modern enforcement intensified with globalization and international cooperation.",
        historical_context_cn: "卡特尔自古就存在；随着全球化和国际合作，现代执法力度加大。",
        common_mistakes_en: "Assuming cartels are stable; without enforcement mechanisms, members have strong incentives to cheat, leading to breakdown.",
        common_mistakes_cn: "认为卡特尔是稳定的；没有执行机制，成员有强烈的作弊动机，导致崩溃。"
    },
    {
        id: 85,
        term_en: "Monopoly Power",
        term_cn: "垄断权力",
        definition_en: "A firm's ability to profitably raise price above competitive levels by restricting output, often measured by market share and barriers.",
        definition_cn: "企业通过限制产出，将价格提高到竞争水平以上并获利的能力，通常通过市场份额和壁垒来衡量。",
        example_en: "A patented drug with no substitutes can charge high prices; a dominant search engine can set advertising rates above competitive levels.",
        example_cn: "没有替代品的专利药物可以收取高价；主导的搜索引擎可以将广告费率设定在竞争水平以上。",
        policy_implications_en: "Central antitrust concern; intervention justified when power is acquired or maintained through anti‑competitive means, not superior efficiency.",
        policy_implications_cn: "核心反垄断关切；当权力通过反竞争手段而非卓越效率获得或维持时，干预是合理的。",
        historical_context_en: "The concept evolved from common‑law restraints on trade to structured economic analysis in the 20th century.",
        historical_context_cn: "这一概念从普通法的贸易限制演变为20世纪的结构化经济分析。",
        common_mistakes_en: "Confusing monopoly power with large market share; power requires the ability to raise price profitably, which depends on demand elasticity and entry conditions.",
        common_mistakes_cn: "将垄断权力与大的市场份额混淆；权力需要能够有利可图地提高价格，这取决于需求弹性和进入条件。"
    }
]

// ================ Factor Markets Quiz Data ================
const factorMarketsQuizData = [
    {
        "id": 53,
        "type": "multiple_choice",
        "question_en": "Which of the following is NOT considered a traditional factor of production?",
        "question_cn": "以下哪项不被视为传统生产要素？",
        "options_en": ["Labor", "Capital", "Land", "Data"],
        "options_cn": ["劳动", "资本", "土地", "数据"],
        "answer": 3,
        "explanation_en": "Traditional factors of production are labor, capital, and land. Data is recognized as the fourth factor in the digital economy era.",
        "explanation_cn": "传统生产要素是劳动、资本和土地。数据在数字经济时代被认可为第四大生产要素。"
    }
];

// ================ Factor Markets Flashcards Data ================
const factorMarketsFlashcardsData = [
    {
        "id": 86,
        "term_en": "Factor Markets",
        "term_cn": "生产要素市场",
        "definition_en": "Markets where factors of production (labor, capital, land, data) are bought and sold. Firms demand factors to produce goods; households supply factors and earn income.",
        "definition_cn": "生产要素（劳动、资本、土地、数据）买卖的市场。企业需求生产要素以生产商品；家庭供给生产要素并获得收入。",
        "example_en": "Labor market (job postings, wages), capital market (equipment leasing, interest rates), land market (rental agreements), data market (data trading platforms).",
        "example_cn": "劳动市场（招聘信息、工资）、资本市场（设备租赁、利率）、土地市场（租赁协议）、数据市场（数据交易平台）。",
        "policy_implications_en": "Factor market efficiency affects overall economic productivity. Interventions may address market failures (monopsony in labor markets, information asymmetry).",
        "policy_implications_cn": "要素市场效率影响整体经济生产率。干预措施可能针对市场失灵（劳动市场的买方垄断、信息不对称）。",
        "historical_context_en": "Classical economics identified three factors; data emerged as the fourth with digital transformation. Factor market analysis dates to Ricardo's theory of rent.",
        "historical_context_cn": "古典经济学确定了三大要素；随着数字化转型，数据成为第四大要素。要素市场分析可追溯到李嘉图的地租理论。",
        "common_mistakes_en": "Confusing factor markets with product markets; forgetting that factor demand is derived from final goods demand."
    }
];;

// ================ Global State ================
let currentLanguage = 'en';
let quizCategory = 'all';
let currentTab = 'quiz';
let flashcardsCategory = 'all';
let currentQuestion = 0;
let userAnswers = Array(quizData.concat(elasticityQuizData).concat(marketFailureQuizData).concat(imperfectCompetitionQuizData).concat(factorMarketsQuizData).length).fill(null);
let quizSubmitted = false;
let currentCard = 0;
let masteredCards = new Set(); // stores ids of mastered cards

// ================ Quiz Category Functions ================
function getCurrentQuizData() {
    if (quizCategory === 'all') {
        return quizData.concat(elasticityQuizData).concat(marketFailureQuizData).concat(imperfectCompetitionQuizData).concat(factorMarketsQuizData).concat(marketEfficiencyQuizData);
    } else if (quizCategory === 'supply') {
        return quizData;
    } else if (quizCategory === 'elasticity') {
        return elasticityQuizData;
    } else if (quizCategory === 'market_failure') {
        return marketFailureQuizData;
    } else if (quizCategory === 'imperfect_competition') {
        return imperfectCompetitionQuizData;
    } else if (quizCategory === 'factor_markets') {
        return factorMarketsQuizData;
    } else if (quizCategory === 'market_efficiency') {
        return marketEfficiencyQuizData;
    }
    return quizData;
}

function setQuizCategory(category) {
    quizCategory = category;
    // Reset quiz state when switching category
    currentQuestion = 0;
    // Use setTimeout to ensure async data is loaded
    setTimeout(() => {
        userAnswers = Array(getCurrentQuizData().length).fill(null);
        quizSubmitted = false;
        resultContainer.classList.add('hidden');
        updateQuizDisplay();
    }, 100);
    // Start data recording session
    startQuizSession(category);
}

// ================ Flashcards Category Functions ================
function getCurrentFlashcardsData() {
    if (flashcardsCategory === 'all') {
        return elasticityFlashcardsData.concat(marketFailureFlashcardsData).concat(imperfectCompetitionFlashcardsData).concat(factorMarketsFlashcardsData);
    } else if (flashcardsCategory === 'elasticity') {
        return elasticityFlashcardsData;
    } else if (flashcardsCategory === 'market_failure') {
        return marketFailureFlashcardsData;
    } else if (flashcardsCategory === 'imperfect_competition') {
        return imperfectCompetitionFlashcardsData;
    } else if (flashcardsCategory === 'factor_markets') {
        return factorMarketsFlashcardsData;
    }
    return elasticityFlashcardsData;
}

function setFlashcardsCategory(category) {
    flashcardsCategory = category;
    // Reset flashcard state when switching category
    currentCard = 0;
    updateFlashcardDisplay();
}

// ================ DOM Elements ================
const langEnBtn = document.getElementById('lang-en');
const langCnBtn = document.getElementById('lang-cn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const scoreValue = document.getElementById('score-value');
const scoreMessage = document.getElementById('score-message');
const answerReview = document.getElementById('answer-review');
const retryBtn = document.getElementById('retry-btn');
const prevCardBtn = document.getElementById('prev-card');
const nextCardBtn = document.getElementById('next-card');
const flipBtn = document.getElementById('flip-btn');
const masterBtn = document.getElementById('master-btn');
const reviewBtn = document.getElementById('review-btn');
const cardElement = document.getElementById('flashcard');
const termEnElement = document.getElementById('term-en');
const definitionCnElement = document.getElementById('definition-cn');
const definitionEnElement = document.getElementById('definition-en');
const exampleTextElement = document.getElementById('example-text');
const currentCardElement = document.getElementById('current-card');
const progressFill = document.querySelector('.progress-fill');
const progressPercent = document.getElementById('progress-percent');
const masteredCountElement = document.getElementById('mastered-count');
const categoryBtns = document.querySelectorAll('.category-btn');
const flashcardsCategoryBtns = document.querySelectorAll('.flashcards-category .category-btn');
const feedbackButtons = document.querySelectorAll('.feedback-btn');
const feedbackThankYou = document.getElementById('feedback-thankyou');
const feedbackCountElement = document.getElementById('feedback-count');

// ================ Language Switching ================
function switchLanguage(lang) {
    currentLanguage = lang;
    updateAllTexts();
    updateQuizDisplay();
    updateFlashcardDisplay();
}

function updateAllTexts() {
    const dict = translations[currentLanguage];
    // Update all elements with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
    // Update language buttons active state
    langEnBtn.classList.toggle('active', currentLanguage === 'en');
    langCnBtn.classList.toggle('active', currentLanguage === 'cn');
    // Update feedback count
    updateFeedbackCount();
}

// ================ Feedback Functions ================
function updateFeedbackCount() {
    if (!feedbackCountElement) return;
    const feedbacks = getStoredData(STORAGE_KEYS.FEEDBACKS);
    feedbackCountElement.textContent = feedbacks.length;
}

function handleFeedbackClick(difficulty) {
    // Record feedback
    recordFeedback(difficulty, '');
    
    // Show thank you message
    if (feedbackThankYou) {
        feedbackThankYou.classList.remove('hidden');
        setTimeout(() => {
            feedbackThankYou.classList.add('hidden');
        }, 3000);
    }
    
    // Update count display
    updateFeedbackCount();
    
    console.log('Feedback recorded:', difficulty);
}

// ================ Tab Switching ================
function switchTab(tabName) {
    // End previous flashcards session if switching away from flashcards
    if (currentTab === 'flashcards' && tabName !== 'flashcards' && flashcardSession) {
        endFlashcardSession();
    }
    // End previous quiz session if switching away from quiz (but quiz sessions end on submit)
    // if (currentTab === 'quiz' && tabName !== 'quiz' && quizSession) {
    //     endQuizSession(0); // optional
    // }
    
    currentTab = tabName;
    // Update tab buttons
    tabBtns.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    // Update tab contents
    tabContents.forEach(content => {
        if (content.id === tabName + '-tab') {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Start data recording session for flashcards
    if (tabName === 'flashcards' && !flashcardSession) {
        startFlashcardSession();
    }
    // Start data recording session for quiz (if not already started)
    if (tabName === 'quiz' && !quizSession) {
        startQuizSession(quizCategory);
    }
    // Note: analyzer doesn't need a dedicated session tracker as it has its own data collection
}

// ================ Quiz Functions ================
function updateQuizDisplay() {
    if (currentTab !== 'quiz') return;
    
    if (!quizSubmitted) {
        renderQuestion(currentQuestion);
        updateQuizControls();
        updateScoreDisplay();
    } else {
        showResults();
    }
}

function renderQuestion(index) {
    const currentData = getCurrentQuizData();
    const q = currentData[index];
    const lang = currentLanguage;
    
    let html = `
        <div class="question-card">
            <div class="question-text">
                ${lang === 'en' ? q.question_en : q.question_cn}
            </div>
            <div class="options">
    `;
    
    const options = lang === 'en' ? q.options_en : q.options_cn;
    options.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        const selected = userAnswers[index] === i ? 'selected' : '';
        html += `
            <div class="option ${selected}" data-index="${i}">
                <span class="option-letter">${letter}</span>
                <span class="option-text">${opt}</span>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    questionContainer.innerHTML = html;
    
    // Attach click events to options
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', () => selectOption(index, parseInt(opt.dataset.index)));
    });
}

function selectOption(qIndex, optIndex) {
    if (quizSubmitted) return;
    userAnswers[qIndex] = optIndex;
    renderQuestion(qIndex);
    
    // Record answer for data collection
    const currentData = getCurrentQuizData();
    if (currentData && currentData[qIndex]) {
        const isCorrect = optIndex === currentData[qIndex].answer;
        recordQuizAnswer(currentData[qIndex].id, optIndex, isCorrect);
    }
}

function updateQuizControls() {
    const currentData = getCurrentQuizData();
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === currentData.length - 1;
    submitBtn.classList.toggle('hidden', quizSubmitted);
}

function nextQuestion() {
    const currentData = getCurrentQuizData();
    if (currentQuestion < currentData.length - 1) {
        currentQuestion++;
        updateQuizDisplay();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuizDisplay();
    }
}

function submitQuiz() {
    quizSubmitted = true;
    // Calculate score for data collection
    const currentData = getCurrentQuizData();
    const total = currentData.length;
    let correct = 0;
    userAnswers.forEach((ans, idx) => {
        if (idx < currentData.length && ans === currentData[idx].answer) correct++;
    });
    const score = Math.round((correct / total) * 100);
    // End quiz session and record data
    endQuizSession(score);
    // Display results to user
    showResults();
    resultContainer.classList.remove('hidden');
}

function showResults() {
    const lang = currentLanguage;
    const currentData = getCurrentQuizData();
    const total = currentData.length;
    let correct = 0;
    
    // Calculate score
    userAnswers.forEach((ans, idx) => {
        if (idx < currentData.length && ans === currentData[idx].answer) correct++;
    });
    
    const score = Math.round((correct / total) * 100);
    scoreValue.textContent = score;
    
    // Score message
    let messageKey = '';
    if (score >= 90) messageKey = 'Excellent!';
    else if (score >= 70) messageKey = 'Good job!';
    else if (score >= 60) messageKey = 'Passing.';
    else messageKey = 'Needs more study.';
    
    scoreMessage.textContent = lang === 'en' 
        ? `${messageKey} You got ${correct} out of ${total} correct.` 
        : `${messageKey} 你答对了 ${correct} 题，共 ${total} 题。`;
    
    // Review answers
    let reviewHtml = '';
    currentData.forEach((q, idx) => {
        const userAns = userAnswers[idx];
        const isCorrect = userAns === q.answer;
        const options = lang === 'en' ? q.options_en : q.options_cn;
        const explanation = lang === 'en' ? q.explanation_en : q.explanation_cn;
        
        reviewHtml += `
            <div class="review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                <div class="review-question">${idx + 1}. ${lang === 'en' ? q.question_en : q.question_cn}</div>
                <div class="review-answer">
                    <strong>${dict(lang, 'your_answer')}:</strong> ${userAns !== null ? options[userAns] : dict(lang, 'no_answer')}<br>
                    <strong>${dict(lang, 'correct_answer')}:</strong> ${options[q.answer]}<br>
                    <strong>${dict(lang, 'explanation')}:</strong> ${explanation}
                </div>
            </div>
        `;
    });
    
    answerReview.innerHTML = reviewHtml;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    if (!quizSubmitted) {
        const currentData = getCurrentQuizData();
        const correct = userAnswers.filter((ans, idx) => idx < currentData.length && ans === currentData[idx].answer).length;
        const score = correct * 10;
        document.querySelector('[data-key="quiz_score"]').textContent = 
            currentLanguage === 'en' ? `Score: ${score}/100` : `得分: ${score}/100`;
    }
}

function resetQuiz() {
    userAnswers.fill(null);
    currentQuestion = 0;
    quizSubmitted = false;
    resultContainer.classList.add('hidden');
    updateQuizDisplay();
}

// Helper to get translation
function dict(lang, key) {
    return translations[lang][key];
}

// ================ Flashcards Functions ================
function updateFlashcardDisplay() {
    if (currentTab !== 'flashcards') return;
    
    const currentData = getCurrentFlashcardsData();
    const card = currentData[currentCard];
    termEnElement.textContent = card.term_en;
    definitionCnElement.textContent = card.definition_cn;
    definitionEnElement.textContent = card.definition_en;
    exampleTextElement.textContent = `${card.example_en} / ${card.example_cn}`;
    
    currentCardElement.textContent = currentCard + 1;
    
    // Update progress
    const progress = Math.round(((currentCard + 1) / currentData.length) * 100);
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = progress;
    
    // Update mastered count
    masteredCountElement.textContent = masteredCards.size;
    
    // Update button states
    masterBtn.classList.toggle('active', masteredCards.has(card.id));
    reviewBtn.classList.toggle('active', !masteredCards.has(card.id));
}

function flipCard() {
    cardElement.classList.toggle('flipped');
    // Record flip for data collection
    const currentData = getCurrentFlashcardsData();
    if (flashcardSession && currentData[currentCard]) {
        recordCardFlip(currentData[currentCard].id);
    }
}

function markMastered() {
    const currentData = getCurrentFlashcardsData();
    const card = currentData[currentCard];
    if (masteredCards.has(card.id)) {
        masteredCards.delete(card.id);
    } else {
        masteredCards.add(card.id);
    }
    updateFlashcardDisplay();
}

function markReview() {
    const currentData = getCurrentFlashcardsData();
    const card = currentData[currentCard];
    masteredCards.delete(card.id);
    updateFlashcardDisplay();
}

function nextCard() {
    const currentData = getCurrentFlashcardsData();
    if (currentCard < currentData.length - 1) {
        // End viewing of current card
        if (flashcardSession && currentData[currentCard]) {
            endCardView(currentData[currentCard].id);
        }
        currentCard++;
        cardElement.classList.remove('flipped');
        updateFlashcardDisplay();
        // Start viewing of new card
        if (flashcardSession && currentData[currentCard]) {
            startCardView(currentData[currentCard].id);
        }
    }
}

function prevCard() {
    const currentData = getCurrentFlashcardsData();
    if (currentCard > 0) {
        // End viewing of current card
        if (flashcardSession && currentData[currentCard]) {
            endCardView(currentData[currentCard].id);
        }
        currentCard--;
        cardElement.classList.remove('flipped');
        updateFlashcardDisplay();
        // Start viewing of new card
        if (flashcardSession && currentData[currentCard]) {
            startCardView(currentData[currentCard].id);
        }
    }
}

// ================ Event Listeners ================
langEnBtn.addEventListener('click', () => switchLanguage('en'));
langCnBtn.addEventListener('click', () => switchLanguage('cn'));

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', submitQuiz);
retryBtn.addEventListener('click', resetQuiz);

// Add event listeners for category buttons
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Set quiz category
        setQuizCategory(btn.dataset.category);
    });
});

// Add event listeners for flashcards category buttons
flashcardsCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        flashcardsCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Set flashcards category
        setFlashcardsCategory(btn.dataset.category);
    });
});

prevCardBtn.addEventListener('click', prevCard);
nextCardBtn.addEventListener('click', nextCard);
flipBtn.addEventListener('click', flipCard);
masterBtn.addEventListener('click', markMastered);
reviewBtn.addEventListener('click', markReview);

// Allow clicking card to flip
cardElement.addEventListener('click', flipCard);

// Add event listeners for feedback buttons
if (feedbackButtons) {
    feedbackButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const difficulty = btn.getAttribute('data-difficulty');
            handleFeedbackClick(difficulty);
        });
    });
}

// ================ Week 6: Market Efficiency Data (loaded from external JSON) ================
let marketEfficiencyQuizData = [];
let marketEfficiencyFlashcardsData = [];

// ================ Initialization ================
async function init() {
    // Load external JSON data for Week 6
    try {
        const [quizResponse, flashcardsResponse] = await Promise.all([
            fetch('week6_market_efficiency_quiz.json'),
            fetch('week6_market_efficiency_flashcards.json')
        ]);
        marketEfficiencyQuizData = await quizResponse.json();
        marketEfficiencyFlashcardsData = await flashcardsResponse.json();
        console.log('Week 6 Market Efficiency data loaded successfully');
    } catch (error) {
        console.error('Error loading Week 6 data:', error);
    }
    
    switchLanguage('en');
    switchTab('quiz');
    updateQuizDisplay();
    updateFlashcardDisplay();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}