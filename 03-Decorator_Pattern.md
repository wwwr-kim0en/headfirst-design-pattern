# 데코레이터 패턴 Decorator Pattern
## 정의
- 데코레이터 패턴으로 객체에 추가 요소를 동적으로 더할 수 있습니다.
- 데코레이터를 사용하면 서브클래스를 만들 때보다 훨씬 유연하게 기능을 확장할 수 있습니다.

##  코드 예시 
Beverage 라는 추상 클래스는 description 이라는 인스턴스 변수가 있고,
cost 라는 추상 메서드, getDescription 이라는 getter 를 가지고 있습니다.
서브클래스로 HouseBlend, DarkRoast, Decaf, Espresso 가 있습니다.

### Java
```java
// 추상 클래스 Beverage
public abstract class Beverage {
    protected String description = "Unknown Beverage";
    
    public String getDescription() {
        return description;
    }
    
    public abstract double cost();
}

// HouseBlend 서브클래스
public class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "House Blend Coffee";
    }
    
    @Override
    public double cost() {
        return 0.89;
    }
}

// DarkRoast 서브클래스
public class DarkRoast extends Beverage {
    public DarkRoast() {
        description = "Dark Roast Coffee";
    }
    
    @Override
    public double cost() {
        return 0.99;
    }
}

// Decaf 서브클래스
public class Decaf extends Beverage {
    public Decaf() {
        description = "Decaf Coffee";
    }
    
    @Override
    public double cost() {
        return 1.05;
    }
}

// Espresso 서브클래스
public class Espresso extends Beverage {
    public Espresso() {
        description = "Espresso";
    }
    
    @Override
    public double cost() {
        return 1.99;
    }
}
```

### TypeScript
```typescript
// 추상 클래스 Beverage
abstract class Beverage {
	protected description: string = "Unknown Beverage";

	getDescription(): string {
				return this.description;
	}

	abstract cost(): number;
}

// HouseBlend 서브클래스
class HouseBlend extends Beverage {
	constructor() {
			super();
			this.description = "House Blend Coffee";
	}
	cost(): number {
			return 0.89;
	}
}

// DarkRoast 서브클래스
class DarkRoast extends Beverage {
	constructor() {
			super();
	    	this.description = "Dark Roast Coffee";
	}

	cost(): number {
			return 0.99;
	}
}

// Decaf 서브클래스
class Decaf extends Beverage {
		constructor() {
				super();
				this.description = "Decaf Coffee";
		}

		cost(): number {
				return 1.05;
		}
}

// Espresso 서브클래스
class Espresso extends Beverage {
		constructor() {
				super();
				this.description = "Espresso";
		}

		cost(): number {
				return 1.99;
		}
}

// 사용 예시
const espresso = new Espresso();
console.log(espresso.getDescription()); // "Espresso"
console.log(espresso.cost()); // 1.99

```

### extends? implements? 어떤 걸 사용해야 할까?
```typescript
class HouseBlendWithSteamedMilk implements Beverage {}
class HouseBlendWithSteamedMilk extends Beverage {}
```

이 경우 `extends`를 사용하는 것이 적절한 이유:

1. `extends` vs `implements`의 기본적인 차이:
    - `extends`는 클래스를 상속할 때 사용 (클래스 → 클래스)
    - `implements`는 인터페이스를 구현할 때 사용 (인터페이스 → 클래스)

2. Beverage는 추상 클래스(abstract class)입니다:
    - 추상 클래스는 일반 메서드(`getDescription()`)와 추상 메서드(`cost()`)를 모두 가질 수 있음
    - 인스턴스 변수(`description`)를 가지고 있음
    - 이미 구현된 로직을 하위 클래스에 전달하려는 목적

3. 만약 Beverage를 인터페이스로 만든다면:
```typescript
interface Beverage {
    getDescription(): string;
    cost(): number;
}
```
이렇게 되면:
- `description` 변수를 공유할 수 없음
- `getDescription()`의 구현을 공유할 수 없음
- 각 서브클래스에서 모든 것을 다시 구현해야 함

따라서 이 경우에는 코드 재사용과 공통 기능 구현을 위해 추상 클래스와 `extends`를 사용하는 것이 더 적절합니다.

인터페이스는 "할 수 있는 것"을 정의할 때 사용하고, 추상 클래스는 "공통된 특성"을 공유할 때 사용합니다.



