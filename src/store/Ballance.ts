import { types } from "mobx-state-tree";
import Category from "./Category";

const Ballance = types.model({
    plus: types.number,
    minus: types.number,
    month: types.string,
    category: types.optional(types.reference(Category), "")
});

export default Ballance;