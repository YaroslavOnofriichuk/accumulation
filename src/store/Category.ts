import { types } from "mobx-state-tree";

const Category = types.model({
    name: types.string,
});

export default Category;