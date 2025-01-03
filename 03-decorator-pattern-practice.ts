type Size = {
		TALL: "TALL";
		GRANDE: "GRANDE";
		VENTI: "VENTI";
}
abstract class Beverage {
		size:Size[keyof Size] = "TALL";
		protected description: string = '제목없음';

		setSize(size:Size[keyof Size]){
				this.size = size;
		}
		getSize(){
				return this.size
		}
		getDescription(){
				return this.description
		}
		abstract cost ():number;
}

abstract class CondimentDecorator extends Beverage {
		beverage:Beverage;
		abstract getDescription():string;
		getSize (){
				return this.beverage.getSize()
		}
}

/** 왜 CondimentDecorator 는 cost()를 구현하지 않았을까?
* 추상 클래스는 구체적인 구현을 제공하지 않는 클래스이기 때문에,
* 추상 클래스가 또 다른 추상 클래스에서 추상 메서드를 구현하지 않아도 괜찮습니다.
* 대신, CondimentDecorator 를 상속받는 구체 클래스가 cost()를 반드시 구현해야 합니다.
* 만약 CondimentDecorator 가 추상 클래스가 아니라면, Beverage 의 추상 메서드인 cost()를 반드시 구현해야 합니다. 그렇지 않으면 컴파일 에러가 발생합니다.
*/


class HouseBlend extends CondimentDecorator {
		description:string;
		constructor(size:Size[keyof Size]){
				super();
				this.description = '하우스 블렌드';
				this.size = size;
		}
		getDescription(): string {
				return this.description;
		}
		cost(): number {
				switch(this.size){
						case 'TALL':
								return 0.89 + 0.1;
						case 'GRANDE':
								return 0.89 + 0.15;
						case 'VENTI':
								return 0.89 + 0.2;
				}
		}
}
const houseBlend = new HouseBlend('TALL');
class DarkRoast extends CondimentDecorator {
	description:string;
		constructor(){
				super();
				this.description = '다크 로스트'
		}
		getDescription(): string {
				return this.description;
		}
		cost ():number {
				return 0.99;
		}
}
const darkRoast = new DarkRoast();
class Decaf extends CondimentDecorator {
		description:string;
		constructor(){
				super();
				this.description = '디카페인'
		}
		getDescription(): string {
				return this.description;
		}
		cost(): number {
				return 1.05;
		}
}
const decaf = new Decaf();
class Espresso extends CondimentDecorator {
		description:string;
		constructor(){
				super();
				this.description = '에스프레소'
		}
		getDescription(): string {
				return this.description;
		}
		cost(): number {
				return 1.99;
		}
}
const espresso = new Espresso();

class Milk extends CondimentDecorator {
		constructor(beverage:Beverage){
	super();
	this.beverage = beverage
		}
		getDescription(): string {
				return this.beverage.getDescription() + ', 우유';
		}
		cost() : number {
				return this.beverage.cost() + 0.1;
		}
}

class Mocha extends CondimentDecorator {
		beverage: Beverage
		constructor (beverage:Beverage){
				super();
				this.beverage = beverage
		}
		getDescription(): string {
				return this.beverage.getDescription() + ', 모카';
		}
		cost(): number {
				return this.beverage.cost() + 0.2;
		}
}

class SoyMilk extends CondimentDecorator {
		beverage:Beverage
		constructor (beverage:Beverage){
				super();
				this.beverage = beverage
		}
		getDescription(): string {
				return this.beverage.getDescription() + ', 두유';
		}
		cost(): number {
				return this.beverage.cost() + 0.15;
		}
}

class Whip extends CondimentDecorator {
		beverage:Beverage
		constructor (beverage:Beverage){
				super();
				this.beverage = beverage
		}
		getDescription(): string {
				return this.beverage.getDescription() + ', 휘핑';
		}
		cost(): number {
				return this.beverage.cost() + 0.1;
		}
}
