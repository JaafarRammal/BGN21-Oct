/**
 * Determines whether a user should be matched to a project
 * @param {struct} user - The user to check against projects
 * @param {arr} projects - The projects to potentially match
 * @return {bool} Whether the project is mathched or not
 */
function match(user, projects) {
  const matchedProjects = [];
  const data = user.data();
  projects.forEach((doc) => {
    const projectId = doc.id;
    const projectData = doc.data();
    const project = {projectId, ...projectData};
    let factor = 0;
    if (matchingLists(data.languages, project.languages)) {
      factor++;
    }
    if (matchingHours(data.hours, project.hours)) {
      factor++;
    }
    if (matchingLists(data.tags, project.tags)) {
      factor++;
    }
    if (factor === 3) matchedProjects.push(project);
    console.log(factor);
  });
  return matchedProjects;
}
/**
 * Determines whether a user has an attribute required by the project
 * @param {arr} listOne - The list of user attributes
 * @param {arr} listTwo - The list of required project attributes
 * @return {bool} Whether the user has at least one of the required
 * attributes of the project
 */
function matchingLists(listOne, listTwo) {
  for (let i = 0; i < listOne.length; i++) {
    if (listTwo.includes(listOne[i])) return true;
  }
  return false;
}
/**
 * Determines whether a user can spend enough time on a project
 * @param {int} userHours - The users availability
 * @param {int} projectHours - The projects time requirement
 * @return {bool} Whether users availability matches the needs of the project
 */
function matchingHours(userHours, projectHours) {
  return userHours + 1 >= projectHours;
}

module.exports = {
  match,
};
