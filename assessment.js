'use strict';

// Student questions and the JSON download format.
const classroomAssessment = (() => {
  const points = 20;
  const questionCount = 5;
  const types = {
    A: {
      title: '학교 급식 이용 기록',
      intro: '따옴표가 있는 값은 문자열이고 NaN은 결측값입니다.',
      columns: ['인덱스', 'menu', 'servings', 'rating', 'day'],
      rows: [
        [10, '비빔밥', '"35"', '4.0', '월'],
        [20, '국수', '"120"', 'NaN', '화'],
        [30, '카레', '"7"', '6.5', '수'],
        [40, '국수', '"120"', 'NaN', '화'],
        [50, '김밥', '"80"', '3.0', '목'],
        [60, '만두', '"120"', '4.5', '금'],
      ],
      questions: [
        ['중복과 결측값 처리', '모든 열의 값이 같은 행이 반복되면 마지막 행만 남기세요. 이어서 rating 열의 결측값을 3.5로 채우세요.'],
        ['이상치 처리', 'rating이 1 이상 5 이하인 행과 아직 평점이 없는 행을 남기세요. 범위를 벗어난 평점만 제외하세요.'],
        ['라벨·위치와 열 선택', '인덱스 라벨 20과 50에 해당하는 행에서 day 열과 menu 열을 이 순서대로 선택하세요. loc로 선택하는 코드와 iloc로 같은 결과를 얻는 코드를 각각 작성하세요.'],
        ['자료형 변환', 'astype을 사용해 servings 열을 정수형으로 변환하세요. 다른 열은 그대로 두세요.'],
        ['이용량 정렬', 'servings를 정수형으로 변환한 뒤 sort_values로 servings는 내림차순, 같은 값에서는 rating이 높은 순서로 정렬하세요. 결측 평점은 같은 이용량 안에서 마지막에 두세요.'],
      ],
    },
    B: {
      title: '온실 관측 기록',
      intro: '따옴표가 있는 값은 문자열이고 NaN은 결측값입니다.',
      columns: ['인덱스', 'zone', 'temperature', 'humidity', 'sensor'],
      rows: [
        [101, '동쪽', '"8.5"', '45.0', 'T1'],
        [107, '서쪽', '"21.0"', 'NaN', 'T2'],
        [115, '남쪽', '"12.0"', '105.0', 'T3'],
        [128, '서쪽', '"21.0"', 'NaN', 'T2'],
        [144, '북쪽', '"21.0"', '52.0', 'T4'],
        [160, '동쪽', '"8.5"', '45.0', 'T1'],
      ],
      questions: [
        ['중복과 결측값 처리', '모든 열의 값이 같은 행이 반복되면 첫 행만 남기세요. 이어서 humidity 값이 비어 있는 행을 제거하세요.'],
        ['이상치 처리', 'humidity가 0 이상 100 이하인 행만 남기세요. 결측값이 있는 행은 결과에서 제외하세요.'],
        ['위치·라벨과 열 선택', '위치 1과 3에 있는 행에서 sensor 열과 temperature 열을 이 순서대로 선택하세요. iloc로 선택하는 코드와 loc로 같은 결과를 얻는 코드를 각각 작성하세요. 위치는 0부터 셉니다.'],
        ['자료형 변환', 'astype을 사용해 temperature 열을 실수형으로 변환하세요. 다른 열은 그대로 두세요.'],
        ['관측값 정렬', 'temperature를 실수형으로 변환한 뒤 sort_values로 temperature는 오름차순, 같은 온도에서는 humidity가 높은 순서로 정렬하세요. 결측 습도는 같은 온도 안에서 마지막에 두세요.'],
      ],
    },
  };

  function validFilePart(value) {
    return typeof value === 'string' && value.length > 0 && value === value.trim()
      && !/[<>:"/\\|?*\u0000-\u001f\u007f]/u.test(value);
  }

  function validProfile(profile) {
    return Boolean(profile) && validFilePart(profile.studentId) && validFilePart(profile.name)
      && typeof profile.type === 'string' && Object.hasOwn(types, profile.type);
  }

  function submissionFilename(profile) {
    return profile.studentId + '_' + profile.name + '_' + profile.type + '형.json';
  }

  function makeSubmission(profile, codes, date = new Date()) {
    return {
      version: 1,
      studentId: profile.studentId,
      name: profile.name,
      type: profile.type,
      submittedAt: date.toISOString(),
      answers: Array.from({ length: questionCount }, (_, index) => ({
        question: index + 1,
        code: codes[index] ?? '',
      })),
    };
  }

  function download(filename, text, mimeType) {
    const url = URL.createObjectURL(new Blob([text], { type: mimeType }));
    const link = document.createElement('a');
    try {
      link.href = url;
      link.download = filename;
      document.body.append(link);
      link.click();
    } finally {
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    }
  }

  return { points, questionCount, types, validProfile, submissionFilename, makeSubmission, download };
})();
