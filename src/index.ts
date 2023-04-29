import 'reflect-metadata';

import { Container, Service, Inject } from 'typedi';

interface Factory {
    create(): void;
}

@Service('bean.factory')
class BeanFactory implements Factory {
    create() {
        console.log('bean factory create!')
    }
}

@Service('sugar.factory')
class SugarFactory implements Factory {
    create() {
        console.log('sugar factory create!')
    }
}

@Service('water.factory')
class WaterFactory implements Factory {
    create() {
        console.log('water factory create!')
    }
}

@Service('coffee.maker')
class CoffeeMaker {
    beanFactory: Factory;
    sugarFactory: Factory;
    waterFactory: Factory;

    constructor(
        @Inject('bean.factory') beanFactory: BeanFactory,
        @Inject('sugar.factory') sugarFactory: SugarFactory,
        @Inject('water.factory') waterFactory: WaterFactory
    ) {
        this.beanFactory = beanFactory;
        this.sugarFactory = sugarFactory;
        this.waterFactory = waterFactory
    }

    make() {
        this.beanFactory.create();
        this.sugarFactory.create();
        this.waterFactory.create();
    }
}

let coffeeMaker = Container.get<CoffeeMaker>('coffee.maker');
coffeeMaker.make()