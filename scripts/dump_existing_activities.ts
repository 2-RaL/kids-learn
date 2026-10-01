import { LEARNING_MODULES } from '../src/data/learningModulesData';

LEARNING_MODULES.forEach((m, idx) => {
  console.log(`=== Module ${idx + 1}: ${m.id} (${m.titleAz}) - Total: ${m.activities.length} ===`);
  m.activities.forEach((a, aIdx) => {
    const hasLesson = a.lesson ? `[LESSON: ${a.lesson.conceptTitleAz}]` : '';
    console.log(`  ${aIdx + 1}. [${a.id}] (${a.type}) ${a.title} ${hasLesson}`);
  });
});
