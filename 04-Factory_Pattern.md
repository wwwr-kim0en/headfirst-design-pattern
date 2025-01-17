# 팩토리 패턴 Factory Pattern

```typescript
class Pizza {
  prepare(): void {
    console.log("Preparing the pizza...");
  }

  bake(): void {
    console.log("Baking the pizza...");
  }

  cut(): void {
    console.log("Cutting the pizza...");
  }

  box(): void {
    console.log("Boxing the pizza...");
  }
}

function orderPizza(type:string): Pizza {
    let pizza = null
    // 피자 종류에 따라 다른 피자 객체를 생성
    if(type === 'cheese') {
      pizza = new CheesePizza();
    } else if(type === 'pepperoni') {
      pizza = new PepperoniPizza();
    } else if(type === 'greek') {
      pizza = new GreekPizza();
    } else if(type === 'veggie') {
      pizza = new VeggiePizza();
    }
    // 피자 종류가 추가될 때마다 코드를 수정해야 함
    

  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();

  return pizza;
}

```
⬇️ 캡슐화 진행

```typescript
class SimplePizzaFactory {
	createPizza(type:string){
		let pizza = null;
		
			if(type === 'cheese') {
				pizza = new CheesePizza();
			} else if(type === 'pepperoni') {
					pizza = new PepperoniPizza();
			} else if (type === 'clam') {
					pizza = new ClamPizza();
			} else if(type === 'veggie') {
					pizza = new VeggiePizza();
			}
		return pizza;
        }
}

```
## 정적 팩토리(static factory)
간단한 팩토리를 정적 메소드로 정의해서 사용하는 기법
#### 왜 사용하는 것일까?
정적 메소드를 사용하면 객체 생성 메소드를 실행하려고 객체의 인스턴스를 만들지 않아도 되기 때문입니다.

하지만 서브클래스를 만들어서 객체 생성 메소드의 행동을 변경할 수 없다는 단점이 있습니다.

```typescript
class SimplePizzaFactory {
  static createPizza(type:string){
    let pizza = null;
    
      if(type === 'cheese') {
        pizza = new CheesePizza();
      } else if(type === 'pepperoni') {
          pizza = new PepperoniPizza();
      } else if (type === 'clam') {
          pizza = new ClamPizza();
      } else if(type === 'veggie') {
          pizza = new VeggiePizza();
      }
    return pizza;
        }
}  
```


#### 정적 팩토리가 아닌 팩토리 메소드 구현
1. 코드
```typescript
class SimplePizzaFactory {
  private defaultType: string;

  constructor(defaultType: string = "cheese") {
    this.defaultType = defaultType; // 팩토리의 기본 상태
  }

  createPizza(type?: string) {
    let pizza = null;
    const pizzaType = type || this.defaultType; // 전달된 타입이 없으면 기본 타입 사용

    if (pizzaType === "cheese") {
      pizza = new CheesePizza();
    } else if (pizzaType === "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (pizzaType === "clam") {
      pizza = new ClamPizza();
    } else if (pizzaType === "veggie") {
      pizza = new VeggiePizza();
    }

    return pizza;
  }

  setDefaultType(type: string) {
    this.defaultType = type; // 기본 타입 변경
  }
}

// Pizza 클래스들
class CheesePizza {
  constructor() {
    console.log("Cheese Pizza created!");
  }
}

class PepperoniPizza {
  constructor() {
    console.log("Pepperoni Pizza created!");
  }
}

class ClamPizza {
  constructor() {
    console.log("Clam Pizza created!");
  }
}

class VeggiePizza {
  constructor() {
    console.log("Veggie Pizza created!");
  }
}

// 사용 예시
const factory = new SimplePizzaFactory("veggie"); // 기본 피자 타입 설정
const pizza1 = factory.createPizza(); // 기본 타입으로 피자 생성
const pizza2 = factory.createPizza("clam"); // 특정 타입으로 피자 생성

factory.setDefaultType("pepperoni"); // 기본 타입 변경
const pizza3 = factory.createPizza(); // 변경된 기본 타입으로 피자 생성


```

2. 정적 팩토리와의 차이점
- __상태 기반 동작__ : 정적 팩토리 메서드에서는 상태를 가질 수 없지만, 인스턴스 팩토리는 클래스 상태(defaultType)를 기반으로 동작을 변경할 수 있습니다.
- __동적 동작 변경__ : setDefaultType 메서드를 통해 기본 피자 타입을 동적으로 변경할 수 있습니다.
- __의존성 주입__ : 팩토리 인스턴스 생성 시 의존성을 주입하여 객체 생성 로직을 변경할 수 있습니다.
- __확장성__ :팩토리 클래스의 동작을 서브클래싱으로 변경하거나 새로운 메서드를 추가하여 쉽게 확장할 수 있습니다.
이 접근법은 정적 메서드보다 유연하며, 특히 애플리케이션의 요구사항이 변경되거나 팩토리 동작을 테스트해야 할 때 유용합니다.

## 팩토리 메소드 Factory Method


```typescript
// ChicagoPizzaIngredientFactory

class ChicagoPizzaIngredientsFactory extends PizzaIngredientsFactory {
  createDough(): Dough {
    return new ThickCrustDough();
  }

  createSauce(): Sauce {
    return new PlumTomatoSauce();
  }

  createCheese(): Cheese {
    return new MozzarellaCheese();
  }

  createVeggies(): Veggies[] {
    return [new BlackOlives(), new Spinach(), new Eggplant()];
  }

  createPepperoni(): Pepperoni {
    return new SlicedPepperoni();
  }

  createClam(): Clams {
    return new FrozenClams();
  }
		
}
```
<br/>
Pizza 클래스가 팩토리에서 생산한 원재료만 사용하도록 코드 변경 ⬇️


```typescript
abstract class Pizza {
  name:string;
	dough:Dough;
	sauce:Sauce;
	veggies:Veggies[];
	cheese:Cheese;
	pepperoni:Pepperoni;
	clam:Clams;
	
		
	abstract prepare():void;
		// 추상 메소드 생성 - 이 부분에서 피자를 만드는 데 필요한 재료들을 가져온다. 물론 모든 원재료는 원재료 팩토리에서 가져온다.
    
  bake():void{
		console.log("175도에서 25분 간 굽는다.");
  }

	cut():void{
		console.log("피자를 대각선으로 자른다.");
  }
		
	box():void{
		console.log("피자를 포장한다.");
  }
	
	setName(name:string):void{
			this.name = name
  }
	getName():string{
      return this.name
  }
	
	toString():string{
    console.log("피자 이름: " + this.name);
  }
}
```

