import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// 1. Sanitize hero SVGs (remove any clipped typewriter bounding boxes)
function sanitizeHero(filePath, isDark) {
  if (!existsSync(filePath)) return;
  let svg = readFileSync(filePath, "utf8");
  const textColor = isDark ? "#bfc8cb" : "#3f484b";
  const accentColor = isDark ? "#85d2e8" : "#00687b";
  const p1 = svg.indexOf('<clipPath id="tc0"');
  const p2 = svg.indexOf('<g class="pop"', p1);
  if (p1 !== -1 && p2 !== -1) {
    const replacement = `<g class="up" style="animation-delay:0.30s">
  <text x="294.0" y="194.0" fill="${textColor}" text-anchor="start" style="font-size:18px;font-weight:400;">풀스택 웹 애플리케이션과 AI 기반 도구를 개발합니다.</text>
  <text x="294.0" y="220.0" fill="${accentColor}" text-anchor="start" style="font-size:16px;font-weight:500;">Full-Stack Web Applications &amp; AI Tools</text>
</g>
`;
    svg = svg.slice(0, p1) + replacement + svg.slice(p2);
    writeFileSync(filePath, svg);
    console.log(`Sanitized ${filePath}`);
  }
}

sanitizeHero("assets/hero-dark.svg", true);
sanitizeHero("assets/hero-light.svg", false);

// 2. Write Korean README.md
const lines = [
  '<div align="center">',
  '',
  '<!-- 1. 히어로 배너 (Hero Banner) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg"><img src="assets/hero-light.svg" width="100%" alt="Junyoung Kim — Full-Stack · AI Developer"></picture>',
  '',
  '<!-- 2. 연락처 배지 (Contacts / Badges) -->',
  '<a href="mailto:1090jun@gmail.com"><picture><source media="(prefers-color-scheme: dark)" srcset="contact-gmail-dark.svg"><img src="contact-gmail-light.svg" width="42%" alt="Gmail 주소"></picture></a>&nbsp;&nbsp;<a href="mailto:1090jun@naver.com"><picture><source media="(prefers-color-scheme: dark)" srcset="contact-naver-dark.svg"><img src="contact-naver-light.svg" width="42%" alt="네이버 메일"></picture></a>',
  '',
  '<!-- 3. 소개 섹션 (About Me) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-about-dark.svg"><img src="./profile-assets/premium-about-light.svg" width="100%" alt="소개 (About Me)"></picture>',
  '',
  '<!-- 4. 깃허브 통계 (GitHub Stats) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="assets/stats-dark.svg"><img src="assets/stats-light.svg" width="100%" alt="GitHub Analytics"></picture>',
  '',
  '<!-- 5. 연속 커밋 잔디 (Contribution Streak) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="assets/streak-dark.svg"><img src="assets/streak-light.svg" width="100%" alt="Contribution Streak"></picture>',
  '',
  '<!-- 6. 기술 스택 (Tech Stack) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="./tech-stack-dark.svg"><img src="./tech-stack-light.svg" width="100%" alt="기술 스택 (Tech Stack)"></picture>',
  '',
  '<!-- 7. 핵심 역량 (What I Bring) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-bring-dark.svg"><img src="./profile-assets/premium-bring-light.svg" width="100%" alt="핵심 역량 (What I Bring)"></picture>',
  '',
  '<!-- 8. 전문 분야 & 관심사 (Professional Focus) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-focus-dark.svg"><img src="./profile-assets/premium-focus-light.svg" width="100%" alt="전문 분야 (Professional Focus)"></picture>',
  '',
  '<!-- 9. 연락처 채널 (Connect With Me) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-connect-dark.svg"><img src="./profile-assets/premium-connect-light.svg" width="100%" alt="연락처 &amp; 채널 (Connect With Me)"></picture>',
  '',
  '<!-- 10. 협업 & 기회 (Open to Opportunities) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-opportunities-dark.svg"><img src="./profile-assets/premium-opportunities-light.svg" width="100%" alt="협업 &amp; 기회 (Open to Opportunities)"></picture>',
  '',
  '<!-- 11. 프로필 방문자 수 (Profile Visits) -->',
  '<picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-visitor-counter-dark.svg"><img src="./profile-assets/premium-visitor-counter-light.svg" width="100%" alt="방문자 수 (Profile Visits)"></picture>',
  '<img src="https://komarev.com/ghpvc/?username=6-n0kim&amp;label=VISITORS&amp;color=00D9FF&amp;style=for-the-badge" alt="실시간 방문자 수">',
  '',
  '</div>',
  '',
  '<div align="center">',
  '<!-- 12. 바로가기 링크 버튼 (Quick Action Links) -->',
  '<a href="https://github.com/6-n0kim?tab=repositories"><picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-repositories-dark.svg"><img src="./profile-assets/premium-repositories-light.svg" width="31%" alt="전체 레포지토리"></picture></a>',
  '&nbsp;',
  '<a href="https://6-n0kim.github.io/capy"><picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-portfolio-dark.svg"><img src="./profile-assets/premium-portfolio-light.svg" width="31%" alt="포트폴리오"></picture></a>',
  '&nbsp;',
  '<a href="https://solved.ac/1090jun/"><picture><source media="(prefers-color-scheme: dark)" srcset="./profile-assets/premium-solvedac-dark.svg"><img src="./profile-assets/premium-solvedac-light.svg" width="31%" alt="Solved.ac 프로필"></picture></a>',
  '</div>',
  '',
  '<div align="center">',
  '<p align="center">',
  '  <a href="https://solved.ac/1090jun/">',
  '    <img src="http://mazassumnida.wtf/api/v2/generate_badge?boj=1090jun" alt="Solved.ac 티어 뱃지" />',
  '  </a>',
  '</p>',
  '</div>',
  '',
  '---',
  '',
  '<div align="center">',
  '  <sub>Design inspired by <a href="https://github.com/ryoaonetsuki">@ryoaonetsuki</a></sub>',
  '</div>',
  ''
];

writeFileSync("README.md", lines.join("\n"));
console.log("README.md and Hero SVGs post-rendered successfully.");
