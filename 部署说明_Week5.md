# 微观经济学第五周互动组件部署指南

## 概述
本指南说明如何将第五周生产要素市场与收入分配知识点的双语互动组件部署到GitHub Pages。

## 文件清单

### 核心文件
1. **index.html** - 主页面容器
2. **script.js** - 核心逻辑和所有数据（包含第五周新内容）
3. **style.css** - 样式表
4. **README.md** - 用户指南

### 数据文件（JSON格式）
1. **factor_markets_quiz.json** - 12道双语测验题（选择题、判断题、排序题、匹配题）
2. **factor_markets_flashcards.json** - 25张双语概念闪卡（术语、定义、案例、政策含义等）

### 交互工具
1. **收入分配政策模拟器.html** - 交互式政策影响模拟工具
2. **洛伦兹曲线_基尼系数交互工具.html** - 可视化收入不平等工具

### 文档
1. **data_collection_summary.json** - 数据收集机制说明
2. **部署说明_Week5.md** - 本文件

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

## 第五周新增内容

### 知识测验（12题）
1. **选择题**：8题，涵盖生产要素分类、收入不平等测量、政策工具等
2. **判断题**：1题，检验派生需求概念
3. **排序题**：1题，收入分配政策工具有效性排序
4. **匹配题**：1题，经济概念与描述匹配

### 概念闪卡（25张）
涵盖以下核心概念：
- 生产要素市场 (Factor Markets)
- 派生需求 (Derived Demand)  
- 边际生产力理论 (Marginal Productivity Theory)
- 人力资本 (Human Capital)
- 经济租金 (Economic Rent)
- 洛伦兹曲线 (Lorenz Curve)
- 基尼系数 (Gini Coefficient)
- 收入不平等 (Income Inequality)
- 累进税制 (Progressive Taxation)
- 全民基本收入 (Universal Basic Income)
- 最低工资 (Minimum Wage)
- 零工经济 (Gig Economy)
- 数据作为生产要素 (Data as a Factor of Production)
- 劳动收入占GDP比重 (Labor Share of GDP)
- 寻租 (Rent-Seeking)
- 技能不匹配 (Skill Mismatch)
- 收入再分配 (Income Redistribution)
- 财富不平等 (Wealth Inequality)
- 要素流动性 (Factor Mobility)
- 要素价格均等化 (Factor Price Equalization)
- 边际收益产品 (Marginal Revenue Product)
- 补偿性工资差异 (Compensating Wage Differential)
- 要素替代 (Factor Substitution)
- 要素禀赋 (Factor Endowment)

### 新增交互工具
1. **收入分配政策模拟器**：
   - 调整累进税率、最低工资、教育补贴、UBI等政策参数
   - 实时观察对基尼系数和收入份额的影响
   - 双语界面，支持中英文切换

## 部署到GitHub Pages

### 步骤1：创建GitHub仓库
1. 登录GitHub，创建新仓库
2. 仓库名：`microeconomics-interactive-week5`
3. 公开仓库
4. 包含README文件

### 步骤2：上传文件
1. 将`outputs/互动组件/`目录下的所有文件上传到仓库
2. 确保文件结构保持原样

### 步骤3：启用GitHub Pages
1. 进入仓库设置 → Pages
2. 源分支选择：`main` (或 `master`)
3. 源文件夹选择：`/` (根目录)
4. 保存设置

### 步骤4：访问链接
- 部署后访问：`https://[你的用户名].github.io/microeconomics-interactive-week5/`
- 或：`https://[你的用户名].github.io/microeconomics-interactive-week5/index.html`

## 微信公众号嵌入

### 嵌入代码
```html
<iframe 
    src="https://[你的用户名].github.io/microeconomics-interactive-week5/"
    width="100%" 
    height="800px"
    frameborder="0"
    scrolling="no"
    style="border: 1px solid #ddd; border-radius: 8px;"
>
</iframe>
```

### 移动端适配
- 响应式设计，支持各种屏幕尺寸
- 触摸友好的界面元素
- 优化加载速度

## 测试清单

### 功能测试
- [ ] 双语界面切换正常
- [ ] 测验题目加载正确（12题）
- [ ] 闪卡数据显示完整（25张）
- [ ] 数据收集机制工作正常
- [ ] 政策模拟器交互流畅

### 兼容性测试
- [ ] Chrome/Edge/Firefox/Safari 浏览器
- [ ] iOS/Android 移动设备
- [ ] 微信公众号内置浏览器

### 性能测试
- [ ] 页面加载时间 < 3秒
- [ ] 交互响应时间 < 100ms
- [ ] 数据存储操作正常

## 数据收集与伦理

### 收集的数据类型
1. **学习行为数据**：测验参与、闪卡浏览
2. **学习成效数据**：得分、正确率、掌握情况
3. **反馈数据**：内容评价、改进建议

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
1. **页面加载慢**：检查网络连接，清理浏览器缓存
2. **数据不保存**：检查浏览器localStorage设置
3. **界面显示异常**：更新浏览器到最新版本

### 联系信息
- 项目维护：微观经济学教学智能体
- 更新频率：每周一更新
- 反馈渠道：组件内的反馈表单

---

**部署时间**：2026年4月2日  
**版本**：Week5_v1.0  
**包含内容**：生产要素市场与收入分配知识点全套互动组件