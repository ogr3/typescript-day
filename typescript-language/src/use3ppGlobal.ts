import {expect} from "chai";

describe("@types för lib som stödjer global defintiion", () => {
  it("Lodash kan även refereras utan explicit import eftersom den även är deklararerad som global", ()=>{
    expect(_.map([1,2,3], x => x* 2)).to.eql([2,4,6]);
  });
});