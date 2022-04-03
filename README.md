# 🌷 Bloomotion

사진 촬영을 통해 나의 감정을 분석해 보세요! 감정에 어울리는 꽃의 추상적인 형태를 경험하고 Chrome extension을 사용해 내 크롬 탭에 적용시킬 수 있습니다.

## 💎 Summary

---

- Bloomotion: 사람의 감정을 분석하고 비슷한 꽃말을 가진 꽃으로 표현 (bloom + emotion)
- Background: 안면 인식에 대한 호기심
- Features: 사진 촬영 및 감정 분석, 감정에 해당하는 꽃의 추상화, 크롬 익스텐션 적용
- Duration: 총 3주 (1주 - 아이디어 구체화 & 설계 / 2주 - 구현 & 배포)
- Stack - React, D3, NodeJS (Express), MongoDB 등

## 🔗 Links

---

- [배포 사이트](https://www.bloomotions.com/)
- [Repository: Front-end](https://github.com/bloomotion/bloomotion-frontend)
- [Repository: Back-end](https://github.com/bloomotion/bloomotion-backend)
- [Repository: Chrome-extension](https://github.com/bloomotion/bloomotion-extension)

## 🌱 Background

---

실생활에서 안면 인식을 통한 스마트폰 잠금 해제, 출입 관리 등의 기술을 접할 기회가 많아지면서 <b>안면인식</b> 이라는 키워드에 관심을 가지게 되었습니다. 안면 인식 API에 대해 알아보던 중 얼굴을 통해 감정을 인식할 수 있다는 것을 알게 되어 시작한 프로젝트 입니다. 감정의 표현 방식에 대해 고민해 보다가 시각적인 부분의 강조를 위해 다양한 색상을 사용해 보고 싶었고 꽃의 화려함을 사용해 보는 것이 좋을 것 같아 꽃이라는 키워드를 접목하게 되었습니다.

## 🕹 Usage

### Front-end

```
$ git clone https://github.com/bloomotion/bloomotion-frontend.git
$ npm install
$ npm start
```

Clone된 Root 디렉토리에 .env 파일을 생성하고, SERVER URL을 입력합니다.

```
REACT_APP_SERVER_URL=http://localhost:3001
```

### Back-end

```
$ git clone https://github.com/bloomotion/bloomotion-backend.git
$ npm install
$ npm run dev
```

Clone된 Root 디렉토리에 .env 파일을 생성하고, CLIENT_URL, DB_URL, ACCESS_TOKEN_SECRET, CHROME_EXTENSION_URL, ACCESS_TOKEN_MAX_AGE를 입력합니다.

```
CLIENT_URL=http://localhost:3000
DB_URL=<Your MongoDB URL>
ACCESS_TOKEN_SECRET=<Your JWT Signature Secret KEY>
CHROME_EXTENSION_URL=http://chrome-extension://<Chrome Extension ID>
ACCESS_TOKEN_MAX_AGE=<Your AccessToken Max Age>
```

## 📅 Duration

---

2022.02.21 - 03.13 / 3주 (1주 - 아이디어 구체화 & 설계 + 2주 - 구현 & 배포)

1주차 - 아이디어 구체화, UX/UI, DB Schema 설계  
2~3주차 - 안면 인식 구현, D3 Visualization, Chrome-extension, 배포, 테스트 코드 작성, 코드 리펙터링

## 🔧 Stack

---

|    Front-end     |     Back-end     | Chrome-extension |
| :--------------: | :--------------: | :--------------: |
|      React       | NodeJS (Express) |       HTML       |
|     Face-api     |     Mongo DB     |    Javascript    |
|        D3        |                  |       CSS        |
|      Axios       |
|     Firebase     |
| Styled-component |

## 🌟 Feature

- 로그인 및 로그아웃
  ![로그인](https://user-images.githubusercontent.com/81972688/161417433-2c2c294d-e344-42f6-9fbf-33186d74c33b.gif)
  - 로그인은 firebase를 통해 진행되고 로그인하여 받은 사용자 정보를 서버에 전달하게 됩니다.
  - 서버에서 사용자 정보를 토대로 최초 로그인 유저의 경우 MongoDB로 정보가 저장되고 저장된 정보를 토대로 JWT 토큰을 발급하여 클라이언트로 전달 후 local storage에 저장합니다.
  - 로그아웃이 가능합니다.
- 안면 인식 및 감정 분석
  ![사진 촬영](https://user-images.githubusercontent.com/81972688/161417541-a468cf15-f03e-4f74-b425-6a30eb781c43.gif)
  ![사진 전송](https://user-images.githubusercontent.com/81972688/161417557-d48f860a-d19b-4ce2-996d-d44b4cf527b6.gif)
  - retake 버튼을 누르게 되면 재촬영이 가능합니다.
  - 사진 촬영 후 submit 버튼을 누르게 되면 face-api 에서 사진 속 인물의 얼굴을 감지해 감정을 분석하게 되고 감정들 중 가장 강한 수치를 가진 감정을 골라 그 결과를 서버에 전달해 저장합니다.
- 감정에 해당하는 꽃의 추상화
  - 가장 강한 감정에 해당하는 꽃을 추상화한 애니메이션을 보여줍니다.
  - 각 감정마다 다른 애니메이션을 가지고 있고 (Happy/Sunflower, Sad/Anemone, Angry/Orange Lily 3가지) 감정의 정도에 따라 애니메이션 색상의 투명도가 다르게 보여집니다.

|                                                      Happy                                                      |                                                      Sad                                                      |                                                      Angry                                                      |
| :-------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| ![happy](https://user-images.githubusercontent.com/81972688/160567414-204a9798-ef26-4c49-9d8f-b03319f5e8ee.gif) | ![sad](https://user-images.githubusercontent.com/81972688/160567554-59cb5843-7d02-47bc-b1f7-11daa0fdd3fb.gif) | ![angry](https://user-images.githubusercontent.com/81972688/160567637-277cd496-0eaf-4076-8451-216c438f2a84.gif) |

- 크롬 익스텐션
  ![크롬 익스텐션 적용](https://user-images.githubusercontent.com/81972688/161417898-3b3842c9-0fea-4d14-914d-13e6c395362a.gif)
  ![크롬 익스텐션 기능](https://user-images.githubusercontent.com/81972688/161417908-a72d7a18-7068-4676-8d98-45c386e870bb.gif)
  - 앱 아이콘을 누르게 되면 팝업창이 뜨고 Register 버튼을 눌러 현재 감정을 익스텐션에도 적용되도록 할 수 있습니다.
  - 새 탭을 누르면 현재 감정을 대변하는 꽃의 색상을 반영한 애니메이션을 볼 수 있습니다.

## 📝 Logs

---

### 안면 인식, 감정 분석

비교해본 안면 인식 api중 네이버의 Clova Face Recognition API 도 있었지만 face-api.js 는 라이브러리이기 때문에 쉽게 다운로드 받아 사용할 수 있다는 점에서 접근성이 용이했고 기술적인 부분을 비교해 보았을 때 크게 다른 부분이 없다고 생각해 face-api.js 를 사용하게 되었습니다.

감정을 분석했을 때 나오는 감정은 총 7가지 이고, 그중 가장 높은 수치를 가진 감정을 골라 메인 감정으로서 사용합니다. 현재 시각화로 표현이 가능한 감정은 happy, sad, angry 로 총 세 가지 입니다. 예외적으로 neutral이 나온 경우에는 happy, sad, angry 중 가장 높은 수치의 감정을 골라 나타냅니다.

감정의 정도는 0에서 1 사이의 숫자로 표현됩니다. 0에 가까울수록 감정의 정도가 낮음을, 1에 가까울수록 강함을 뜻합니다. 이 부분을 세 단계로 나누어 각 단계에 따라 애니메이션의 색상 투명도를 다르게 해주었습니다. 강한 감정일수록 강한 이미지를 나타내고 싶어 각각 투명도를 다르게 표현해 보았습니다.

0 ~ 0.3 : 낮음  
0.3 ~ 0.7 : 중간  
0.7 ~ 1 : 강함

### D3 감정 시각화

감정 데이터를 시각화 하기 위한 기술이 필요하던 중 D3를 발견하게 되었고 다양한 예제 자료들이 있어 참고하기 좋을 것 같다는 생각에 D3를 사용하게 되었습니다.

만약 지금 다시 이 프로젝트를 진행하게 된다면 혹은 수정 방안에 대해 생각해 본다면 감정을 각각 나누어 표현하는 것이 아닌 사진을 분석했을 때 나오는 모든 감정들을 전부 시각화하되 강한 감정은 더 진한 색으로 누가 봐도 메인 감정이라고 생각할 수 있도록 표현하고 감정의 강도가 약할수록 옅은 색과 적은 양으로 표현하는 방향으로 진행해 보는 것이 좋을 것 같다는 생각이 듭니다.
프로젝트를 진행하는 중에는 전혀 생각지 못한 부분이었는데 마치고 나서 전체적으로 돌아보니 D3를 사용하는데 있어 감정 데이터를 좀 더 동적으로 사용해야 하지 않았나 라는 생각이 듭니다.

### 크롬 익스텐션 앱 개발

초기 프로젝트 기획 당시에 크롬 익스텐션 개발을 위한 방법을 알아보면서 크롭 익스텐션 개발에 꼭 필요한 manifest.json 파일의 작성법을 익히고 예제 작성을 했었는데 후에 실제 개발을 진행하면서 당시에 작성했던 기술들이 최신 버전인 Manifest V3이 아닌 이전 버전인 Manifest V2 의 기술들 이었다는 것을 깨닫고 다시 처음부터 알아가야 하는 작은 이슈가 있었습니다. Manifest V3을 사용하려고 했던 이유는 개인 정보 보호, 보안, 성능 등에 있어 발전된 기술을 사용할 수 있고, Manifest V2의 확장 프로그램이 얼마 뒤 작동 중지가 되기 때문이었습니다. 기획 당시 많은 글과 영상들을 찾아보았었는데 V2를 사용한 예제가 대부분 이었고 크롬 익스텐션 개발 공식 페이지를 꼼꼼하게 읽지 않았기 때문에 일어난 일이었던 것 같습니다. 이후에 크롬 익스텐션 개발을 진행하는 과정에서는 공식 페이지에 적혀있는 기능 변경 사항을 참고하면서 수정해 나갔습니다. 이번 경험을 통해 확실히 깨닫게 된 점은 공식 홈페이지에는 개발을 위해 알아야 하는 것들이 모두 적혀 있다는 점, 사용자들의 예제만을 참고해서는 안된다는 점, 라이브러리 사용에 있어서도, 이번 확장 앱 개발 같은 경우에서도 버전을 확인하고 변경사항을 체크하는 것은 당연시 해야 한다는 것을 깨닫게 된 것 같습니다.

## 🧸 마치면서

---

처음으로 진행해보는 개인 프로젝트에 울기도 하고 웃기도 했던 시간 이었던 것 같습니다. 이번에 제가 진행한 프로젝트가 기술적으로 대단히 어려운 부분이 있지는 않았지만 기한이 정해져 있었고 처음 시도해 보는 것들을 혼자서 해나가야 한다는 부담감이 굉장히 크게 느껴졌던 것 같습니다. 그렇지만 공식문서, 영상 등을 통해 배워가며 하나하나 해결해 나가는 과정이 개발 진행 중 문제 해결을 하는 데에 있어 방향성을 찾아가는 유익한 시간이었던 것 같습니다.

약 2주 동안의 프로젝트를 위해 계획을 짜고 그 계획에 맞춰 개발을 진행했는데 하루에 할 수 있는 양에 맞춰 계획을 짜는 것도, 계획에 맞춰 개발을 진행하는 것도 초보 개발자인 저에게 어려웠던 과제라고 생각합니다. 어려운 작업에 막혀 딜레이 되는 과정에서 많이 좌절도 하고 포기하고 싶을 때도 있었지만 고난을 해결해 나가는 과정은 개발자로서의 성장을 위한 좋은 경험이 되었다고 생각합니다. 또한 같이 작업하는 동기들의 격려가 어려움을 이겨내는데 정말 많은 도움이 되었던 것 같습니다.
