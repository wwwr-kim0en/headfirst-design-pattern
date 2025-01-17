# Strategy Pattern 전략 패턴

## 상속(Inheritance) vs 구성(Composition) 
먼저 상속(Inheritance)을 사용한 예시입니다:

```typescript
// 상속을 사용한 예시
class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    makeSound(): string {
        return "Some sound";
    }
    
    move(): string {
        return `${this.name} is moving`;
    }
}

class Dog extends Animal {
    private breed: string;
    
    constructor(name: string, breed: string) {
        super(name);  // 부모 클래스의 생성자 호출
        this.breed = breed;
    }
    
    // 부모 클래스의 메서드를 오버라이드
    makeSound(): string {
        return "Woof!";
    }
    
    // 자식 클래스만의 새로운 메서드
    fetch(): string {
        return `${this.name} is fetching the ball`;
    }
}

// 사용 예시
const myDog = new Dog("Max", "Golden Retriever");
console.log(myDog.makeSound());  // "Woof!"
console.log(myDog.move());       // "Max is moving"
console.log(myDog.fetch());      // "Max is fetching the ball"
```

이제 같은 개념을 구성(Composition)을 사용하여 구현해보겠습니다:

```typescript
// 구성을 사용한 예시
interface SoundBehavior {
    makeSound(): string;
}

interface MovementBehavior {
    move(): string;
}

// 구체적인 행동 클래스들
class Barking implements SoundBehavior {
    makeSound(): string {
        return "Woof!";
    }
}

class Walking implements MovementBehavior {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    move(): string {
        return `${this.name} is moving`;
    }
}

class FetchBehavior {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    fetch(): string {
        return `${this.name} is fetching the ball`;
    }
}

// 구성을 사용한 Dog 클래스
class Dog {
    private name: string;
    private breed: string;
    private soundBehavior: SoundBehavior;
    private movementBehavior: MovementBehavior;
    private fetchBehavior: FetchBehavior;
    
    constructor(name: string, breed: string) {
        this.name = name;
        this.breed = breed;
        this.soundBehavior = new Barking();
        this.movementBehavior = new Walking(name);
        this.fetchBehavior = new FetchBehavior(name);
    }
    
    makeSound(): string {
        return this.soundBehavior.makeSound();
    }
    
    move(): string {
        return this.movementBehavior.move();
    }
    
    fetch(): string {
        return this.fetchBehavior.fetch();
    }
}

// 사용 예시
const myDog = new Dog("Max", "Golden Retriever");
console.log(myDog.makeSound());  // "Woof!"
console.log(myDog.move());       // "Max is moving"
console.log(myDog.fetch());      // "Max is fetching the ball"
```

두 접근 방식의 주요 차이점을 살펴보겠습니다:

1. 상속 접근 방식:
   - 코드가 더 간단하고 직관적입니다.
   - 부모 클래스의 모든 기능을 자동으로 상속받습니다.
   - 하지만 부모 클래스의 변경이 모든 자식 클래스에 영향을 미칠 수 있습니다.
   - 다중 상속이 불가능하므로 유연성이 제한됩니다.

2. 구성 접근 방식:
   - 더 유연하고 모듈화된 설계가 가능합니다.
   - 각 행동을 독립적으로 변경하고 재사용할 수 있습니다.
   - 실행 시점에 행동을 동적으로 변경할 수 있습니다.
   - 코드가 더 복잡해질 수 있지만, 유지보수가 더 쉽습니다.

구성을 사용하면 행동들을 독립적인 클래스로 분리하여 더 유연한 설계가 가능합니다. 예를 들어, 나중에 새로운 소리 행동을 추가하고 싶다면 새로운 클래스를 만들어 `SoundBehavior` 인터페이스를 구현하기만 하면 됩니다. 이는 "확장에는 열려있고 수정에는 닫혀있다"는 개방-폐쇄 원칙(Open-Closed Principle)을 잘 따르는 설계입니다.

이러한 차이점들을 고려하여, 상황에 따라 적절한 방식을 선택하는 것이 중요합니다. 일반적으로 구성이 더 유연하고 확장 가능한 설계를 제공하지만, 때로는 상속의 단순함이 더 적절할 수 있습니다.

## Strategy Pattern 사용하기
전략 패턴은 알고리즘의 집합을 정의하고, 각 알고리즘을 캡슐화하여 교환 가능하게 만드는 디자인 패턴입니다. 이를 타입스크립트로 구현해보겠습니다.

