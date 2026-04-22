/* global React, ReactDOM, RouterProvider, TweaksProvider, useRoute, useTweaks, TopNav, Footer, TweaksPanel, Home, Courses, CourseDetail, Corporate, About, Contact, Admin, Page */

function Router() {
  const { path } = useRoute();
  let PageEl;
  let keyId = path;
  if (path === "/") PageEl = <Home/>;
  else if (path === "/courses") PageEl = <Courses/>;
  else if (path.startsWith("/courses/")) PageEl = <CourseDetail/>;
  else if (path === "/corporate") PageEl = <Corporate/>;
  else if (path === "/about") PageEl = <About/>;
  else if (path === "/contact") PageEl = <Contact/>;
  else if (path === "/admin" || path.startsWith("/admin/")) PageEl = <Admin/>;
  else PageEl = <Home/>;

  const isAdmin = path.startsWith("/admin");

  return (
    <>
      {!isAdmin && <TopNav/>}
      <Page keyId={keyId}>{PageEl}</Page>
      {!isAdmin && <Footer/>}
      <TweaksPanel/>
    </>
  );
}

function App() {
  return (
    <TweaksProvider>
      <RouterProvider>
        <Router/>
      </RouterProvider>
    </TweaksProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
