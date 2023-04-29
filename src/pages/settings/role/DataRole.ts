import { RoleUser } from "../../../core/state/action-type/role.type";

export const DataRole: RoleUser[] = [
  {
    key: "role1",
    name: "Kế toán",
    describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    permissions: [
      {
        key: "groupA",
        name: "Nhóm chức năng A",
        items: [
          {
            value: "perY",
            label: "Chức năng Y",
          },
          {
            value: "perZ",
            label: "Chức năng Z",
          },
        ],
      },
    ],
  },
  {
    key: "role2",
    name: "Bác sĩ",
    describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",

    permissions: [
      {
        key: "groupB",
        name: "Nhóm chức năng B",
        items: [
          {
            value: "perF",
            label: "Chức năng F",
          },
        ],
      },
    ],
  },
  {
    key: "role3",
    name: "Lễ tân",
    describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",

    permissions: [
      {
        key: "groupB",
        name: "Nhóm chức năng B",
        items: [
          {
            value: "perE",
            label: "Chức năng E",
          },
          {
            value: "perF",
            label: "Chức năng F",
          },
          {
            value: "perG",
            label: "Chức năng G",
          },
        ],
      },
    ],
  },
  {
    key: "role4",
    name: "Quản lý",
    describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",

    permissions: [
      {
        key: "groupA",
        name: "Nhóm chức năng A",
        items: [
          {
            value: "perX",
            label: "Chức năng X",
          },
          {
            value: "perB",
            label: "Chức năng B",
          },
        ],
      },
      {
        key: "groupB",
        name: "Nhóm chức năng B",
        items: [
          {
            value: "perG",
            label: "Chức năng G",
          },
        ],
      },
    ],
  },
  {
    key: "role5",
    name: "Admin",
    describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",

    permissions: [
      {
        key: "groupA",
        name: "Nhóm chức năng A",
        items: [
          {
            value: "perX",
            label: "Chức năng X",
          },
          {
            value: "perA",
            label: "Chức năng A",
          },
          {
            value: "perB",
            label: "Chức năng B",
          },
        ],
      },
      {
        key: "groupB",
        name: "Nhóm chức năng B",
        items: [
          {
            value: "perE",
            label: "Chức năng E",
          },
          {
            value: "perG",
            label: "Chức năng G",
          },
        ],
      },
    ],
  },
  {
    key: "role6",
    name: "Super admin",
    describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",

    permissions: [
      {
        key: "groupA",
        name: "Nhóm chức năng A",
        items: [
          {
            value: "perX",
            label: "Chức năng X",
          },
          {
            value: "perY",
            label: "Chức năng Y",
          },
          {
            value: "perZ",
            label: "Chức năng Z",
          },
          {
            value: "perA",
            label: "Chức năng A",
          },
          {
            value: "perB",
            label: "Chức năng B",
          },
        ],
      },
      {
        key: "groupB",
        name: "Nhóm chức năng B",
        items: [
          {
            value: "perE",
            label: "Chức năng E",
          },
          {
            value: "perF",
            label: "Chức năng F",
          },
          {
            value: "perG",
            label: "Chức năng G",
          },
        ],
      },
    ],
  },
];
