const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();  
const port = 3000;

const bodyParser = require('body-parser'); // body-parser 미들웨어를 추가

app.use(express.static(path.join(__dirname, 'workspace/build'))); //웹에서 빌드

// 모든 요청에 대해 index.html을 제공하도록 설정
app.get('/home', (req, res) => {  //(API 요청)
  //console.log("웹 실행");      
  res.sendFile(path.join(__dirname, 'workspace/build', 'index.html'));
}); //빌드파일의 인덱스파일 불러오는 코드


app.use(bodyParser.json()); // JSON 데이터 파싱을 위한 미들웨어 설정

app.post('/path', (req, res) => {
  let path_data = req.body.data; // 클라이언트로부터 받은 데이터 중 'data' 키의 값을 path_data 변수에 저장
  console.log(`Received data: ${path_data}`);

  // 클라이언트에 응답 보내기
  res.send(path_data);
  console.log('Received POST data:', req.body);
});

app.use(bodyParser.json());



//그냥 확인용
// await axios.post('/path', {
//   pathValue
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });


// /contact 요청을 처리하여 Python 코드 실행
app.get('/contact', (req, res) => {
  //console.log("버튼 실행");
  const pythonScript = './pythoncode/hello.py'; //경로지정 (프로젝트 파이썬 코드 들어갈 자리)
  const pythonProcess = spawn('python', [pythonScript]); 


  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output: ${data}`);
  });
// 실행한 데이터 결과 출력하기 -> if문으로 데이터가 a일때 실행하게끔 만들면됨

  pythonProcess.on('close', (code) => {
    console.log(`Python Process Exited with Code: ${code}`);
  });
// 종료

  res.send('Started YOLO test');
});


app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
// 포트라는 데이터가 들어오면 밑에 코드가 실행
// 콘솔로그 -> 터미널에 출력 (서버 정상작동하는지 확인하는 용도)

// 노드 js 를 서버로 올려서 파이썬코드를 실행하는 파일
// 노드 js를 하나의 창으로 생각
// npm start 아님  (배포용이 아니라 개발용인데 서비스를위해서는 배포를해야하니까 빌드파일이 필요함)
// 빌드폴더에 저장되있는 데이터만 돌아감
// 리액트를 컴파일을 해야함 -> 컴파일된 폴더 : 빌드폴더

//1. 노드모듈 다운해야함 npm install
//2. 