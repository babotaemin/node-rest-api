# REST API fundamentals using Nodejs, Express, MongoDB

## 환경설정
### 초기 프로젝트
```
# npm install
# npm install -g webpack webpack-dev-server
```
### Global Dependency 설치
```
npm install -g babel-cli nodemon cross-env
```
### Local Dependency 설치
```
npm install --save express body-parser
```

### 모듈 설치
```
npm install --save morgan body-parser mongoose express-session
```

### 개발환경 실행
```
# windows
npm run win_development

# linux (package.json file modify win_development -> development)
npm run development
```

### 빌드 및 실행
```
npm run build

# windows
npm run win_start

# linux (package.json file modify win_start -> start)
npm run start
```

### API List
| ROUTE                     | METHOD | DESCRIPTION               |
|---------------------------|--------|---------------------------|
| /api/users                | GET    | 모든 user 데이터 조회     |
| /api/users/:userName       | GET    | userName 값으로 데이터 조회    |
| /api/users                | POST   | user 데이터 생성          |
| /api/users/:userName       | PUT    | user 데이터 수정          |
| /api/users/:userName       | DELETE | user 데이터 제거          |
