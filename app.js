'use strict';

const iconPaths = {
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  home: '<path d="m3 10 9-7 9 7M5 9v11h14V9M10 20v-6h4v6"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18"/>',
  clipboard: '<rect x="5" y="5" width="14" height="16" rx="2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6m-6 4h6"/>',
  chart: '<path d="M4 4v16h16M8 15v2m5-6v6m5-11v11"/>',
  save: '<rect x="4" y="5" width="16" height="13" rx="2"/><path d="M4 14h16m-4 2h1"/>',
  book: '<path d="M4 5h5a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4V5Zm16 0h-5a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h5V5Z"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1"/>',
  missing: '<rect x="4" y="4" width="16" height="16" rx="2" stroke-dasharray="3 3"/><path d="M9 12h6"/>',
  pulse: '<path d="M2 13h5l3-7 4 12 3-5h5"/>',
  columns: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M11 4v16m4-16v16"/>',
  locate: '<path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  rows: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16"/>',
  type: '<path d="m3 18 5-12 5 12m-8-4h6m5-3h4m-2 0v7"/>',
  sort: '<path d="M4 6h10M4 11h7m-7 5h4m9-10v13m-3-3 3 3 3-3"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  spark: '<path d="M12 2c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z"/>',
  play: '<path d="m8 5 12 7-12 7V5Z"/>',
};

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
}

