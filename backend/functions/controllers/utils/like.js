/**
 * Removes a users like from a project
 * @param {struct} user - The user to add to the likedBy list
 * @param {struct} project - The project to be added to the likedProjects list
 * @return {list} The updated lists
 */
function dislike(user, project) {
  let userLikes = user.likedProjects;
  let projectLikes = project.likedBy;
  userLikes = userLikes.filter((proj) => proj !== project.id && proj !== "");
  projectLikes = projectLikes.filter((usr) => usr !== user.id && usr !== "");
  return [userLikes, projectLikes];
}

/**
 * Adds a user like to the project
 * @param {struct} user - The user to add to the likedBy list
 * @param {struct} project - The project to be added to the likedProjects list
 * @return {list} The updated lists
 */
function like(user, project) {
  if (project.likedBy.includes(user.id)) {
    return [user.likedProjects, project.likedBy];
  }
  user.likedProjects.push(project.id);
  project.likedBy.push(user.id);
  user.likedProjects = user.likedProjects.filter((elem) => elem !== "");
  project.likedBy = project.likedBy.filter((elem) => elem !== "");
  return [user.likedProjects, project.likedBy];
}

module.exports = {
  like,
  dislike,
};
