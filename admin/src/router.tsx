import { createBrowserRouter, RouteObject } from "react-router-dom";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import LoadingSpinner from "./components/LoadingSpinner.tsx";
import { Suspense } from "react";

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="medium" />
      </div>
    }
  >
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  // Public routes
  {
    element: (
      <SuspenseWrapper>
        <PublicRoute />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: "/sign-in",
        lazy: async () => ({
          Component: (await import("./pages/auth/sign-in")).default,
        }),
      },
      {
        path: "/sign-up",
        lazy: async () => ({
          Component: (await import("./pages/auth/sign-up")).default,
        }),
      },
      {
        path: "/forgot-password",
        lazy: async () => ({
          Component: (await import("./pages/auth/forgot-password")).default,
        }),
      },
      {
        path: "/otp",
        lazy: async () => ({
          Component: (await import("./pages/auth/otp")).default,
        }),
      },
      {
        path: "/reset-password",
        lazy: async () => ({
          Component: (await import("./pages/auth/reset-password")).default,
        }),
      },
    ],
  } as RouteObject,

  // Protected routes
  {
    element: (
      <SuspenseWrapper>
        <ProtectedRoute />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: "/",
        lazy: async () => {
          const AppShell = await import("./components/app-shell");
          return { Component: AppShell.default };
        },
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("./pages/dashboard")).default,
            }),
          },
          {
            path: "tasks",
            lazy: async () => ({
              Component: (await import("@/pages/tasks")).default,
            }),
          },
          {
            path: "chats",
            lazy: async () => ({
              Component: (await import("@/pages/chats")).default,
            }),
          },
          {
            path: "apps",
            lazy: async () => ({
              Component: (await import("@/pages/apps")).default,
            }),
          },
          {
            path: "users",
            lazy: async () => ({
              Component: (await import("@/components/users/users")).default,
            }),
          },
          {
            path: "categories",
            lazy: async () => ({
              Component: (await import("@/components/categories/categories"))
                .default,
            }),
          },
          {
            path: "blogs",
            lazy: async () => ({
              Component: (await import("@/components/blogs/blogs")).default,
            }),
          },
          {
            path: "thoughts",
            lazy: async () => ({
              Component: (await import("@/components/thoughtsManagement/ThoughtManagement.tsx")).default,
            }),
          },
          {
            path: "plans-management",
            lazy: async () => ({
              Component: (await import("@/components/PlanManagement/PlanManagement.tsx")).default,
            }),
          },
          {
            path: "gem-stone-query",
            lazy: async () => ({
              Component: (await import("@/components/GemstoneQueryManagement/GemstoneQueryManagement.tsx")).default,
            }),
          },
          {
            path: "astroger-request",
            lazy: async () => ({
              Component: (await import("@/components/AstrologerRequestManagement/AstrologerRequestManagement.tsx")).default,
            }),
          },
          {
            path: "banner",
            lazy: async () => ({
              Component: (await import("@/components/banner/BannerManagement.tsx")).default,
            }),
          },
          {
            path: "blogs/create",
            lazy: async () => ({
              Component: (await import("@/components/blogs/AddBlog.tsx"))
                .default,
            }),
          },
          {
            path: "blogs/edit/:id",
            lazy: async () => ({
              Component: (await import("@/components/blogs/EditBlog.tsx"))
                .default,
            }),
          },
          {
            path: "blogs/:id",
            lazy: async () => ({
              Component: (await import("@/components/blogs/BlogDetails.tsx"))
                .default,
            }),
          },
          {
            path: "astrologers",
            lazy: async () => ({
              Component: (
                await import("@/components/astrologer/astrologer.tsx")
              ).default,
            }),
          },
          {
            path: "astrologer/:id",
            lazy: async () => ({
              Component: (
                await import("@/components/astrologer/astrologerDetails.tsx")
              ).default,
            }),
          },
          {
            path: "astrologer/:id/reviews",
            lazy: async () => ({
              Component: (
                await import("@/components/astrologer/ReviewsPage.tsx")
              ).default,
            }),
          },
          {
            path: "free-services",
            lazy: async () => ({
              Component: (
                await import("@/components/freeServices/ListOfFreeServices.tsx")
              ).default,
            }),
          },
          {
            path: "free-services/horoscope",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/freeServices/horoscope/ListOfHoroscope.tsx"
                )
              ).default,
            }),
          },
          {
            path: "free-services/horoscope/:zodiacSign",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/freeServices/horoscope/horoscopeZodiacDetails.tsx"
                )
              ).default,
            }),
          },
          {
            path: "/free-services/vrat-and-upvaas",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/freeServices/VratandUpvaas/VratandUpvaas.tsx"
                )
              ).default,
            }),
          },
          {
            path: "/free-services/shubh-muhurat",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/freeServices/ShubhMuhurat/ShubhMuhura.tsx"
                )
              ).default,
            }),
          },
          {
            path: "/free-services/kundali-match",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/freeServices/KundaliMatch/KundaliMatch.tsx"
                )
              ).default,
            }),
          },
          {
            path: "/free-services/janam-kundali",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/freeServices/JanamKundali/JanamKundali.tsx"
                )
              ).default,
            }),
          },
          {
            path: "/free-services/todays-panchang",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/freeServices/Panchang/TodaysPanchang.tsx"
                )
              ).default,
            }),
          },
          {
            path: "/astro-services",
            lazy: async () => ({
              Component: (
                await import("@/components/astroServices/astroServices.tsx")
              ).default,
            }),
          },
          {
            path: "/astro-services/group-puja",
            lazy: async () => ({
              Component: (
                await import(
                  "@/components/astroServices/groupPuja/groupPuja.tsx"
                )
              ).default,
            }),
          },
          {
            path: "/astro-services/vip-puja",
            lazy: async () => ({
              Component: (
                await import("@/components/astroServices/vipPuja/vipPuja.tsx")
              ).default,
            }),
          },
          {
            path: "/astro-services/gemstone",
            lazy: async () => ({
              Component: (
                await import("@/components/astroServices/gemStone/gemStone.tsx")
              ).default,
            }),
          },
          {
            path: "/support",
            lazy: async () => ({
              Component: (await import("@/components/Support.tsx")).default,
            }),
          },
          {
            path: "extra-components",
            lazy: async () => ({
              Component: (await import("@/pages/extra-components")).default,
            }),
          },
          {
            path: "settings",
            lazy: async () => ({
              Component: (await import("./pages/settings")).default,
            }),
            errorElement: <GeneralError />,
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import("./pages/settings/profile")).default,
                }),
              },
              {
                path: "account",
                lazy: async () => ({
                  Component: (await import("./pages/settings/account")).default,
                }),
              },
              {
                path: "appearance",
                lazy: async () => ({
                  Component: (await import("./pages/settings/appearance"))
                    .default,
                }),
              },
              {
                path: "notifications",
                lazy: async () => ({
                  Component: (await import("./pages/settings/notifications"))
                    .default,
                }),
              },
              {
                path: "display",
                lazy: async () => ({
                  Component: (await import("./pages/settings/display")).default,
                }),
              },
              {
                path: "error-example",
                lazy: async () => ({
                  Component: (await import("./pages/settings/error-example"))
                    .default,
                }),
                errorElement: <GeneralError className="h-[50svh]" minimal />,
              },
            ],
          },
        ],
      },
    ],
  } as RouteObject,

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
//===================================================================
// src/router.tsx
// import React from "react";
// import { createBrowserRouter, RouteObject } from "react-router-dom";
// import GeneralError from "./pages/errors/general-error";
// import NotFoundError from "./pages/errors/not-found-error";
// import MaintenanceError from "./pages/errors/maintenance-error";
// import UnauthorisedError from "./pages/errors/unauthorised-error";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";

