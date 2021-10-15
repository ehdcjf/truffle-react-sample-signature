# Setting

Truffle
Ganache 

1. npm install -g truffle
   truffle version

2. npm install -g ganache-cli
   ganache-cli --host 0.0.0.0

3. npm install -g web3 


eth_account
curl -X POST -d '{"jsonrpc":"2.0","method":"eth_accounts"}' http://127.0.0.1:8545


eth_getBalance

curl -X POST -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x8Ae1B58a72067470583b9E3AA20EC59Baf9DFB93"]}' http://127.0.0.1:8545







솔리디티 코드 작성 
솔리디티 코드 컴파일
컴파일 결과 배포
컴파일 결과를 js 코드로만 내용을 불러올수 있는지 ㄷ테스트 
html에서 js webs를 활용하여 내용을 불러온다. 

deploy.js 파일 만들기 
web3 라이브러리 가져오기
내가 현재 사용학 있는 블록체인 서버에 연결 
배초 작업을 하기 위해 콘트랙트 메서드를 사용해 블록생성
결과물 배포하기 deploy 매서드





# 메타마스크. 

1. 주소 
- 공개키 20자리 
- 암호키 

2. 계정
   - EOA 
      이더를 보낼 수 있는 계정
      스마트컨트랙트 트랜잭션을 보낼 수 있음. 

   - 컨트랙트 계정
       솔리디티 언어를 배포한 계정

 3. 지갑
 계정을 총괄관리하는 공간. 


메타마스크
- 개인이 보관하는 것. 온라인에 보관 


# Truffle

$ truffle init

1. contracts -> 솔리디티 작성 
2. migration -> deplou 매서드가 사용되는 공간. 데몬에 배포. 
3. test-> tdd코드를 작성하는 공간 

건들지 말자.. 

사용법
 1. $ truffle create contract HelloToken

 HelloTruffle 파일 생성 

 2. truffle-config.js 수정 
 devalopment: { 부분 주석 해제
   
 }
가나슈 실행시 포트가 8545 -> 7545  => 포트 바꿔줌. 


3. $ truffle compile 
- build 폴더가 생성됩니다. 


4. $ truffle migrate 
migration 폴더에 파일 생성  
숫자_이름.js 
만든 파일 안에 1_initial_migration의 내용을 복사 붙여넣기 
Migration를 생성한 solidity파일 이름으로 바꿔줌. 


5. $ truffle create test helloToken
 test 파일생성. 

 it(string,collback) => string이 이 테스트 이름?  출력 후 callback 실행 
 만약에 에러가 발생하면 이 테스트 이름을 가진 테스트에서 문제가 생겼다는 것을 알려줌. 
 프로미스 객체로 반환하기 떄문에 async 
 await로 함수 실행한 결과를 변수에 담고.


 $ truffle test 



# Truffle 에서 react 사용하기

$ truffle unbox react

Commands:

  Compile:              truffle compile
  Migrate:              truffle migrate
  Test contracts:       truffle test
  Test dapp:            cd client && npm test
  Run dev server:       cd client && npm run start
  Build for production: cd client && npm run build


1. 어떤 데몬을 돌릴 것인가? 

trruffle-config.js 수정. 

    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     이 내용을 trruffle-config.js의 networks 객체 안에 추가. 

2. solidity 컴파일하기 
truffle complie 

src/contacts 폴더 안에 생긴다. 


3. solidity 배포하기 
truffle migrate

4. react 실행하기





============================================================================

1. truffle unbox react 
2. ganache 실행 후 metamask 연결 
3. truffle-config.js 파일 설정 

4. 내가 배포할 contract코드를 작성하기
   client>src의 이미 빌드되어 있던 파일 지우기. 
   contracts의 simple~~  삭제. == Migration만 만들기 
   migrations 2번파일 지우기.

   truffle create contract Fruitshop
   truffle create migration Fruitshop

   migrations 에서 1번파일 복사해서 새로 생긴 파일에 복붙 후 변수명 수정. 

   그리고 solidity 작성 



5. contract코드 컴파일 진행 
> $ truffle compile 

6. contract배포
> truffle migrate 


6. npm install @truffle/contract 설치  ((client 안에서)) 


