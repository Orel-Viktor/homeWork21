'use strict'


const FindPost = function ({
    form,
    inputID,
    btnSend,
    userIdPost,
    idPost,
    titlePost,
    bodyPost,
}) {
    const myForm = document.querySelector(form)
    const idInput = document.querySelector(inputID)
    const sendBtn = document.querySelector(btnSend)
    const postUserId = document.querySelector(userIdPost)
    const posId = document.querySelector(idPost)
    const postTitle = document.querySelector(titlePost)
    const postBody = document.querySelector(bodyPost)
    

    myForm.addEventListener('submit', (event) => {
        event.preventDefault()
        event.target.reset()
    })

    this.checkID = () => {
        idInput.addEventListener('input', () => {
            this.idValue = idInput.value
        })
    }
    this.findId = function () {
        this.checkID()
        sendBtn.addEventListener('click', () => {
            fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.idValue}`)
                .then((response) => response.json())
                .then((data) => {
                    postUserId.innerText = `UserId: `+ data.map(elem => elem.userId)
                    posId.innerText = `Id: `+ data.map(elem=> elem.id)
                    postBody.innerText = `Body: `+ data.map(elem => elem.body)
                    postTitle.innerText = `Title: `+ data.map (elem => elem.title)
                });
        })

    }
}







const findPost = new FindPost(
  {  form: '.js--form',
    inputID:'.js--input-id',
    btnSend: '.js--btn-send', 
    userIdPost: '.js--user-id-post',
    idPost :'.js--id-post',
    titlePost: '.js--title-post',
    bodyPost: '.js--body-post',
}
   )
findPost.findId()


