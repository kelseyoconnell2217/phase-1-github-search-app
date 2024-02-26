document.addEventListener('DOMContentLoaded', start)

function start(){
let searchedName
const form = document.getElementById('github-form')
form.addEventListener('submit', e => {
    e.preventDefault()
    searchedName = document.getElementById('search').value
    getUsers(searchedName)
})
const configObj = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'},
    }


function getUsers(searchedName){
    fetch(`https://api.github.com/search/users?q=${searchedName}`, configObj)
    .then(response => response.json())
    .then(resp => resp.items.forEach(user => makeCard(user)))
    }

    function makeCard(user){
        let container = document.getElementById('user-list')
        let card = document.createElement('li');
        card.className = 'card';
        let h4 = document.createElement('h4')
            card.appendChild(h4)
            h4.textContent = user.login
        let avatar = document.createElement('img')
            card.appendChild(avatar)
            avatar.className = 'img'
            avatar.src = user.avatar_url
        let br = document.createElement('br')
            card.appendChild(br)
        let btn1 = document.createElement('button')
            card.appendChild(btn1)
            btn1.className = 'button'
            btn1.innerText = 'View Profile'
            btn1.setAttribute("href", `${user.html_url}`)
            let br2 = document.createElement('br')
            card.appendChild(br2)
        let btn = document.createElement('button')
            card.appendChild(btn)
            btn.className = 'button'
            btn.innerText = 'View Repositories'
        
        let repoList = document.createElement('ul')
            repoList.className = 'repoList'
            card.appendChild(repoList)
            // let ul = card.querySelector('.repoList')
        let obj = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'}
        }
            btn1.addEventListener('click', (e) => {
                e.preventDefault()
                window.open(user.html_url, "_blank") 
                console.log(e.target)
             })

            btn.addEventListener('click', (e) => {
                fetch(`https://api.github.com/users/${user.login}/repos`, obj)
                .then(response => response.json())
                .then(resp => resp.forEach(repo => listRepo(repo)))})
            function listRepo(repo){
                console.log(repo)
                
                let li = document.createElement('li')
                li.textContent = repo.name
                repoList.appendChild(li)
                
            }
            
        container.appendChild(card)



        };
    


}















