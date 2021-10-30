export function match(snapshot, projects){
  const data = snapshot.data
  matchedProjects = []
  projects.forEach((project) => {
    projectData = project.data
    let factor = 0
    if(matchingLanguages(data[languages], projectData[languages])){
      factor ++;
    }
    if(matchingHours(data[hours], projectData[hours])){
      factor ++;
    }
    if matchingAreas(data[areas], projectData[areas]){
      factor ++;
    }
    if(factor === 3) matchedProjects.push();
  });
  return matchedProjects;
}

function matchingLists(listOne, listTwo){
  for(let i = 0; i < listOne.length){
    if(listTwo.includes(listOne[i])) return true;
  }
  return false
}

function matchingSingle(single, list){
  return list.includes(single);
}
