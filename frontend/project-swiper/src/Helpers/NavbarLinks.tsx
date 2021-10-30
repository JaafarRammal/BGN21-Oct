import ExplorePage from "../Pages/ExplorePage";
import MyProjectsPage from "../Pages/MyProjectsPage";

// Navlink object to abstract the different pages and their link properties
export interface NavbarLinkObject {
  redirect: string;
  title: string;
  page: any;
}

// Different pages
export const NavbarLinks: { [id: string]: NavbarLinkObject } = {
  explore: {
    redirect: "/",
    title: "Explore",
    page: ExplorePage,
  },
  myprojects: {
    redirect: "/myprojects",
    title: "My Projects",
    page: MyProjectsPage,
  },
};