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
    //If no languages are specified, languages won't be considered in the matching process
    if(typeof project.languages !== null || typeof project.languages !== undefined)
    {
      factor += matchingLanguages(data.languages, project.languages);
    }
    factor += matchingHours(data.hours, project.hours);
    factor += matchingTags(data.tags, project.tags);

    //With the current numbers, a factor greater than or equal to 3 can be 
    //obtained in the following ways:
    //1 required language, matching hours and 1 matching tag
    //2 required languages, matching hours
    //2 required languages, 1 matching tag and slightly below matching hours
    //1 required language, 2 matching tags and slightly below matching hours
    //3 required languages, 0 matching tags and slightly below matching hours
    //anything that exceeds any of these minimum requirements
    if (factor >= 3) matchedProjects.push(project);
  });
  return matchedProjects;
}
/**
 * Determines whether a user has an attribute required by the project
 * @param {arr} tagsOne - The list of user attributes
 * @param {arr} tagsTwo - The list of required project attributes
 * @return {bool} Whether the user has at least one of the required
 * attributes of the project
 */
function matchingTags(tagsOne, tagsTwo) {
  let tagScore = 0;

  for (let i = 0; i < tagsOne.length; i++) {

    if (tagsTwo.includes(tagsOne[i])) tagScore++;
  }
 
  return tagScore;
}

/**
 * Determines whether a user has an attribute required by the project
 * @param {arr} languagesOne - The list of user languages
 * @param {arr} languagesTwo - The list of required project languages
 * @return {bool} Whether the user has at least one of the required
 * languages of the project
 */
function matchingLanguages(languagesOne, languagesTwo) {
  
  let languageCounter = 0;

  for (let i = 0; i < languagesOne.length; i++) {

    //counts each language known as +1 to the total score
    if (languagesTwo.includes(languagesOne[i])) languageCounter++;
  }
  //weights not knowing any language negatively
  //ensures users aren't matched to projects they don't any language for
  if(languageCounter === 0)
  {
    return -100;
  }
  else
  {
    return languageCounter;
  }
}
/**
 * Determines whether a user can spend enough time on a project
 * @param {int} userHours - The users availability
 * @param {int} projectHours - The projects time requirement
 * @return {int} Whether users availability matches the needs of the project
 */
function matchingHours(userHours, projectHours) 
{

  //the user is a perfect match in terms of project hours, so the user gets
  //the full amount of points for this criterion
  if (userHours + 1 >= projectHours) {
    return 1;
  }
  //the user is a partial match, has hours slightly below the project requirement
  //but still within an acceptable range. A partial amount of points is given
  //for this criterion.
  else if((userHours/projectHours >= 0.75) || (Math.abs(projectHours - UserHours) <= 5))
  {
    return userHours/projectHours;
  }

  //the user is far outside the range of hours required, and is therefore not matched
  //to the project.
  else
  {
    return -100;
  }
}

module.exports = {
  match,
};
