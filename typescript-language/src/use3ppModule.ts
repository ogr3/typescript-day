import {expect} from "chai";
import * as _ from "lodash";

describe("@types för lib som stödjer modulinkludering", () => {
  it("Lodash kan inkluderas som modul", ()=>{
    expect(_.map([1,2,3], x => x* 2)).to.eql([2,4,6]);
  });
});