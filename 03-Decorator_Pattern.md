# 데코레이터 패턴 Decorator Pattern

- 객체 작성이라는 형식으로 실행 중에 클래스를 꾸미는(decorate) 방법을 배운다.
- 기존 클래스 코드를 바꾸지 않고도 객체에 새로운 임무를 추가할 수 있다.


##  코드 예시 
Beverage 라는 추상 클래스는 description 이라는 인스턴스 변수가 있고,
cost 라는 추상 메서드, getDescription 이라는 getter 를 가지고 있다.
서브클래스로 HouseBlend, DarkRoast, Decaf, Espresso 가 있다.

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

따라서 이 경우에는 코드 재사용과 공통 기능 구현을 위해 추상 클래스와 `extends`를 사용하는 것이 더 적절하다.

인터페이스는 "할 수 있는 것"을 정의할 때 사용하고, 추상 클래스는 "공통된 특성"을 공유할 때 사용합니다.
