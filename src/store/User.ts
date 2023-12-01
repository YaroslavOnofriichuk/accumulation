import { types } from "mobx-state-tree";

const User = types.model({
    login: types.string,
    password: types.string,
});

export default User;