import { User } from "@/types/views";
import { proxy } from "valtio";

interface State {
  user: User;
}

export const state = proxy<State>({
  user: {
    name: "code id",
    email: "code_id@gmail.com",
    id: 0,
    phone: "0812313123",
    username: "code id",
    website: "codeid.com",
  },
});

export const setUser = (user: User) => {
  state.user = user;
};
