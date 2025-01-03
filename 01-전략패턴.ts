class Duck {
		quack(){
				console.log('quack quack 🦆')
		};
		swim(){};
		display(){}
		fly(){} // 모든 오리가 날 수 있는 것은 아니기 때문에 fly() 수정 필요
}

class MallardDuck extends Duck {
		constructor(){
				super();
		}

		display(){

		}
}

class RedheadDuck extends Duck {
		constructor() {super();}

		display(){}

}
class RubberDuck extends Duck {
		constructor() {super();}

		quack(){
				console.log('ppick ppick🐤')
		}
		display(){}
		fly(		){
				console.log('I can not fly')
		}

}

class DecoyDuck extends Duck {
		display(){

		}
		quack(){
				console.log('i can not quack')
		}
		fly(){
				console.log('I can not fly')
		}
}
/**
* Duck 의 행동을 상속할 때 단점이 될 수 있는 요소
* - 서브클래스에서 코드가 중복된다.
* - 실행 시에 특징을 바꾸기 힘들다.
* - 모든 오리의 행동을 알기 힘들다.
*  - 코드를 변경했을 때 다른 오리들에게 원치 않은 영향을 끼칠 수 있다.
*/