쇼핑몰의 결제 시스템을 예시로 들어보겠습니다. 신용카드, 페이팔, 은행 이체 등 다양한 결제 방식을 지원해야 하는 상황입니다.

```typescript
// 결제 전략을 위한 인터페이스
interface PaymentStrategy {
    pay(amount: number): string;
}

// 구체적인 결제 전략 1: 신용카드 결제
class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;
    private cvv: string;

    constructor(cardNumber: string, cvv: string) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    pay(amount: number): string {
        // 실제로는 여기서 신용카드 결제 처리 로직이 들어갈 것입니다
        return `${amount}원을 카드 ${this.cardNumber}로 결제했습니다`;
    }
}

// 구체적인 결제 전략 2: 페이팔 결제
class PayPalPayment implements PaymentStrategy {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    pay(amount: number): string {
        // 실제로는 여기서 페이팔 결제 처리 로직이 들어갈 것입니다
        return `${amount}원을 PayPal 계정 ${this.email}로 결제했습니다`;
    }
}

// 구체적인 결제 전략 3: 은행 이체
class BankTransferPayment implements PaymentStrategy {
    private bankAccount: string;

    constructor(bankAccount: string) {
        this.bankAccount = bankAccount;
    }

    pay(amount: number): string {
        // 실제로는 여기서 은행 이체 처리 로직이 들어갈 것입니다
        return `${amount}원을 계좌 ${this.bankAccount}로 이체했습니다`;
    }
}

// 결제를 처리하는 컨텍스트 클래스
class PaymentContext {
    private strategy: PaymentStrategy; // 구성 사용됨

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    // 전략을 동적으로 변경할 수 있는 메서드
    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    // 선택된 전략을 사용하여 결제 실행
    executePayment(amount: number): string {
        return this.strategy.pay(amount);
    }
}

// 사용 예시
function demonstratePayment() {
    // 다양한 결제 전략 생성
    const creditCardPayment = new CreditCardPayment("1234-5678-9012-3456", "123");
    const payPalPayment = new PayPalPayment("user@example.com");
    const bankTransferPayment = new BankTransferPayment("123-456-789");

    // 결제 컨텍스트 생성 및 사용
    const paymentProcessor = new PaymentContext(creditCardPayment);

    // 신용카드로 결제
    console.log(paymentProcessor.executePayment(50000));

    // 페이팔로 결제 방식 변경
    paymentProcessor.setStrategy(payPalPayment);
    console.log(paymentProcessor.executePayment(30000));

    // 은행 이체로 결제 방식 변경
    paymentProcessor.setStrategy(bankTransferPayment);
    console.log(paymentProcessor.executePayment(100000));
}

// 실행
demonstratePayment();
```

이 코드는 전략 패턴의 주요 구성 요소를 모두 포함하고 있습니다:

1. Strategy (PaymentStrategy 인터페이스):
   - 모든 결제 전략이 따라야 하는 공통 인터페이스를 정의합니다.
   - pay() 메서드를 통해 모든 결제 방식이 동일한 방식으로 호출될 수 있게 합니다.

2. Concrete Strategies (CreditCardPayment, PayPalPayment, BankTransferPayment):
   - PaymentStrategy 인터페이스를 구현하는 구체적인 클래스들입니다.
   - 각각의 클래스는 자신만의 결제 로직을 구현합니다.

3. Context (PaymentContext):
   - 클라이언트가 실제로 사용하는 클래스입니다.
   - 현재 선택된 전략을 보관하고 실행합니다.
   - setStrategy() 메서드를 통해 런타임에 전략을 변경할 수 있습니다.

전략 패턴의 주요 장점은 다음과 같습니다:

1. 유연성: 새로운 결제 방식을 추가할 때 기존 코드를 수정하지 않고 새로운 전략 클래스만 추가하면 됩니다.
2. 캡슐화: 각 결제 방식의 구체적인 구현은 해당 클래스 내부에 캡슐화되어 있습니다.
3. 교체 가능성: 런타임에 결제 방식을 자유롭게 변경할 수 있습니다.

이러한 구조는 시스템을 더 유연하고 확장 가능하게 만들며, 새로운 요구사항이 추가될 때 기존 코드를 수정하지 않고도 새로운 기능을 추가할 수 있게 해줍니다. 