const studentColumns = ['인덱스', 'name', 'score', 'class'];
const students = [[10, '지민', 72, '1반'], [20, '서연', 95, '2반'], [30, '민준', 84, '1반']];
const topics = [
  {
    id: 'duplicates', title: '중복값 처리', method: 'drop_duplicates()', icon: 'copy', color: '',
    summary: '같은 내용이 반복된 행을 정리해요.',
    goal: '인덱스와 열 값을 구분하고, 내용이 같은 행을 하나로 정리할 수 있어요.',
    task: 'df에서 모든 열의 값이 같은 행이 반복되면 처음 나온 행만 남기세요.',
    concept: 'drop_duplicates()는 인덱스를 제외한 열의 값이 모두 같은 행을 중복으로 봅니다. 기본값은 처음 나타난 행을 남깁니다.',
    code: 'result = df.drop_duplicates()',
    columns: studentColumns, before: [...students, [40, '서연', 95, '2반']], after: students,
    takeaway: '내용이 같은 인덱스 20과 40 중에서 먼저 나온 20을 남깁니다.',
  },
  {
    id: 'missing', title: '결측값 처리', method: 'fillna()', icon: 'missing', color: 'blue',
    summary: '비어 있는 값을 찾아 채워요.',
    goal: '결측값을 확인하고, 필요한 열의 결측값을 원하는 값으로 채울 수 있어요.',
    task: 'df의 score 열에서 NaN으로 표시된 결측값을 0으로 채우고 나머지 열은 그대로 두세요.',
    concept: 'isna()로 결측값을 찾을 수 있습니다. fillna()는 결측값을 지정한 값으로 채우고, dropna()는 결측값이 있는 행을 제거할 때 사용합니다.',
    code: 'result = df.copy()\nresult["score"] = result["score"].fillna(0)',
    columns: studentColumns, before: [[10, '지민', '72.0', '1반'], [20, '서연', 'NaN', '2반'], [30, '민준', '84.0', '1반']],
    after: [[10, '지민', '72.0', '1반'], [20, '서연', '0.0', '2반'], [30, '민준', '84.0', '1반']],
    takeaway: '이 예제에서는 누락된 점수를 0점으로 기록하기로 정했습니다. score 열의 NaN이 0.0으로 바뀝니다.',
  },
  {
    id: 'outliers', title: '이상치 처리', method: 'between()', icon: 'pulse', color: 'rose',
    summary: '기준 범위를 벗어난 값을 찾아요.',
    goal: '데이터에 유효한 범위를 정하고, 그 범위에 맞는 행을 선택할 수 있어요.',
    task: 'df에서 score가 0점 이상 100점 이하인 행만 남기세요. 0점과 100점도 유효한 점수입니다.',
    concept: '점수처럼 유효 범위를 정할 수 있는 데이터는 범위 조건으로 확인할 수 있습니다. 이 예제에서 유효한 점수는 0점 이상 100점 이하입니다.',
    code: 'result = df[df["score"].between(0, 100)]',
    columns: studentColumns, before: [...students, [40, '하은', 180, '2반']], after: students,
    takeaway: 'between(0, 100)은 양 끝값을 포함합니다. 180점이 기록된 행은 결과에서 빠집니다.',
  },
  {
    id: 'columns', title: '열 선택', method: 'df[[...]]', icon: 'columns', color: 'mint',
    summary: '분석에 필요한 열만 골라요.',
    goal: '열 이름 목록으로 필요한 열을 원하는 순서대로 선택할 수 있어요.',
    task: 'df에서 name 열과 score 열을 이 순서대로 선택하세요.',
    concept: '데이터프레임에 열 이름의 리스트를 전달하면 지정한 열을 리스트 순서대로 가져옵니다.',
    code: 'result = df[["name", "score"]]',
    columns: studentColumns, before: students,
    afterColumns: studentColumns.slice(0, 3), after: students.map(row => row.slice(0, 3)),
    takeaway: 'name과 score 열이 남습니다. 행의 인덱스는 그대로 유지됩니다.',
  },
  {
    id: 'loc', title: 'loc 행 선택', method: 'loc[]', icon: 'locate', color: 'amber',
    summary: '인덱스의 이름으로 행을 찾아요.',
    goal: 'loc로 인덱스 라벨을 사용해 행 범위를 선택할 수 있어요.',
    task: 'df에서 loc를 사용해 인덱스 라벨 20부터 30까지의 행을 선택하세요.',
    concept: 'loc는 인덱스 라벨을 기준으로 선택합니다. 예제처럼 라벨이 정렬되어 있을 때 범위를 지정하면 시작과 끝 라벨에 해당하는 행이 모두 포함됩니다.',
    code: 'result = df.loc[20:30]',
    columns: studentColumns, before: students, after: students.slice(1),
    takeaway: '인덱스 라벨이 20인 행부터 30인 행까지 가져옵니다.',
  },
  {
    id: 'iloc', title: 'iloc 행 선택', method: 'iloc[]', icon: 'rows', color: 'blue',
    summary: '0부터 세는 위치로 행을 찾아요.',
    goal: 'iloc로 인덱스 라벨과 관계없이 행의 위치를 기준으로 선택할 수 있어요.',
    task: 'df에서 iloc를 사용해 첫 번째 행과 두 번째 행을 선택하세요.',
    concept: 'iloc는 행의 순서상 위치를 사용합니다. 위치는 0부터 시작하며 슬라이스의 끝 위치는 포함하지 않습니다.',
    code: 'result = df.iloc[0:2]',
    columns: studentColumns, before: students, after: students.slice(0, 2),
    takeaway: '위치 0과 1에 있는 행의 인덱스 라벨은 각각 10과 20입니다.',
  },
  {
    id: 'astype', title: '자료형 변환', method: 'astype()', icon: 'type', color: '',
    summary: '문자열로 저장된 점수를 정수로 바꿔요.',
    goal: 'astype으로 문자열 열을 계산할 수 있는 정수형으로 변환할 수 있어요.',
    task: 'df의 score 열을 정수형으로 바꾸고 다른 열의 값은 그대로 두세요.',
    concept: 'astype()으로 열의 자료형을 바꿀 수 있습니다. 정수형으로 변환하려면 각 값이 정수로 해석될 수 있어야 합니다.',
    code: 'result = df.copy()\nresult["score"] = result["score"].astype("int64")',
    columns: studentColumns,
    before: students.map(([index, name, score, group]) => [index, name, '"' + score + '"', group]),
    after: students,
    takeaway: '따옴표로 표시한 문자열 점수가 정수로 변환되어 숫자 계산에 사용할 수 있습니다.',
  },
  {
    id: 'sort', title: '데이터 정렬', method: 'sort_values()', icon: 'sort', color: 'mint',
    summary: '점수 같은 기준값으로 행을 정렬해요.',
    goal: 'sort_values로 정렬 기준과 오름차순·내림차순을 지정할 수 있어요.',
    task: 'df에서 score가 높은 학생부터 나오도록 행을 내림차순으로 정렬하세요.',
    concept: 'sort_values()에 정렬 기준 열을 지정합니다. 기본값은 오름차순이고, ascending=False를 지정하면 내림차순입니다.',
    code: 'result = df.sort_values("score", ascending=False)',
    columns: studentColumns, before: students, after: [students[1], students[2], students[0]],
    takeaway: '행이 점수 95, 84, 72 순서로 바뀝니다. 각 행의 인덱스 라벨은 유지됩니다.',
  },
];

