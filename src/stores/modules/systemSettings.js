/**
 * Created by mudong on 2017/11/28 0028.
 */

const app = {
  state: {
    systemSettingsCurrentPageName: localStorage.getItem('systemSettingsCurrentPageName') ? localStorage.getItem('systemSettingsCurrentPageName') : 'wb_system',
    systemSettingsTags: localStorage.getItem('systemSettingsTags') ? JSON.parse(localStorage.getItem('systemSettingsTags')) : [{title: '系统设置', path: '', name: 'wb_system', argu: {}, query: {}}]
  },
  getters: {

  },
  mutations: {
    addSystemSettingsTag (state, newPage) {
      if (newPage !== undefined) {
        let newPageIndex = state.systemSettingsTags.length;
        state.systemSettingsTags.map((item, index) => {
          if (item.name === newPage.name) {
            newPageIndex = index;
          }
        });
        state.systemSettingsTags.splice(newPageIndex, 1, newPage);

        state.systemSettingsCurrentPageName = newPage.name;
        localStorage.systemSettingsCurrentPageName = newPage.name;
      } else {
        localStorage.systemSettingsCurrentPageName = localStorage.getItem('systemSettingsCurrentPageName') ? localStorage.getItem('systemSettingsCurrentPageName') : 'wb_system';
      }

      localStorage.systemSettingsTags = JSON.stringify(state.systemSettingsTags);
    },
    removeSystemSettingsTag (state, name) {
      state.systemSettingsTags.map((item, index) => {
        if (item.name === name) {
          state.systemSettingsTags.splice(index, 1);
        }
      });
      localStorage.systemSettingsTags = JSON.stringify(state.systemSettingsTags);
    },
    clearAllSystemSettingsTags (state) {
      state.systemSettingsTags.splice(1);
      localStorage.systemSettingsTags = JSON.stringify(state.systemSettingsTags);
    },
    clearOtherSystemSettingsTags (state, vm) {
      let currentName = vm.$route.name;
      let currentIndex = 0;
      state.systemSettingsTags.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index;
        }
      });
      if (currentIndex === 0) {
        state.systemSettingsTags.splice(1);
      } else {
        state.systemSettingsTags.splice(currentIndex + 1);
        state.systemSettingsTags.splice(1, currentIndex - 1);
      }
      localStorage.systemSettingsTags = JSON.stringify(state.systemSettingsTags);
    },
    setOpenedSystemSettingsList (state) {
      state.systemSettingsTags = localStorage.systemSettingsTags ? JSON.parse(localStorage.systemSettingsTags) : [otherRouter.children[0]];
    }
  },
  actions: {

  }
};

export default app;