## 데코레이터 패턴(Decorator Pattern)을 적용했을 때

### TypeScript
```typescript
// 기본 컴포넌트: Beverage 추상 클래스
abstract class Beverage {
    protected description: string = "Unknown Beverage";

    getDescription(): string {
        return this.description;
    }

    abstract cost(): number;
}

// 구체적인 컴포넌트: 실제 음료들
class Espresso extends Beverage {
    constructor() {
        super();
        this.description = "Espresso";
    }

    cost(): number {
        return 1.99;
    }
}

// 데코레이터: 첨가물을 나타내는 추상 클래스
abstract class CondimentDecorator extends Beverage {
    protected beverage: Beverage;

    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }

    abstract getDescription(): string;
    abstract cost(): number;
}

// 구체적인 데코레이터들: 실제 첨가물들
class Mocha extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super(beverage);
    }

    getDescription(): string {
        return this.beverage.getDescription() + ", Mocha";
    }

    cost(): number {
        return this.beverage.cost() + 0.20;
    }
}

class Whip extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super(beverage);
    }

    getDescription(): string {
        return this.beverage.getDescription() + ", Whip";
    }

    cost(): number {
        return this.beverage.cost() + 0.10;
    }
}

class Soy extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super(beverage);
    }

    getDescription(): string {
        return this.beverage.getDescription() + ", Soy";
    }

    cost(): number {
        return this.beverage.cost() + 0.15;
    }
}

// 사용 예시
// 더블 모카 휘핑크림 에스프레소
let beverage = new Espresso();
beverage = new Mocha(beverage);     // 첫 번째 모카 추가
beverage = new Mocha(beverage);     // 두 번째 모카 추가
beverage = new Whip(beverage);      // 휘핑크림 추가

console.log(beverage.getDescription()); // "Espresso, Mocha, Mocha, Whip"
console.log(beverage.cost());          // 2.49 (1.99 + 0.20 + 0.20 + 0.10)// 1.34 (0.89 + 0.15 + 0.20 + 0.10)
```

### 정리
- 데코레이터의 슈퍼클래스는 자신이 장식하고 있는 객체의 슈퍼클래스와 같습니댜.
- 한 객체를 여러 개의 데코레이터로 감쌀 수 있습니댜. 
- 데코레이터는 자신이 감싸고 있는 객체와 같은 슈퍼클래스를 가지고 있기에 원래 객체(싸여 있는 객체)가 들어갈 자리에 데코레이터 객체를 넣어도 상관없습니다.
- <span style="background-color: rgba(248,181,68,0.5)">데코레이터는 자신이 장식하고 있는 객체에게 어떤 행동을 위임하는 일 말고도 추가 작업을 수행할 수 있습니댜.<span>
- 객체는 언제든지 감쌀 수 있으므로 실행 중에 필요한 데코레이터를 마음대로 적용할 수 있습니다.

### 여기서 잠깐! 
구성 요소의 형식만 상속하면 되는 거라면 Beverage 클래스를 왜 인터페이스로 만들지 않고 추상 클래스로 만든걸까?
p127
: 이 코드를 처음 받았을 때부터 Beverage 라는 추상 클래스를 사용하고 있었기 때문입니다. 원래 데코레이터 패턴에서는 특정한 추상 구상요소를 지정할 필요가 없습니다. 그래서 사실 인터페이스를 쓰면 됩니다. 하지만 기존 코드를 고치는 일은 될 수 있으면 치하는 게 좋으니까 추상 클래스를 써도 되는 상황이라면 그냥 추상 클래스만 가지고 작업을 하는 게 나을 수도 있습니다. 


# 디자인 원칙 - OCP(Open-Closed Principle)
- 클래스는 확장에 대해서는 열려 있어야 하지만 변경에 대해서는 닫혀 있어야 한다.


무조건 OCP를 적용한다면 괜히 쓸데없는 일을 하며 시간을 낭비할 수 있으며, 필요 이상으로 복잡하고 이해하기 힘든 코드를 만들게 될 수 있습니다.
(OCP를 지키다 보면 새로운 단계의 추상화가 필요한 경우가 종종 있는데, 추상화를 하다 보면 코드가 복잡해집니다.)

그래서 우리가 디자인한 것 중에서 가장 바뀔 가능성이 높은 부분을 중점적으로 살펴보고 OCP를 적용하는 방법이 가장 좋습니다.