const { types: assessments, points, questionCount } = classroomAssessment;
const storageKey = 'data-preprocessing-classroom-v1';
const assessmentStorageKey = 'data-preprocessing-assessment-v1';
const unsavedPracticeDrafts = new Map();
const unsavedAssessmentDrafts = new Map();
let storageAvailable = true;
let assessmentStorageAvailable = true;

function loadState() {
  let saved;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try { saved = JSON.parse(raw); } catch { saved = null; }
    }
  } catch {
    storageAvailable = false;
  }
  return {
    completed: Array.isArray(saved?.completed)
      ? topics.filter(topic => saved.completed.includes(topic.id)).map(topic => topic.id)
      : [],
    type: saved?.type === 'B' ? 'B' : 'A',
    answers: Object.fromEntries(Object.entries(assessments).map(([type, assessment]) => [
      type,
      assessment.questions.map((_, index) => {
        const answer = saved?.answers?.[type]?.[index];
        return typeof answer === 'string' ? answer : '';
      }),
    ])),
  };
}

let state = loadState();
let activeProfile = readAssessmentValue(assessmentStorageKey);
if (!classroomAssessment.validProfile(activeProfile)) activeProfile = null;
const main = document.getElementById('main');
const pageLabel = document.getElementById('page-label');
const storageDetail = document.getElementById('storage-detail');
const pageTitles = { home: '학습 홈', practice: '실습 학습', assessment: '수행평가', results: '학습 결과' };

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  updateStorageNote();
}

function updateStorageNote() {
  storageDetail.textContent = storageAvailable ? '학습 기록과 답안을 저장해요.' : '현재 탭에서만 유지돼요.';
}

function readAssessmentValue(key) {
  let value;
  try {
    value = localStorage.getItem(key);
  } catch {
    assessmentStorageAvailable = false;
  }
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function writeAssessmentValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    assessmentStorageAvailable = true;
  } catch {
    assessmentStorageAvailable = false;
  }
  return assessmentStorageAvailable;
}

function draftKey(profile, type, index) {
  return assessmentStorageKey + ':' + JSON.stringify([profile.studentId, profile.name, type, index]);
}

