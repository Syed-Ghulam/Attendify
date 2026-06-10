// import {createBrowserRouter,RouterProvider,} from "react-router-dom";

// import App from "./App";
// import Users from "./Users";
// import NewUser from "./NewUser";
// import EditUser from "./EditUser";
// import ViewUser from "./ViewUser";
// import WorkStation from "./WorkStation";
// import NewWorkStation from "./NewWorkStation";
// import EditWorkStation from "./EditWorkStation";
// import NewGroup from "./NewGroup";
// import EditGroup from "./EditGroup";
// import DashBoardLayout from "./layout/DashBoardLayout";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <App />
//   },

//   {
//     path: "/",
//     element: 
//       <ProtectedRoute />
//     ,
//      children: [
//     {
//       element: <DashBoardLayout />,
//       children: [
//         { index: true, element: <Users /> },
//       {
//         path: "users",
//         element: <Users />
//       },
//       {
//         path: "new-user",
//         element: <NewUser />
//       },
//       {
//         path: "edit-user/:userId",
//         element: <EditUser />
//       },
//       {
//         path: "view-user/:userId",
//         element: <ViewUser />
//       },
//       {
//         path: "new-group",
//         element: <NewGroup />
//       },
//       {
//         path: "edit-group/:id",
//         element: <EditGroup />
//       },
//       {
//         path: "workstation",
//         element: <WorkStation />
//       },
//       {
//         path: "new-workstation",
//         element: <NewWorkStation />
//       },
//       {
//         path: "edit-workstation/:id",
//         element: <EditWorkStation />
//       }
//       ]}]
//   }
// ]);

// export default function RouteApp() {
//   return <RouterProvider router={router} />;
// }