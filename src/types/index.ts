import { Instance, SnapshotIn } from "mobx-state-tree";
import Ballance from "../store/Ballance";
import Category from "../store/Category";

export type Rate = {
    cc: string;
    exchangedate: string;
    r030: number;
    rate: number;
    txt: string;
};

export type ToastProps = {
    status: "error" | "success";
    text: string;
    id?: number;
};

export type BallanceType = SnapshotIn<typeof Ballance> | Instance<typeof Ballance>;

export type CategoryType = SnapshotIn<typeof Category> | Instance<typeof Category>;
