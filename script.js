/* ── 텍스트 데이터 ── */
const KOR_TEXTS = [
  {
    heading: '저는 말이죠...',
    body: '2000년 5월, 영화 <span class="no-break"><span class="bracket">&lt;</span><a class="inline-link" href="https://ko.wikipedia.org/wiki/%EC%A1%B4_%EB%A7%90%EC%BD%94%EB%B9%84%EC%B9%98_%EB%90%98%EA%B8%B0" target="_blank">존 말코비치되기</a><span class="bracket">&gt;</span></span>가 한국에서 개봉하던 시기에 태어났어요. <span class="no-break">한양대학교</span>에서 커뮤니케이션디자인을 공부했고, <span class="no-break">University of Leed</span>에서 <span class="no-break">Graphic Design course</span>로 교환유학했어요.'
  },
  {
    heading: '뭐하는 사람이냐면요...',
    body: '그래픽을 중심으로 작업하고 있어요. 그중에서도 책을 주로 만들어요. 제 작업은 제 <a class="inline-link" href="https://www.behance.net/juliehappy3137" target="_blank">비핸스</a>에서 더 자세히 설명되어 있어요. 저와 더 친밀하게 연결되고 싶으시다면 <a class="inline-link" href="https://www.instagram.com/jijiya_hi/" target="_blank">인스타그램</a>도 좋은 선택!'
  },
  {
    heading: '좋아하는 건...',
    body: '헤비 영화 평점 앱 유저, 맨날 한 번씩 들어가서 <a class="inline-link" href="https://pedia.watcha.com/ko-KR/users/RE952E8RnvQ72" target="_blank">왓챠피디아</a>에서 남의 리뷰를 훔쳐봐요. 방구석 음악 평론가, 좋은 음악을 들으며 비둘기처럼 고개를 까딱거리는 걸 즐겨해요. 현재 <span class="no-break">Rave sound</span>에 빠져 특히 <a class="inline-link" href="https://youtu.be/gfF8jzBVWvM?si=5y0hWxM_NuZVV3uXfeature=youtu.be" target="_blank">Fred again</a>과 사랑에 빠졌어요.'
  },
  {
    heading: null,
    body: '그래서... 제가 하고 싶은 말은요... 만나서 반갑습니다. <3',
    slow: true,
    last: true
  }
];

const ENG_TEXTS = [
  {
    heading: 'I am...',
    body: 'I was born in May 2000, when <span class="no-break"><span class="bracket">&lt;</span><a class="inline-link" href="https://en.wikipedia.org/wiki/Being_John_Malkovich" target="_blank">Being John Malkovich</a><span class="bracket">&gt;</span></span> came out in Korea, ish. I studied <span class="no-break">Communication Design</span> at <span class="no-break">Hanyang University</span> and spent as exchange student of <span class="no-break">Graphic Design course</span> at the <span class="no-break">University of Leeds</span>.'
  },
  {
    heading: 'My works are...\u2026',
    body: 'I focus on graphics, with a particular focus on books. You can find the details of my work on my <a class="inline-link" href="https://www.behance.net/juliehappy3137" target="_blank">Behance</a>. If you want to connect with me personally, my <a class="inline-link" href="https://www.instagram.com/jijiya_hi/" target="_blank">Instagram</a> is always a good idea!'
  },
  {
    heading: 'The things, I love...\u2019m\u2026',
    body: 'Heavy <a class="inline-link" href="https://letterboxd.com/jijiya_hi/" target="_blank">Letterboxd</a> user, loves reading others\u2019 reviews every single day. Armchair music critic, \u2019 nodding like a pigeon whenever a banger comes on. Currently obsessed with <span class="no-break">Rave sounds</span>\u2014and yes, I\u2019m deeply in love with <a class="inline-link" href="https://www.youtube.com/watch?v=MMSfBy2gdT4&feature=youtu.be" target="_blank">Fred again</a>..'
  },
  {
    heading: null,
    body: 'So I wanna say... NICE TO MEET YOUUU &lt;3',
    slow: true,
    last: true
  }
];

/* ── DOM 참조 ── */
let storyStarted = false;
const splitScreen = document.getElementById('split-screen');
const panelLeft   = document.getElementById('panel-left');
const panelRight  = document.getElementById('panel-right');

/* ── 인덱스 화면 복귀 ── */
function returnToIndex() {
  document.getElementById('story-kor').classList.add('hidden');
  document.getElementById('story-eng').classList.add('hidden');
  document.getElementById('feed-kor').innerHTML = '';
  document.getElementById('feed-eng').innerHTML = '';
  splitScreen.style.display = 'flex';
  splitScreen.classList.remove('expand-left', 'expand-right');
  document.getElementById('content-left').style.opacity  = '1';
  document.getElementById('content-right').style.opacity = '1';
  storyStarted = false;
}

