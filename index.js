const idTeam = document.getElementById('idTeam');
const typeLike = document.getElementsByName('typelike');
const button = document.getElementById('button');
const numberVote = document.getElementById('numberVote');
const successScreen = document.getElementById('success');

const getValRadio = () => {
  for (let i = 0; i < typeLike.length; i++) {
    if (typeLike[i].checked) {
      return typeLike[i].value
    }
  }
}

const generateArray = (a, b) => {
  let emptyList = [];
  for (let i = a; i < b; i++) {
    emptyList = [...emptyList, parseInt(i)];
  }
  return emptyList;
}

button.addEventListener('click', () => {
  successScreen.textContent = '';
  const typeLike = getValRadio() === "0" ? 'unlike' : 'like';
  const generateAcc = generateArray(100, 999);
  const idTeamValue = idTeam.value;
  const number = parseInt(numberVote.value);
  for (let i = 0; i < number; i++) {
    const dataToPost = {
      _id: idTeamValue,
      ip: `82b83571-06e4-4459-8e7e-51af20320`+ generateAcc[i]
    }
    const url = `https://mindx.edu.vn/api/v1/guest/submissions/${typeLike}`;
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost)
    }).then(() => {
      const idCurrent = `82b83571-06e4-4459-8e7e-51af20320`+ generateAcc[i]
      successScreen.insertAdjacentHTML('beforeend', `<p>${idCurrent} -> <span style="color:${typeLike === 'like' ? 'blue' : 'red'}">${typeLike}</span> -> <span style="color: green">Success!</span></p>`)
    }).catch(err => console.log(err));
  }
})