import { types } from "mobx-state-tree";

const Category = types.model({
    name: types.string,
});

const Ballance = types.model({
    plus: types.number,
    minus: types.number,
    month: types.string,
    category: types.reference(Category),
});

const User = types.model({
    login: types.string,
    password: types.string,
});

const RootStore = types.model({
    ballances: types.array(Ballance),
    categories: types.array(Category),
    users: types.array(User),
    isLoggedIn: types.boolean,
});

const defaultUser = User.create({
    login: "testLogin22",
    password: "s#dDA23@44#Ds",
});

const store = RootStore.create({
    users: [defaultUser],
    isLoggedIn: false,
    ballances: [],
    categories: [],
});

export default store;
