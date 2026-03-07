# Interactive Components Prototype - User Guide

## Overview
This prototype provides two interactive learning tools for microeconomics students:
1. **Knowledge Quiz**: 10 multiple‑choice questions on supply & demand theory
2. **Concept Flashcards**: 20 key terms with bilingual definitions and examples

Both tools support **English/Chinese bilingual display** with seamless language switching.

## Features

### Knowledge Quiz
- **10 questions** covering core concepts of supply & demand
- **Bilingual questions and options** (EN/CN)
- **Interactive interface**: select answers, navigate between questions
- **Instant feedback**: submit to see score and detailed explanations
- **Responsive design**: works on mobile and desktop

### Concept Flashcards
- **20 cards** with essential microeconomics terminology
- **Front**: English term
- **Back**: Chinese definition + English definition + real‑life example
- **Flip animation**: click card or use flip button
- **Progress tracking**: shows card position and mastered count
- **Mastery marking**: mark cards as "mastered" or "needs review"

## How to Use

### Access the Application
Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Language Switching
- Click **EN** for English interface
- Click **中文** for Chinese interface
- All content (questions, options, definitions) will switch accordingly

### Taking the Quiz
1. Select the **Knowledge Quiz** tab
2. Read each question and click an option to select your answer
3. Use **Previous** and **Next** buttons to navigate
4. Click **Submit Quiz** when finished to see your score and review answers
5. Click **Try Again** to reset and retake

### Using Flashcards
1. Select the **Concept Flashcards** tab
2. View the **English term** on the front of the card
3. **Click the card** or press **Flip Card** to see the bilingual definition and example
4. Use **← Previous** and **Next →** buttons to navigate through cards
5. Mark cards you've learned with **Mark as Mastered**
6. Track your progress via the progress bar and mastered count

## Technical Details

### File Structure
```
outputs/互动组件/
├── index.html          # Main application
├── style.css           # Stylesheet
├── script.js           # Application logic
├── README.md           # This guide
└── (references visual assets from ../视觉资产/)

scripts/互动组件/
├── script.js           # Source code copy
└── style.css           # Stylesheet copy
```

### Data Sources
- **Quiz questions**: Based on Week 1 supply & demand curriculum
- **Flashcard terms**: 20 core microeconomics concepts from teaching materials
- **Bilingual content**: Professionally translated for accuracy

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

## Design Principles

### Visual Consistency
- Uses the same color scheme as the visual assets (`outputs/视觉资产/`)
- Primary blue (#4A90E2), accent orange (#FF9500), light yellow background
- Rounded corners, subtle shadows, clean typography

### Responsive Design
- Adapts layout for mobile screens (portrait and landscape)
- Touch‑friendly buttons and controls
- Readable font sizes on all devices

### User Experience
- Immediate visual feedback for interactions
- Clear navigation and state indicators
- Accessible to users with different language preferences

## For Developers

### Extending the Quiz
To add more questions, edit the `quizData` array in `script.js`:
```javascript
{
  id: 11,
  question_en: "...",
  question_cn: "...",
  options_en: ["A", "B", "C", "D"],
  options_cn: ["甲", "乙", "丙", "丁"],
  answer: 0, // index of correct option
  explanation_en: "...",
  explanation_cn: "..."
}
```

### Extending Flashcards
Add entries to the `flashcardsData` array:
```javascript
{
  id: 21,
  term_en: "New Term",
  definition_cn: "中文定义",
  definition_en: "English definition",
  example_en: "English example",
  example_cn: "中文例子"
}
```

### Styling Modifications
Edit `style.css` with the design system variables:
```css
:root {
  --primary-blue: #4A90E2;
  --accent-orange: #FF9500;
  --bg-yellow-light: #FFF9E6;
  /* ... */
}
```

## Support
For issues or enhancement requests, contact the development team.

---

**Version**: 1.0  
**Last Updated**: 2026‑03‑07  
**License**: Educational Use