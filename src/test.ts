class RealService implements Service {
  constructor() {

  }

  findUsers(): string[] {
    return ["User1", "User2"];
  }

  findMostPopular(): string {
    return 'User1';
  }
}


class TestService implements Service {
  constructor() {

  }

  findUsers(): string[] {
    return ["TestUser1", "TestUser2"];
  }

  findMostPopular(): string {
    return 'TestUser1';
  }
}

interface Service {
  findUsers(): string[];
  findMostPopular(): string;
}


class Controller {
  constructor( private service: Service) {}


  findUsers(): any {
    return {'mostPopular': this.service.findMostPopular(), 'all': this.service.findUsers()};
  }
}


const controller: Controller = new Controller(new TestService());

console.log(controller.findUsers());
