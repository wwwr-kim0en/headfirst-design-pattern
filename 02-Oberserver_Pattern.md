
옵저버 패턴 Observer Pattern
한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이 가고, 자동으로 내용이 갱신되는 방식으로 일대다one-to-many 의존성을 정의한다.
'주체'와 '옵저버'로 구성되어 있다.
주체는 여러 옵저버가 있을 수 있고, 각 옵저버는 주체에 대해 '등록'되어 있어야 한다.
보통은 주제 인터페이스와 옵저버 인터페이스가 들어있는 클래스 디자인으로 구현한다.
옵저버는 데이터가 변경되었을 때 subject에서 갱신해 주기를 기다리는 입장이기 때문에 의존성을 가진다.=> 여러 객체가 동일한 데이터를 제어하는 방법보다 더 깔끔한 객체지향 디자인을 만들 수 있다.