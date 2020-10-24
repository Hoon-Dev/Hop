<div align="center">
    <h1>⭐️ Hop (Hoon Popup) ⭐️</h1>
</div>

`Hop(Hoon Popup)`은 웹 환경에서 자바스크립트로 **쉽고 빠르게 팝업**을 띄울 수 있는 라이브러리 입니다.

## 🌐 Supported Browers

|Internet Explorer|Edge|FireFox|Chrome|Safari|
|:-:|:-:|:-:|:-:|:-:|
|9+|All|20+|22+|5.1+|

## Features

## 💎 Examples
- [Normal Popup](https://hoon-dev.github.io/Hop/example/index.html)

## ⚙ Installation

### scripts

```Javascript
<script src="https://hoon-dev.github.io/Hop/release/1.1.0/hop.js"></script>
```
## 🔍 Structure

- **중계자 (Hop)**
    - add (Function)
    - remove (Function)
    - setShadow (Function)
    - **팝업**
        - open (Function)
        - close (Function)
        - **속성**
            - name (String)
            - body (String)
            - events (Array)
                - class (String)
                - event (Function)

## 📝 How to Use

`Hop(Hoon Popup)`을 이용하여 팝업을 띄우는 과정은 다음과 같습니다.

1. 자신만의 팝업을 만들어 **추가(Add)** 한다.
2. 원하는 때에 해당 팝업을 **오픈(Open)** 한다.

그러면 지금부터 위의 두과정을 스크립트로 알아보겠습니다.

> **(1). 팝업을 추가한다.**

```Javascript
Hop.add({
    name: "팝업_이름"
});
```

> **(2). 팝업을 오픈한다.**

```Javascript
Hop["팝업_이름"].open();
```

자 위의 과정을 따라왔다면, 브라우저에 `"내용 없음"` 이라는 팝업이 나올겁니다.<br>
그러면 이제 **간단하게 내용**을 한번 넣어보겠습니다.

> **(3). 팝업에 내용넣기**

```Javascript
Hop.add({
    name: "팝업_이름",
    body: `<h1>안녕!</h1>
           <p>저는 팝업이에요</p>`
});
```

짠! 간단하죠, Hop의 `body 속성`은 팝업의 **모양을 결정** 할 수 있습니다.<br>
흠 .. 그런데 내용들의 **CSS를 수정**하고 싶다면 어떻게 해야할까요?

> **(4). 팝업 CSS 수정하기**

```CSS
#팝업_이름 h1{
    color: red;
}

#팝업_이름 p{
    color: blue;
}
```

위와같이 **기존의 CSS**를 하듯이 접근하여 스타일을 수정할 수 있습니다.<br>
마지막으로 **닫기 버튼**을 만들어서 팝업을 닫아보겠습니다.

> **(5). 닫기 버튼만들기**

```Javascript
Hop.add({
    name: "팝업_이름",
    body: `<button class="close"></button>
           <h1>안녕!</h1>
           <p>저는 팝업이에요</p>`,
    events: [
        {
            class: "close",
            event: function(){
                this.close();
            }
        }
    ]
});
```

Hop은 **class 이름을 이용**하여 클릭 이벤트에 원하는 함수를 추가 할 수 있습니다.<br>
위 예제의 this는 추가하는 팝업을 의미하기에 해당 팝업을 닫을 수 있습니다.