const utils = require("./unpack.js");
/**
 * Determines whether a user should be matched to a project
 * @param {struct} user - The user to check against projects
 * @param {arr} projects - The projects to potentially match
 * @return {list} All matched projects
 */
function match(user, projects) {
  const matchedProjects = [];
  const data = user.data();
  projects.forEach((doc) => {
    const project = utils.unpack(doc);
    let factor = 0;
    factor += matchingLists(data.languages, project.languages);
    factor += matchingHours(data.hours, project.hours);
    factor += matchingLists(data.tags, project.tags);
    if (factor === 3) matchedProjects.push(project);
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
    if (listTwo.includes(listOne[i])) return 1;
  }
  return 0;
}
/**
 * Determines whether a user can spend enough time on a project
 * @param {int} userHours - The users availability
 * @param {int} projectHours - The projects time requirement
 * @return {int} Whether users availability matches the needs of the project
 */
function matchingHours(userHours, projectHours) {
  if (userHours + 1 >= projectHours) {
    return 1;
  }
  return 0;
}

module.exports = {
  match,
};
