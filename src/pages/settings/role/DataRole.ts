import { RoleType } from "../../../models/Role.type";

export const DataRole: RoleType[] = [
  {
    key: "role1",
    name: "Kế toán",
    describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    user: [
      {
        key: "user1",
        name: "Nguyễn Văn A",
        username: "nguyenvana@1",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role1",
          name: "Kế toán",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user2",
        name: "Nguyễn Văn A",
        username: "nguyenvana@2",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role1",
          name: "Kế toán",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user3",
        name: "Nguyễn Văn A",
        username: "nguyenvana@2",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "inactive",
        role: {
          key: "role1",
          name: "Kế toán",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
    ],
    permission: [
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
    user: [
      {
        key: "user4",
        name: "Nguyễn Văn A",
        username: "nguyenvana@4",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role2",
          name: "Bác sĩ",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user5",
        name: "Nguyễn Văn A",
        username: "nguyenvana@5",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role2",
          name: "Bác sĩ",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user6",
        name: "Nguyễn Văn A",
        username: "nguyenvana@6",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role2",
          name: "Bác sĩ",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user7",
        name: "Nguyễn Văn A",
        username: "nguyenvana@7",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "inactive",
        role: {
          key: "role2",
          name: "Bác sĩ",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
    ],
    permission: [
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
    user: [
      {
        key: "user8",
        name: "Nguyễn Văn A",
        username: "nguyenvana@8",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role3",
          name: "Lễ tân",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user9",
        name: "Nguyễn Văn A",
        username: "nguyenvana@9",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role3",
          name: "Lễ tân",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
    ],
    permission: [
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
    user: [
      {
        key: "user10",
        name: "Nguyễn Văn A",
        username: "nguyenvana@10",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role4",
          name: "Quản lý",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user11",
        name: "Nguyễn Văn A",
        username: "nguyenvana@11",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role4",
          name: "Quản lý",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
    ],
    permission: [
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
    user: [
      {
        key: "user12",
        name: "Nguyễn Văn A",
        username: "nguyenvana@12",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role5",
          name: "Admin",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
      {
        key: "user13",
        name: "Nguyễn Văn A",
        username: "nguyenvana@13",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "inactive",
        role: {
          key: "role5",
          name: "Admin",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
    ],
    permission: [
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
    user: [
      {
        key: "user14",
        name: "Nguyễn Văn A",
        username: "nguyenvana@14",
        password: "password@123",
        email: "nguyenvana123gmail.com",
        phone: "0919256712",
        status: "active",
        role: {
          key: "role6",
          name: "Super admin",
          describe:
            "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
          user: [],
          permission: [],
        },
      },
    ],
    permission: [
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