// const router = createBrowserRouter([
//   // Public routes
//   {
//     element: <PublicRoute />,
//     children: [
//       {
//         path: "/sign-in",
//         lazy: async () => ({
//           Component: (await import("./pages/auth/sign-in")).default,
//         }),
//       },
//       {
//         path: "/sign-up",
//         lazy: async () => ({
//           Component: (await import("./pages/auth/sign-up")).default,
//         }),
//       },
//       {
//         path: "/forgot-password",
//         lazy: async () => ({
//           Component: (await import("./pages/auth/forgot-password")).default,
//         }),
//       },
//       {
//         path: "/otp",
//         lazy: async () => ({
//           Component: (await import("./pages/auth/otp")).default,
//         }),
//       },
//       {
//         path: "/reset-password",
//         lazy: async () => ({
//           Component: (await import("./pages/auth/reset-password")).default,
//         }),
//       },
//     ],
//   } as RouteObject,

//   // Protected routes
//   {
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: "/",
//         lazy: async () => {
//           const AppShell = await import("./components/app-shell");
//           return { Component: AppShell.default };
//         },
//         errorElement: <GeneralError />,
//         children: [
//           {
//             index: true,
//             lazy: async () => ({
//               Component: (await import("./pages/dashboard")).default,
//             }),
//           },
//           // ... (other protected routes)
//         ],
//       },
//     ],
//   } as RouteObject,

//   // Error routes
//   { path: "/500", element: <GeneralError /> },
//   { path: "/404", element: <NotFoundError /> },
//   { path: "/503", element: <MaintenanceError /> },
//   { path: "/401", element: <UnauthorisedError /> },

//   // Fallback 404 route
//   { path: "*", element: <NotFoundError /> },
// ]);

// export default router;
