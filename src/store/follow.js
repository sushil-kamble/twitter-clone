const follow = {
  actions: {
    async toggleFollow({ commit, dispatch, rootState }, payload) {
      const targetUser = rootState.users.find((user) => user.id === payload);
      if (!targetUser.isFollowing) {
        await fetch(`http://localhost:3000/follow/${payload}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${rootState.userModule.user.token}`,
          },
        });
        commit("FOLLOW_USER", payload);
      } else {
        await fetch(`http://localhost:3000/follow/${payload}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${rootState.userModule.user.token}`,
          },
        });
        commit("UNFOLLOW_USER", payload);
      }
      dispatch("loadTweets");
    },
  },
};

export default follow;
