class Universe {
    constructor(number) {
      this.number = number;
      this.name = 'Universe' + this.number.toString();
      this.numFixtures = 0;
      this.fixtures = [];
    }
  
    addFixture(fixture) {
      this.fixtures.push(fixture);
    }
  }