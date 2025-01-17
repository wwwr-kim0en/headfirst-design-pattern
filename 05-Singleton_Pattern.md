# 싱글톤 패턴 Singleton Pattern

> 클래스 인스턴스를 하나만 만들고, 그 인스턴스로의 전역 접근을 제공합니다.



```typescript
class Singleton {
    // 인스턴스가 필요할 때 생성하지 말고 처음부터 생성해두면 멀티스레딩 문제 해결 가능 - 정적 초기화 부분(static initializer)에서 생성     
    private static uniqueInstance = new Singleton() 
		
    private constructor(){}
    
    public static getInstance():Singleton {  // 인스턴스를 얻는 정적 메소드 (클래스 메소드)
				if(!Singleton.uniqueInstance){
						Singleton.uniqueInstance = new Singleton();
        }
				return Singleton.uniqueInstance
    }
		
}
```


## enum을 사용한 싱글톤 패턴

```typescript
// Singleton enum 정의
enum Singleton {   
    UNIQUE_INSTANCE
    // ...
}

// SingletonClient 클래스
class SingletonClient {
    public static main(): void {
        const singleton: Singleton = Singleton.UNIQUE_INSTANCE;
		}
}

```

하지만 TypeScript에서 싱글톤 패턴을 구현할 때는 보통 enum보다는 class를 사용하는 것이 더 일반적입니다. 더 TypeScript스러운 방식으로 작성하면 이렇게 됩니다:

```typescript
class Singleton {
    private static instance: Singleton = new Singleton();
    
    private constructor() {}
    
    public static getInstance(): Singleton {
        return Singleton.instance;
    }
    
    // 추가 메서드나 속성들...
}

// 사용 예시
class SingletonClient {
    public static main(): void {
        const singleton: Singleton = Singleton.getInstance();
    }
}

```

두 방식의 주요 차이점은:

TypeScript의 enum은 Java의 enum과 달리 주로 단순한 상수 집합을 표현하는 데 사용됩니다
TypeScript에서 싱글톤 패턴은 보통 클래스를 사용하여 구현합니다
TypeScript의 enum은 Java의 enum처럼 인스턴스 관리 기능이 없습니다
