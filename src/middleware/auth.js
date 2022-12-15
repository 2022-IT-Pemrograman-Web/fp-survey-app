export default function auth({ next }) {
  const tempUser = localStorage.getItem("user");
  let user;
  if (tempUser) {
    user = JSON.parse(tempUser);
  }

  if (!tempUser || !user.id) {
    return next({
      name: "login",
    });
  }

  return next();
}
