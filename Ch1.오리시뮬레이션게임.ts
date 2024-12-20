class Duck {
		quack(){};
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