function assessmentCodes(profile, type = profile.type) {
  return Array.from({ length: questionCount }, (_, index) => {
    const key = draftKey(profile, type, index);
    const code = unsavedAssessmentDrafts.get(key) ?? readAssessmentValue(key);
    return typeof code === 'string' ? code : '';
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

const pythonKeywords = new Set(
  'False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield'.split(' ')
);
const pythonTokens = new RegExp([
  /(?<comment>#[^\n]*)/,
  /(?<multilineString>(?:br|rb|fr|rf|r|u|b|f)?(?:"""(?:\\[\s\S]|(?!""")[^\\])*(?:"""|\\?$)|'''(?:\\[\s\S]|(?!''')[^\\])*(?:'''|\\?$)))/,
  /(?<string>(?:br|rb|fr|rf|r|u|b|f)?(?:"(?:\\[^\n]|[^"\\\n])*(?:"|\\?(?=\n|$))|'(?:\\[^\n]|[^'\\\n])*(?:'|\\?(?=\n|$))))/,
  /(?<number>0(?:x[0-9a-f_]+|o[0-7_]+|b[01_]+)|(?:\d[\d_]*(?:\.[\d_]*)?|\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?j?)/,
  /(?<name>[_\p{ID_Start}][\p{ID_Continue}]*)/u,
].map(pattern => pattern.source).join('|'), 'giu');

function highlightPython(source) {
  let highlighted = '';
  let offset = 0;
  for (const token of source.matchAll(pythonTokens)) {
    highlighted += escapeHtml(source.slice(offset, token.index));
    const value = escapeHtml(token[0]);
    const { comment, string, multilineString, number, name } = token.groups;
    let kind = '';
    if (comment) kind = 'comment';
    else if (string || multilineString) kind = 'string';
    else if (number) kind = 'number';
    else if (pythonKeywords.has(name)) kind = 'keyword';
    highlighted += kind ? `<span class="syntax-${kind}">${value}</span>` : value;
    offset = token.index + token[0].length;
  }
  return highlighted + escapeHtml(source.slice(offset));
}

function tile(name, color = '') {
  return `<span class="tile-icon ${color}">${icon(name)}</span>`;
}

function progressPanel() {
  const done = state.completed.length;
  const percent = Math.round(done * 100 / topics.length);
  return `<section class="panel progress-panel" aria-label="실습 진행률">
    <div class="progress-head"><div class="progress-legend">${tile('chart')}
      <div><strong>나의 학습 진행률</strong><small>실습 ${topics.length}개 중 ${done}개 완료</small></div>
    </div><strong class="progress-number">${percent}%</strong></div>
    <progress value="${done}" max="${topics.length}" aria-label="완료한 실습 수">${percent}%</progress>
  </section>`;
}

function topicCards() {
  return `<div class="topic-grid">${topics.map(topic => `
    <a class="topic-card" href="#practice/${topic.id}">
      <div class="topic-top">${tile(topic.icon, topic.color)}
        ${state.completed.includes(topic.id) ? '<span class="done">완료</span>' : ''}
      </div>
      <h3>${topic.title}</h3>
      <p>${topic.summary}</p>
      <code>${escapeHtml(topic.method)}</code>
    </a>`).join('')}</div>`;
}

function home() {
  const next = topics.find(topic => !state.completed.includes(topic.id));
  const start = next ? '#practice/' + next.id : '#practice';
  const label = state.completed.length === 0 ? '실습 시작하기' : (next ? '실습 이어하기' : '실습 다시 보기');
  return `<section class="hero">
    <div class="hero-copy">
      <h1>데이터 전처리<br>학습 교실</h1>
      <p>예제 데이터로 전처리의 기본을 익히고<br>수행평가에 도전해 보세요.</p>
      <a class="button" href="${start}">${icon('book')}${label}</a>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="art-orbit"></div>
      <div class="art-table raw">
        <div class="art-title">처리 전</div>
        <div class="art-row"><span>name</span><span>score</span><span>class</span></div>
        <div class="art-row"><span>지민</span><span>72</span><span>1반</span></div>
        <div class="art-row"><span>서연</span><span class="art-alert">NaN</span><span>2반</span></div>
        <div class="art-row"><span>민준</span><span>84</span><span>1반</span></div>
      </div>
      <div class="art-table clean">
        <div class="art-title">처리 후</div>
        <div class="art-row"><span>name</span><span>score</span><span>class</span></div>
        <div class="art-row"><span>지민</span><span>72</span><span>1반</span></div>
        <div class="art-row"><span>서연</span><span>0</span><span>2반</span></div>
        <div class="art-row"><span>민준</span><span>84</span><span>1반</span></div>
      </div>
      <span class="art-spark">${icon('spark')}</span><span class="art-check">${icon('check')}</span>
    </div>
  </section>
  ${progressPanel()}
  <section aria-labelledby="home-topics">
    <div class="section-heading"><div><h2 id="home-topics">실습 학습</h2><p>주제를 골라 개념과 예제를 확인해 보세요.</p></div><a class="text-link" href="#practice">전체 실습</a></div>
    ${topicCards()}
  </section>`;
}

function heading(title, description, extraClass = '') {
  return `<header class="page-heading ${extraClass}"><h1>${title}</h1><p>${description}</p></header>`;
}

function dataTable(columns, rows, label) {
  return `<div class="table-wrap"><table aria-label="${label}">
    <thead><tr>${columns.map(column => `<th scope="col">${escapeHtml(column)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([index, ...values]) => `<tr><th scope="row">${escapeHtml(index)}</th>${values.map(value => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function practice(topic) {
  if (!topic) {
    return `${heading('실습 학습', '예제 데이터로 pandas 전처리의 기본을 익혀 보세요.')}${topicCards()}${progressPanel()}`;
  }
  const done = state.completed.includes(topic.id);
  const next = topics[topics.indexOf(topic) + 1];
  return `<a class="text-link" href="#practice">실습 목록</a>
    ${heading(topic.title, topic.summary, 'detail-heading')}
    <div class="detail-layout">
      <section class="panel">
        <h2>학습 목표</h2><p class="muted">${topic.goal}</p>
        <h2 class="practice-concept">핵심 개념</h2><p class="muted">${topic.concept}</p>
        <pre aria-label="예제 코드"><code>${escapeHtml(topic.code)}</code></pre>
      </section>
      <section class="panel"><h2>예제 데이터</h2>
        <p class="muted">아래 표를 데이터프레임 <code>df</code>라고 가정하세요.</p>
        ${dataTable(topic.columns, topic.before, '예제 데이터')}
      </section>
    </div>
    <div class="stack">
      <section class="panel">
        <h2>실습 문제</h2>
        <p id="practice-prompt">${topic.task} 결과를 <code>result</code>에 저장하는 코드를 작성하세요.</p>
        <div class="editor-heading">
          <label for="practice-code">Python 코드</label>
          <span id="draft-status" class="muted" role="status"></span>
        </div>
        <div class="code-editor">
          <div class="code-gutter" aria-hidden="true"><div id="code-lines">1</div></div>
          <div class="code-input-wrap">
            <pre class="code-highlight" aria-hidden="true"><code id="highlighted-code"></code></pre>
            <textarea id="practice-code" aria-describedby="practice-prompt draft-status" wrap="off" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="여기에 Python 코드를 작성하세요."></textarea>
          </div>
        </div>
      </section>
    </div>
    <section class="panel stack">
      <div><h2>예제 결과</h2>
        <button id="show-example" class="button secondary actions" type="button" aria-expanded="false" aria-controls="example-output">결과 보기</button>
        <div id="example-output" hidden>
          ${dataTable(topic.afterColumns ?? topic.columns, topic.after, '처리 후 데이터')}
          <p class="muted">${topic.takeaway}</p>
        </div>
      </div>
    </section>
    <div class="actions">
      <button id="complete-topic" class="button" type="button" ${done ? 'disabled' : ''}>${icon('check')}${done ? '학습 완료됨' : '학습 완료'}</button>
      ${next ? `<a class="button secondary" href="#practice/${next.id}">다음 실습</a>` : '<a class="button secondary" href="#assessment">수행평가 열기</a>'}
      <span id="practice-status" role="status" class="muted"></span>
    </div>
    ${progressPanel()}`;
}

function answerCount(codes) {
  return codes.filter(answer => answer.trim()).length;
}

function assessmentSetup(type) {
  return `${heading('수행평가', '학생 정보와 평가 유형을 선택한 뒤 답안을 작성하세요.')}
    <form class="panel" id="assessment-setup">
      <h2>학생 정보</h2>
      <div class="form-grid">
        <label>학번 <input class="form-control" name="studentId" required autocomplete="off" spellcheck="false"></label>
        <label>이름 <input class="form-control" name="name" required autocomplete="off"></label>
        <label>유형 <select class="form-control" name="type" required>
          <option value="">유형 선택</option>
          ${Object.keys(assessments).map(key => `<option value="${key}" ${key === type ? 'selected' : ''}>${key}형</option>`).join('')}
        </select></label>
      </div>
      <p id="profile-error" class="form-error" role="alert"></p>
      <div class="actions"><button class="button" type="submit">평가 시작 또는 이어서 작성</button></div>
    </form>`;
}

function assessmentView(profile) {
  const { type } = profile;
  const assessment = assessments[type];
  const { questions } = assessment;
  return `${heading('수행평가', '문항별로 pandas 코드를 작성하세요.')}
    <section class="panel">
      <div class="question-header"><h2>${type}형 · ${assessment.title}</h2><span class="score">${questions.length}문항 · 총 ${questions.length * points}점</span></div>
      <div class="student-summary"><p>${escapeHtml(profile.studentId)} · ${escapeHtml(profile.name)}</p><a class="text-link" href="#assessment">학생 정보 및 유형 변경</a></div>
      <p class="muted">각 문항의 표는 원본 데이터프레임 <code>df</code>입니다. 문항은 서로 독립적입니다. ${assessment.intro}</p>
    </section>
    <div class="stack">
      ${questions.map(([title, prompt], index) => `<section class="panel">
        <div class="question-header"><h2>${index + 1}. ${title}</h2><span class="score">${points}점</span></div>
        <p id="prompt-${index}">${prompt}</p>
        ${dataTable(assessment.columns, assessment.rows, (index + 1) + '번 문항 원본 데이터')}
        <label class="answer-label" for="answer-${index}">${index + 1}번 Python 코드</label>
        <textarea id="answer-${index}" data-answer="${index}" aria-describedby="prompt-${index}" placeholder="여기에 답안을 작성하세요." spellcheck="false" autocapitalize="off"></textarea>
      </section>`).join('')}
      <section class="panel">
        <h2>제출 파일</h2>
        <p>JSON 파일을 다운로드한 뒤 선생님이 안내한 방법으로 직접 전달하세요.</p>
        <div class="actions">
          <button id="download-submission" class="button" type="button">제출 파일 다운로드</button>
          <a class="button secondary" href="#results">학습 결과 보기</a>
        </div>
        <p id="answer-status" role="status" class="muted"></p>
        <p id="submission-status" role="status"></p>
      </section>
    </div>
    `;
}

function results() {
  const legacy = Object.entries(state.answers).flatMap(([type, answers]) =>
    answers.flatMap((code, index) => code.trim()
      ? [`<h3>${type}형 ${index + 1}번</h3><pre><code>${escapeHtml(code)}</code></pre>`] : [])
  );
  return `${heading('학습 결과', '완료한 실습과 수행평가 답안 작성 현황을 확인하세요.')}
    ${progressPanel()}
    <div class="detail-layout stack">
      <section class="panel">
        <h2>실습별 완료 현황</h2>
        ${topics.map(topic => {
          const done = state.completed.includes(topic.id);
          return `<div class="result-row"><a href="#practice/${topic.id}">${topic.title}</a><span class="${done ? 'done' : 'muted'}">${done ? '완료' : '미완료'}</span></div>`;
        }).join('')}
      </section>
      <section class="panel">
        <h2>수행평가 답안</h2>
        ${activeProfile ? Object.keys(assessments).map(type => `
          <div class="result-row"><a href="#assessment/${type}">${type}형 답안 보기</a><span class="muted">${answerCount(assessmentCodes(activeProfile, type))} / ${questionCount}문항 작성</span></div>`).join('')
    : '<div class="result-row"><a href="#assessment">학생 정보 입력</a></div>'}
      </section>
    </div>
    ${legacy.length ? `<details class="panel legacy-drafts"><summary>이 브라우저에 저장된 개편 전 답안</summary><p class="muted">이전 문항에 작성한 코드입니다.</p>${legacy.join('')}</details>` : ''}`;
}

function bindPracticeEditor(topic) {
  const input = document.getElementById('practice-code');
  const highlighted = document.getElementById('highlighted-code');
  const gutter = document.getElementById('code-lines');
  const status = document.getElementById('draft-status');
  const key = `${storageKey}:practice:${topic.id}`;
  const unavailable = '현재 탭에서만 유지';
  try {
    const saved = localStorage.getItem(key);
    input.value = unsavedPracticeDrafts.get(key) ?? saved ?? '';
    status.textContent = unsavedPracticeDrafts.has(key) ? unavailable : '브라우저 자동 저장';
  } catch {
    input.value = unsavedPracticeDrafts.get(key) ?? '';
    status.textContent = unavailable;
  }

  function syncScroll() {
    highlighted.style.transform = `translate(${-input.scrollLeft}px, ${-input.scrollTop}px)`;
    gutter.style.transform = `translateY(${-input.scrollTop}px)`;
  }

  function paint() {
    const source = input.value;
    highlighted.innerHTML = highlightPython(source) + (source.endsWith('\n') ? ' ' : '');
    const lines = source.split('\n').length;
    gutter.textContent = Array.from({ length: lines }, (_, index) => index + 1).join('\n');
    syncScroll();
  }

  input.addEventListener('input', () => {
    let message;
    try {
      localStorage.setItem(key, input.value);
      unsavedPracticeDrafts.delete(key);
      message = '자동 저장됨';
    } catch {
      unsavedPracticeDrafts.set(key, input.value);
      message = unavailable;
    }
    if (status.textContent !== message) status.textContent = message;
    paint();
  });
  input.addEventListener('scroll', syncScroll);
  paint();
}

function bindPractice(topic) {
  bindPracticeEditor(topic);
  const toggle = document.getElementById('show-example');
  const output = document.getElementById('example-output');
  toggle.addEventListener('click', () => {
    output.hidden = !output.hidden;
    toggle.setAttribute('aria-expanded', String(!output.hidden));
    toggle.textContent = output.hidden ? '결과 보기' : '결과 접기';
  });
  const complete = document.getElementById('complete-topic');
  complete.addEventListener('click', () => {
    if (state.completed.includes(topic.id)) return;
    state.completed.push(topic.id);
    saveState();
    complete.disabled = true;
    complete.innerHTML = icon('check') + '학습 완료됨';
    main.querySelector('.progress-panel').outerHTML = progressPanel();
    document.getElementById('practice-status').textContent = storageAvailable
      ? '완료 기록을 저장했어요.'
      : '완료 기록은 현재 탭에서만 유지돼요.';
  });
}

function bindAssessmentSetup() {
  const form = document.getElementById('assessment-setup');
  const studentId = form.elements.namedItem('studentId');
  const name = form.elements.namedItem('name');
  const type = form.elements.namedItem('type');
  if (activeProfile) {
    studentId.value = activeProfile.studentId;
    name.value = activeProfile.name;
  }
  const error = document.getElementById('profile-error');
  form.addEventListener('input', () => { error.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const profile = { studentId: studentId.value.trim(), name: name.value.trim(), type: type.value };
    if (!classroomAssessment.validProfile(profile)) {
      error.textContent = '학번과 이름을 입력하고 유형을 선택하세요. 학번과 이름에는 파일명에 사용할 수 없는 문자(예: /, :, ?)를 빼 주세요.';
      return;
    }
    activeProfile = profile;
    writeAssessmentValue(assessmentStorageKey, profile);
    const hash = '#assessment/' + profile.type;
    if (location.hash === hash) render(true);
    else location.hash = hash;
  });
}

function bindAssessment(profile) {
  const codes = assessmentCodes(profile);
  const status = document.getElementById('answer-status');
  const submissionStatus = document.getElementById('submission-status');
  function showStatus() {
    const message = assessmentStorageAvailable ? '브라우저 자동 저장' : '현재 탭에서만 유지';
    const text = `${answerCount(codes)} / ${questionCount}문항 작성 · ${message}`;
    if (status.textContent !== text) status.textContent = text;
  }
  main.querySelectorAll('[data-answer]').forEach(input => {
    const index = Number(input.dataset.answer);
    input.value = codes[index];
    input.addEventListener('input', () => {
      codes[index] = input.value;
      const key = draftKey(profile, profile.type, index);
      if (writeAssessmentValue(key, input.value)) unsavedAssessmentDrafts.delete(key);
      else unsavedAssessmentDrafts.set(key, input.value);
      submissionStatus.textContent = '';
      showStatus();
    });
  });
  document.getElementById('download-submission').addEventListener('click', () => {
    const missing = codes.flatMap((code, index) => code.trim() ? [] : [`${index + 1}번`]);
    const message = missing.length ? '미작성 문항 ' + missing.join(', ') : '모든 문항에 답안을 작성했습니다.';
    submissionStatus.textContent = message;
    if (!window.confirm(message + '\n답안 JSON 파일을 다운로드할까요?')) return;

    const submission = classroomAssessment.makeSubmission(profile, codes);
    const filename = classroomAssessment.submissionFilename(profile);
    try {
      classroomAssessment.download(filename, JSON.stringify(submission, null, 2), 'application/json;charset=utf-8');
      submissionStatus.textContent = '다운로드 목록에서 JSON 파일을 확인하고 선생님께 직접 전달하세요.';
    } catch {
      submissionStatus.textContent = '파일 다운로드를 시작할 수 없습니다. 브라우저의 다운로드 설정을 확인하고 다시 시도하세요.';
    }
  });
  showStatus();
}

function render(focus = false) {
  const [route, parameter] = location.hash.slice(1).split('/');
  const page = Object.hasOwn(pageTitles, route) ? route : 'home';
  pageLabel.textContent = pageTitles[page];
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  switch (page) {
    case 'practice': {
      const topic = topics.find(item => item.id === parameter);
      main.innerHTML = practice(topic);
      if (topic) bindPractice(topic);
      break;
    }
    case 'assessment': {
      if (activeProfile && parameter === activeProfile.type) {
        main.innerHTML = assessmentView(activeProfile);
        bindAssessment(activeProfile);
      } else {
        const type = Object.hasOwn(assessments, parameter) ? parameter : (activeProfile?.type ?? state.type);
        main.innerHTML = assessmentSetup(type);
        bindAssessmentSetup();
      }
      break;
    }
    case 'results':
      main.innerHTML = results();
      break;
    default:
      main.innerHTML = home();
  }
  if (focus) {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
}

document.querySelectorAll('[data-icon]').forEach(element => {
  element.innerHTML = icon(element.dataset.icon);
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange', () => render(true));
updateStorageNote();
render();
