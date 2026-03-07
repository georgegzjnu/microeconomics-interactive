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
        correct: "Correct",
        incorrect: "Incorrect",
        your_answer: "Your answer",
        correct_answer: "Correct answer",
        explanation: "Explanation"
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
        correct: "正确",
        incorrect: "错误",
        your_answer: "你的答案",
        correct_answer: "正确答案",
        explanation: "解析"
    }
};

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

// ================ Global State ================
let currentLanguage = 'en';
let currentTab = 'quiz';
let currentQuestion = 0;
let userAnswers = Array(quizData.length).fill(null);
let quizSubmitted = false;
let currentCard = 0;
let masteredCards = new Set(); // stores ids of mastered cards

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
}

// ================ Tab Switching ================
function switchTab(tabName) {
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
    const q = quizData[index];
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
}

function updateQuizControls() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === quizData.length - 1;
    submitBtn.classList.toggle('hidden', quizSubmitted);
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
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
    showResults();
    resultContainer.classList.remove('hidden');
}

function showResults() {
    const lang = currentLanguage;
    const total = quizData.length;
    let correct = 0;
    
    // Calculate score
    userAnswers.forEach((ans, idx) => {
        if (ans === quizData[idx].answer) correct++;
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
    quizData.forEach((q, idx) => {
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
        const correct = userAnswers.filter((ans, idx) => ans === quizData[idx].answer).length;
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
    
    const card = flashcardsData[currentCard];
    termEnElement.textContent = card.term_en;
    definitionCnElement.textContent = card.definition_cn;
    definitionEnElement.textContent = card.definition_en;
    exampleTextElement.textContent = `${card.example_en} / ${card.example_cn}`;
    
    currentCardElement.textContent = currentCard + 1;
    
    // Update progress
    const progress = Math.round(((currentCard + 1) / flashcardsData.length) * 100);
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
}

function markMastered() {
    const card = flashcardsData[currentCard];
    if (masteredCards.has(card.id)) {
        masteredCards.delete(card.id);
    } else {
        masteredCards.add(card.id);
    }
    updateFlashcardDisplay();
}

function markReview() {
    const card = flashcardsData[currentCard];
    masteredCards.delete(card.id);
    updateFlashcardDisplay();
}

function nextCard() {
    if (currentCard < flashcardsData.length - 1) {
        currentCard++;
        cardElement.classList.remove('flipped');
        updateFlashcardDisplay();
    }
}

function prevCard() {
    if (currentCard > 0) {
        currentCard--;
        cardElement.classList.remove('flipped');
        updateFlashcardDisplay();
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

prevCardBtn.addEventListener('click', prevCard);
nextCardBtn.addEventListener('click', nextCard);
flipBtn.addEventListener('click', flipCard);
masterBtn.addEventListener('click', markMastered);
reviewBtn.addEventListener('click', markReview);

// Allow clicking card to flip
cardElement.addEventListener('click', flipCard);

// ================ Initialization ================
function init() {
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