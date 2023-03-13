import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Login.vue"),

      meta: {
        keepAlive: false,
        // keep: false,
      },
    },

    //  管理员路由
    {
      path: "/aTeacherInfo",
      component: () => import("@/views/admin/aTeacherInfo.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aClStuInfo",
      component: () => import("@/views/admin/aClStuInfo.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aGroups",
      component: () => import("@/views/admin/aGroups.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aCourse",
      component: () => import("@/views/admin/aCourse.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aAttendance",
      component: () => import("@/views/admin/aAttendance.vue"),
      meta: {
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aClockin",
      component: () => import("@/views/admin/aAttendance/aClockin.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aLeave",
      component: () => import("@/views/admin/aLeave.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/anotpass",
      name:'anotpass',
      component: () => import("@/views/admin/anotpass.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aGrade",
      component: () => import("@/views/admin/aGrade.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aGradex",
      component: () => import("@/views/admin/aGradex.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aGrade-edit",
      component: () => import("@/views/admin/aGrade/aGrade-edit.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aGradex-edit",
      component: () => import("@/views/admin/aGrade/aGradex-edit.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    {
      path: "/aRevise",
      component: () => import("@/views/admin/aRevise.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },
   
    {
      path: '/aa',
      props:true,
      name:'aa',
      component: () => import("@/views/admin/detail.vue"),
      meta: {
        keepAlive: false,
        // keep: false,
        keea: false,
        kee: true,
      },
    },

    //教师路由
    {
      path: "/tCourse",
      component: () => import("@/views/teacher/tCourse.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tIssued",
      component: () => import("@/views/teacher/tIssued.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tApproval",
      component: () => import("@/views/teacher/tApproval.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/hasApproved",
      component: () => import("@/views/teacher/tApproval/hasApproved.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/dotask",
      component: () => import("@/views/teacher/tApproval/workparent.vue"),
      meta: {
        keepAlive: true,
        // keep: false,
      },
      children: [
        {
          path: "/dotask",
          component: () => import("@/views/teacher/tApproval/dowork.vue"),
        },
        {
          path: "dotasks",
          component: () => import("@/views/teacher/tApproval/dowork.vue"),
        },
        {
          path: "works",
          component: () => import("@/views/teacher/tApproval/works.vue"),
        },
        {
          path: "correct",
          component: () => import("@/views/teacher/tApproval/correct.vue"),
        },
        { path: "back", redirect: "/tApproval" },
      ],
    },

    {
      path: "/tClockin",
      component: () => import("@/views/teacher/tAttendance/tClockin.vue"),
      meta: {
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tAttendance",
      component: () => import("@/views/teacher/tAttendance.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tLeave",
      component: () => import("@/views/teacher/tLeave.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tnotpass",
      name:'tnotpass',
      component: () => import("@/views/teacher/tnotpass.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tedit",
      name:'tedit',
      component: () => import("@/views/teacher/tedit.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tGrade",
      component: () => import("@/views/teacher/tGrade.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },
    {
      path: "/tgradex",
      component: () => import("@/views/teacher/tGrade/tgradex.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tgrade-edit",
      component: () => import("@/views/teacher/tGrade/tgrade-edit.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tgradex-edit",
      component: () => import("@/views/teacher/tGrade/tgradex-edit.vue"),
      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    {
      path: "/tRevise",
      component: () => import("@/views/teacher/tRevise.vue"),

      meta: {
        // keepAlive: false,
        // keep: false,
        keea: true,
        kee: false,
      },
    },

    //学生路由

    {
      path: "/sInfo",
      component: () => import("@/views/学生信息管理/sInfo.vue"),
      meta: {
        keepAlive: true,
        // keep: false,
      },
    },

    {
      path: "/sCourse",
      component: () => import("@/views/学生信息管理/sCourse.vue"),
      meta: {
        keepAlive: true,
        // keep: true,
      },
    },

    {
      path: "/sWork",
      component: () => import("@/views/学生信息管理/sWork.vue"),
      meta: {
        keepAlive: true,
        // keep: true,
      },
    },

    {
      path: "/geOfApproval",
      component: () => import("@/views/学生信息管理/sWork/geOfApproval.vue"),
      meta: {
        keepAlive: true,
        // keep: true,
      },
    },

    {
      path: "/hasBeenApproved",
      component: () => import("@/views/学生信息管理/sWork/hasBeenApproved.vue"),
      meta: {
        keepAlive: true,
        // keep: true,
      },
    },

    {
      path: "/sAttendance",
      component: () => import("@/views/学生信息管理/sAttendance.vue"),
      meta: {
        keepAlive: true,
        // keep: true,
      },
    },

    {
      path: "/Clockin",
      component: () => import("@/views/学生信息管理/sAttendance/Clockin.vue"),
      meta: {
        keepAlive: true,
        // keep: true,
      },
    },

    {
      path: "/sLeave",
      component: () => import("@/views/学生信息管理/sLeave.vue"),
      meta: {
        keepAlive: true,
        // keep: true,
      },
    },

    {
      path: "/notpass/:stuId",
      name:'notpass',
      component: () => import("@/views/学生信息管理/notpass.vue"),
      meta: {
        keepAlive: true,
        // keep: false,
      },
    },

    {
      path: "/edit/:stuId",
      name:'edit',
      component: () => import("@/views/学生信息管理/edit.vue"),
      meta: {
        keepAlive: true,
        // keep: false,
      },
    },

    {
      path: "/nedit",
      component: () => import("@/views/学生信息管理/nedit.vue"),
      meta: {
        keepAlive: true,
        // keep: false,
      },
    },

    {
      path: "/sRevise",
      component: () => import("@/views/学生信息管理/sRevise.vue"),
      meta: {
        keepAlive: true,
        // keep: false,
      },
    },

    {
      path: "/dowork",
      component: () => import("@/views/work/workparent.vue"),
      meta: {
        keepAlive: true,
        // keep: false,
      },
      children: [
        {
          path: "/dowork",
          component: () => import("@/views/work/dowork.vue"),
        },
        {
          path: "doworks",
          component: () => import("@/views/work/dowork.vue"),
        },
        {
          path: "works",
          component: () => import("@/views/work/works.vue"),
        },
        {
          path: "correct",
          component: () => import("@/views/work/correct.vue"),
        },
        { path: "back", redirect: "/Swork" },
      ],
    },
  ],
});

export default router