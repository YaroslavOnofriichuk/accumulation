import { Instance, onSnapshot, types, SnapshotIn } from "mobx-state-tree";
import Category from "./Category";
import Ballance from "./Ballance";
import User from "./User";
import { createContext, useContext } from "react";

type BallanceType = SnapshotIn<typeof Ballance>;

type CategoryType = SnapshotIn<typeof Category>;

const RootStore = types
    .model({
        ballances: types.array(Ballance),
        categories: types.array(Category),
        users: types.array(User),
        isLoggedIn: types.boolean,
    })
    .views((self) => ({
        get allCategories() {
            return Array.from(self.categories.values());
        },
        get allBallances() {
            return Array.from(self.ballances.values()).sort((a, b) =>
                a.month.localeCompare(b.month)
            );
        },
    }))
    .actions((self) => ({
        signIn() {
            self.isLoggedIn = true;
        },
        signOut() {
            self.isLoggedIn = false;
        },
        findUser(login: string, password: string) {
            return self.users.find(
                (user) => user.login === login && user.password === password
            );
        },
        saveCategory(name: string) {
            const category = self.categories.find(c => c.name === name)
            if (!category) {
                self.categories.push(Category.create({ name }))
            } 
        },
        removeCategory(name: string) {
            self.categories.filter(cat => cat.name !== name)
        },
        saveBallance(ballance: BallanceType) {
            const bal = self.ballances.find(b => b.month === ballance.month)
            if (bal) {
                self.ballances.remove(bal)
            }
            self.ballances.push(Ballance.create(ballance))
        },
        removeBallance(ballance: BallanceType) {
            const bal = self.ballances.find(b => b.month === ballance.month)
            if (bal) {
                self.ballances.remove(bal)
            }
        },
    }));

const defaultUser = User.create({
    login: "testLogin22",
    password: "s#dDA23@44#Ds",
});

let initialState = RootStore.create({
    users: [defaultUser],
    isLoggedIn: false,
    ballances: [],
    categories: [],
});

const data = localStorage.getItem("rootState");
if (data) {
    const json = JSON.parse(data);
    if (RootStore.is(json)) {
        //@ts-ignore
        initialState = RootStore.create(json);
    }
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
    console.log("Snapshot: ", snapshot);
    localStorage.setItem("rootState", JSON.stringify(snapshot));
});

export type RootInstance = Instance<typeof RootStore>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}