/* ── 패널 클릭 → 확장 → 스토리 ── */
function launchStory(lang) {
  if (storyStarted) return;
  storyStarted = true;

  document.getElementById('content-left').style.opacity  = '0';
  document.getElementById('content-right').style.opacity = '0';

  const isKor       = lang === 'kor';
  const expandClass = isKor ? 'expand-left' : 'expand-right';
  const expandPanel = isKor ? panelLeft : panelRight;
  const storyEl     = document.getElementById(isKor ? 'story-kor' : 'story-eng');
  const feedWrapEl  = document.getElementById(isKor ? 'feed-wrap-kor' : 'feed-wrap-eng');
  const feedEl      = document.getElementById(isKor ? 'feed-kor' : 'feed-eng');
  const texts       = isKor ? KOR_TEXTS : ENG_TEXTS;

  splitScreen.classList.add(expandClass);

  expandPanel.addEventListener('transitionend', function onEnd(e) {
    /* 모바일(세로)은 height, 데스크탑(가로)은 width 트랜지션 감지 */
    const isMobile = window.innerWidth <= 768;
    if (isMobile && e.propertyName !== 'height') return;
    if (!isMobile && e.propertyName !== 'width') return;
    expandPanel.removeEventListener('transitionend', onEnd);
    splitScreen.style.display = 'none';
    storyEl.classList.remove('hidden');
    runStory(texts, storyEl, feedEl, feedWrapEl);
  });
}

panelLeft.addEventListener('click',  () => launchStory('kor'));
panelRight.addEventListener('click', () => launchStory('eng'));

/* ── 스토리 엔진 ── */
function runStory(texts, screenEl, feedEl, feedWrap) {
  const LAST = texts.length - 1;
  let cur = 0, typing = false;

  /* 세그먼트 파서 */
  function parseSegments(html) {
    const segs = [];
    const re = /(<[^>]+>|&[a-zA-Z]+;|&#\d+;)/g;
    let last = 0, m;
    while ((m = re.exec(html)) !== null) {
      if (m.index > last)
        for (const ch of html.slice(last, m.index)) segs.push({ type: 'char', value: ch });
      segs.push({ type: 'tag', value: m[0] });
      last = re.lastIndex;
    }
    if (last < html.length)
      for (const ch of html.slice(last)) segs.push({ type: 'char', value: ch });
    return segs;
  }

  /* 타이핑 효과 */
  function typeText(el, html, speed, onDone) {
    const segs = parseSegments(html);
    let built = '', i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.innerHTML = '';
    el.appendChild(cursor);
    function next() {
      if (i >= segs.length) { el.innerHTML = built; if (onDone) onDone(); return; }
      const seg = segs[i++];
      built += seg.value;
      el.innerHTML = built;
      el.appendChild(cursor);
      seg.type === 'tag' ? next() : setTimeout(next, speed);
    }
    next();
  }

  /* old 처리 */
  function makeOld(block) {
    block.classList.add('old');
    block.querySelectorAll('.heading').forEach(el => {
      el.classList.remove('blink');
      el.style.animation = 'none';
    });
    block.querySelectorAll('.inline-link').forEach(el => {
      el.style.animation = 'none';
    });
  }

  /* 블록 생성 & 타이핑 */
  function startBlock(idx) {
    typing = true;
    const data  = texts[idx];
    const speed = data.slow ? 65 : 18;

    const block = document.createElement('div');
    block.className = 'text-block';
    feedEl.insertBefore(block, feedEl.firstChild);
    feedWrap.scrollTop = 0;

    if (data.heading) {
      /* 말머리: 처음엔 깜빡임 없이, 타이핑 완료 후 blink 추가 */
      const hEl = document.createElement('span');
      hEl.className = 'heading';
      hEl.textContent = data.heading;
      block.appendChild(hEl);
      block.appendChild(document.createElement('br'));

      const bodyEl = document.createElement('span');
      block.appendChild(bodyEl);

      typeText(bodyEl, data.body, speed, () => {
        typing = false;
        /* 타이핑 완료 → 깜빡임 시작 */
        hEl.classList.add('blink');
        hEl.style.cursor = 'pointer';
        block.querySelectorAll('.inline-link').forEach(el => el.classList.add('blink-ready'));

        if (idx < LAST) {
          hEl.addEventListener('click', function handler(e) {
            e.stopPropagation();
            if (typing) return;
            hEl.removeEventListener('click', handler);
            makeOld(block);
            cur = idx + 1;
            startBlock(cur);
            feedWrap.scrollTop = 0;
          });
        } else {
          hEl.classList.remove('blink');
          hEl.style.animation = 'none';
        }
      });

    } else {
      /* 말머리 없는 블록 (마지막) */
      typeText(block, data.body, speed, () => {
        typing = false;
        if (data.last) {
          /* 타이핑 완료 후 클릭 → 인덱스로 복귀 */
          screenEl.addEventListener('click', function backHandler() {
            screenEl.removeEventListener('click', backHandler);
            returnToIndex();
          });
        }
      });
    }
  }

  startBlock(0);
}
