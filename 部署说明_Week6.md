# 微观经济学第六周互动组件部署指南

## 概述
本指南说明如何将第六周市场效率与福利经济学知识点的双语互动组件部署到GitHub Pages。

## 文件清单

### 核心文件
1. **index.html** - 主页面容器
2. **script.js** - 核心逻辑和所有数据（包含第六周新内容）
3. **style.css** - 样式表
4. **README.md** - 用户指南

### 数据文件（JSON格式）
1. **market_efficiency_quiz.json** - 12道双语测验题（选择题、判断题、排序题、匹配题）
2. **market_efficiency_flashcards.json** - 22张双语概念闪卡（术语、定义、案例、政策含义等）

### 交互工具
1. **market_efficiency_analyzer.html** - 市场效率分析交互工具

### 文档
1. **data_collection_summary.json** - 数据收集机制说明
2. **部署说明_Week6.md** - 本文件

## 数据收集机制

### 已实现的功能
1. **localStorage 数据存储**：
   - `microeconomics_quiz_sessions` - 测验参与记录
   - `microeconomics_flashcard_sessions` - 闪卡浏览记录  
   - `microeconomics_user_feedback` - 用户反馈收集

2. **记录的数据项**：
   - 测验：参与次数、得分、耗时、各题答案
   - 闪卡：浏览次数、每张卡片查看时长、掌握标记
   - 反馈：内容评分、难度评价、建议意见

3. **隐私保护特性**：
   - 完全匿名化处理
   - 本地存储，用户可控
   - 符合教学伦理要求

## 第六周新增内容

### 知识测验（12题）
1. **选择题**：6题，涵盖消费者剩余、生产者剩余、帕累托效率、福利经济学定理等核心概念
2. **判断题**：2题，检验价格管制和市场失灵的理解
3. **排序题**：2题，政策工具效率和市场结构效率排序
4. **匹配题**：2题，福利经济学概念描述匹配

### 概念闪卡（22张）
涵盖以下核心概念：
- 消费者剩余 (Consumer Surplus)
- 生产者剩余 (Producer Surplus)  
- 无谓损失 (Deadweight Loss)
- 帕累托效率 (Pareto Efficiency)
- 帕累托改进 (Pareto Improvement)
- 卡尔多-希克斯效率 (Kaldor-Hicks Efficiency)
- 社会福利函数 (Social Welfare Function)
- 效用可能性边界 (Utility Possibility Frontier)
- 福利经济学第一基本定理 (First Fundamental Theorem of Welfare Economics)
- 福利经济学第二基本定理 (Second Fundamental Theorem of Welfare Economics)
- 市场效率 (Market Efficiency)
- 价格上限 (Price Ceiling)
- 价格下限 (Price Floor)
- 税收归宿 (Tax Incidence)
- 补贴 (Subsidy)
- 外部性 (Externality)
- 公共物品 (Public Good)
- 边际成本 (Marginal Cost)
- 边际收益 (Marginal Benefit)
- 配置效率 (Allocative Efficiency)
- 技术效率 (Technical Efficiency)
- 市场失灵 (Market Failure)

### 新增交互工具：市场效率分析仪
1. **核心功能**：
   - 动态展示供需曲线、均衡点、消费者剩余、生产者剩余、无谓损失
   - 支持四种预设政策场景：碳税、最低工资、药物价格上限、电动汽车补贴
   - 实时调整税率、补贴金额、价格控制水平参数
   - 实时更新效率指标和图表显示

2. **技术特性**：
   - 基于ECharts的可视化图表
   - 响应式设计，支持桌面和移动设备
   - 匿名数据收集，记录用户交互行为
   - 双语界面，完整支持中英文

## 部署到GitHub Pages

### 步骤1：更新GitHub仓库
1. 进入现有仓库：`microeconomics-interactive`
2. 或创建新仓库：`microeconomics-interactive-week6`

### 步骤2：上传新文件
1. 上传`market_efficiency_quiz.json`到仓库
2. 上传`market_efficiency_flashcards.json`到仓库
3. 上传`market_efficiency_analyzer.html`到仓库
4. 更新`index.html`和`script.js`（如果使用单文件整合）

### 步骤3：启用/更新GitHub Pages
1. 进入仓库设置 → Pages
2. 源分支选择：`main` (或 `master`)
3. 源文件夹选择：`/` (根目录)
4. 保存设置

### 步骤4：访问链接
- 部署后访问：`https://[你的用户名].github.io/microeconomics-interactive/`
- 或：`https://[你的用户名].github.io/microeconomics-interactive/index.html`

## 微信公众号嵌入

### 嵌入代码
```html
<iframe 
    src="https://[你的用户名].github.io/microeconomics-interactive/"
    width="100%" 
    height="800px"
    frameborder="0"
    scrolling="no"
    style="border: 1px solid #ddd; border-radius: 8px;"
>
</iframe>
```

### 特定组件链接
- 第六周测验：`https://[你的用户名].github.io/microeconomics-interactive/index.html#quiz?category=market_efficiency`
- 市场效率分析仪：`https://[你的用户名].github.io/microeconomics-interactive/market_efficiency_analyzer.html`

## 测试清单

### 功能测试
- [ ] 双语界面切换正常
- [ ] 第六周测验题目加载正确（12题）
- [ ] 第六周闪卡数据显示完整（22张）
- [ ] 市场效率分析仪交互流畅
- [ ] 数据收集机制工作正常
- [ ] 不同政策场景切换正常

### 兼容性测试
- [ ] Chrome/Edge/Firefox/Safari 浏览器
- [ ] iOS/Android 移动设备
- [ ] 微信公众号内置浏览器

### 性能测试
- [ ] 页面加载时间 < 3秒
- [ ] 图表渲染时间 < 1秒
- [ ] 交互响应时间 < 100ms
- [ ] 数据存储操作正常

## 数据收集与伦理

### 收集的数据类型
1. **学习行为数据**：测验参与、闪卡浏览、分析仪使用
2. **学习成效数据**：得分、正确率、政策场景选择
3. **反馈数据**：难度评价、改进建议、工具使用时长

### 伦理准则
1. **知情同意**：使用前告知数据收集目的
2. **最小必要**：只收集教学改进必要数据
3. **安全存储**：本地存储，用户可控
4. **目的限制**：仅用于教学优化
5. **匿名处理**：不收集个人身份信息

## 维护与更新

### 每周更新流程
1. 新增知识点测验题（10-12题）
2. 扩展概念闪卡库（20-25张）
3. 更新双语词典
4. 测试新增功能
5. 部署到新GitHub Pages链接

### 数据备份建议
1. 定期导出localStorage数据（如果应用服务器端存储）
2. 备份用户反馈用于内容优化
3. 保存每周学习分析报告

## 技术支持

### 常见问题
1. **图表未加载**：检查网络连接，确保ECharts CDN可访问
2. **数据不保存**：检查浏览器localStorage设置
3. **界面显示异常**：更新浏览器到最新版本
4. **分析仪卡顿**：减少数据点数量，优化性能

### 联系信息
- 项目维护：微观经济学教学智能体
- 更新频率：每周一更新
- 反馈渠道：组件内的反馈表单

---

**部署时间**：2026年4月4日  
**版本**：Week6_v1.0  
**包含内容**：市场效率与福利经济学知识点全套互动组件